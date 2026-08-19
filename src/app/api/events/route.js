import { NextResponse } from 'next/server';
import { getEvents, setEvents } from '@/lib/db';

export const revalidate = 60;

export async function GET() {
  const events = await getEvents();
  return NextResponse.json(events, {
    headers: {
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
    },
  });
}

export async function POST(request) {
  try {
    const newEvent = await request.json();
    if (!newEvent || !newEvent.name) {
      return NextResponse.json({ error: 'Invalid event data' }, { status: 400 });
    }
    const events = await getEvents();
    if (!newEvent.id) {
      newEvent.id = 'custom_' + Date.now();
    }
    newEvent.isDefault = false;
    const updated = [newEvent, ...events];
    await setEvents(updated);
    return NextResponse.json({ success: true, events: updated, message: 'Event added globally' });
  } catch (err) {
    console.error('POST /api/events error:', err);
    return NextResponse.json({ error: 'Failed to add event' }, { status: 500 });
  }
}
