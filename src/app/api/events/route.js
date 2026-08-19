import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { DEFAULT_VENUES } from '@/data/venues';

const EVENTS_FILE = path.join(process.cwd(), 'events.json');

function readEventsFile() {
  try {
    if (!fs.existsSync(EVENTS_FILE)) {
      fs.writeFileSync(EVENTS_FILE, JSON.stringify(DEFAULT_VENUES, null, 2), 'utf8');
      return DEFAULT_VENUES;
    }
    const content = fs.readFileSync(EVENTS_FILE, 'utf8');
    return JSON.parse(content);
  } catch (err) {
    console.error('Error reading events.json:', err);
    return DEFAULT_VENUES;
  }
}

function writeEventsFile(events) {
  try {
    fs.writeFileSync(EVENTS_FILE, JSON.stringify(events, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error('Error writing events.json:', err);
    return false;
  }
}

export async function GET() {
  const events = readEventsFile();
  return NextResponse.json(events, {
    headers: {
      'Cache-Control': 'no-store, max-age=0',
    },
  });
}

export async function POST(request) {
  try {
    const newEvent = await request.json();
    if (!newEvent || !newEvent.name) {
      return NextResponse.json({ error: 'Invalid event data' }, { status: 400 });
    }
    const events = readEventsFile();
    if (!newEvent.id) {
      newEvent.id = 'custom_' + Date.now();
    }
    newEvent.isDefault = false;
    events.unshift(newEvent);
    writeEventsFile(events);
    return NextResponse.json({ success: true, events, message: 'Event added globally for all users' });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to add event' }, { status: 500 });
  }
}
