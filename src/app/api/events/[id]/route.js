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
    return NextResponse.json({ success: true, events, message: 'Event updated globally for all users' });
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
    return NextResponse.json({ success: true, events, message: 'Event deleted globally for all users' });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to delete event' }, { status: 500 });
  }
}
