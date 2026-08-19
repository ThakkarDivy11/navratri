import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { DEFAULT_VENUES } from '@/data/venues';

let inMemoryEvents = null;

function getFilePath() {
  if (process.env.VERCEL) {
    return path.join('/tmp', 'events.json');
  }
  return path.join(process.cwd(), 'events.json');
}

function readEventsFile() {
  if (inMemoryEvents) return inMemoryEvents;
  try {
    const filePath = getFilePath();
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf8');
      inMemoryEvents = JSON.parse(content);
      return inMemoryEvents;
    }
  } catch (err) {
    console.error('Error reading file:', err);
  }
  inMemoryEvents = [...DEFAULT_VENUES];
  return inMemoryEvents;
}

function writeEventsFile(events) {
  inMemoryEvents = events;
  try {
    const filePath = getFilePath();
    fs.writeFileSync(filePath, JSON.stringify(events, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error('File write error:', err);
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
    const events = [...readEventsFile()];
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
