import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { DEFAULT_VENUES } from '@/data/venues';

const EVENTS_FILE = path.join(process.cwd(), 'events.json');

function readEventsFile() {
  try {
    if (!fs.existsSync(EVENTS_FILE)) {
      return DEFAULT_VENUES;
    }
    return JSON.parse(fs.readFileSync(EVENTS_FILE, 'utf8'));
  } catch (err) {
    return DEFAULT_VENUES;
  }
}

function writeEventsFile(events) {
  try {
    fs.writeFileSync(EVENTS_FILE, JSON.stringify(events, null, 2), 'utf8');
    return true;
  } catch (err) {
    return false;
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const updateData = await request.json();
    let events = readEventsFile();
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
    let events = readEventsFile();
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
