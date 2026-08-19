import { NextResponse } from 'next/server';
import { getEvents, setEvents } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const updateData = await request.json();
    const events = await getEvents();
    const index = events.findIndex((e) => e.id === id);
    if (index === -1) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }
    events[index] = { ...events[index], ...updateData };
    await setEvents(events);
    return NextResponse.json({ success: true, events, message: 'Event updated globally' });
  } catch (err) {
    console.error('PUT /api/events/[id] error:', err);
    return NextResponse.json({ error: 'Failed to update event' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const events = await getEvents();
    const filtered = events.filter((e) => e.id !== id);
    if (filtered.length === events.length) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }
    await setEvents(filtered);
    return NextResponse.json({ success: true, events: filtered, message: 'Event deleted globally' });
  } catch (err) {
    console.error('DELETE /api/events/[id] error:', err);
    return NextResponse.json({ error: 'Failed to delete event' }, { status: 500 });
  }
}
