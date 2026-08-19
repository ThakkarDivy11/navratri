import { NextResponse } from 'next/server';
import { getEvents, updateEvent, deleteEvent } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const updateData = await request.json();
    const result = await updateEvent(id, updateData);
    if (!result) {
      return NextResponse.json({ error: 'Event not found or failed to update' }, { status: 404 });
    }
    const events = await getEvents();
    return NextResponse.json({ success: true, events, message: 'Event updated globally' });
  } catch (err) {
    console.error('PUT /api/events/[id] error:', err);
    return NextResponse.json({ error: 'Failed to update event' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const deleted = await deleteEvent(id);
    if (!deleted) {
      return NextResponse.json({ error: 'Event not found or failed to delete' }, { status: 404 });
    }
    const events = await getEvents();
    return NextResponse.json({ success: true, events, message: 'Event deleted globally' });
  } catch (err) {
    console.error('DELETE /api/events/[id] error:', err);
    return NextResponse.json({ error: 'Failed to delete event' }, { status: 500 });
  }
}
