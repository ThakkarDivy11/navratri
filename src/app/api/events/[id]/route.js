import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { DEFAULT_VENUES } from '@/data/venues';

export const dynamic = 'force-dynamic';

const EVENTS_FILE = path.join(process.cwd(), 'events.json');

function readEventsFile() {
  try {
    if (fs.existsSync(EVENTS_FILE)) {
      const content = fs.readFileSync(EVENTS_FILE, 'utf8');
      return JSON.parse(content);
    }
  } catch (err) {
    console.error('Error reading events.json:', err);
  }
  return DEFAULT_VENUES;
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

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const updateData = await request.json();
    let events = [...readEventsFile()];
    const index = events.findIndex((e) => e.id === id);
    if (index === -1) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }
    events[index] = { ...events[index], ...updateData };
    writeEventsFile(events);
    return NextResponse.json({ success: true, events, message: 'Event updated globally' });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to update event' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    let events = [...readEventsFile()];
    const initialLen = events.length;
    events = events.filter((e) => e.id !== id);
    if (events.length === initialLen) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }
    writeEventsFile(events);
    return NextResponse.json({ success: true, events, message: 'Event deleted globally' });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to delete event' }, { status: 500 });
  }
}
