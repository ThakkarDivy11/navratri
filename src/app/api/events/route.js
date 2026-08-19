import { NextResponse } from 'next/server';
import { getEvents, createEvent } from '@/lib/db';

export const revalidate = 60;

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const isAdmin = searchParams.get('admin') === 'true';

  const events = await getEvents();

  if (isAdmin) {
    return NextResponse.json(events, {
      headers: {
        'Cache-Control': 'no-store, max-age=0, must-revalidate',
      },
    });
  }

  return NextResponse.json(events, {
    headers: {
      'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=120',
    },
  });
}

export async function POST(request) {
  try {
    const newEvent = await request.json();
    if (!newEvent || !newEvent.name) {
      return NextResponse.json({ error: 'Invalid event data' }, { status: 400 });
    }
    await createEvent(newEvent);
    const updated = await getEvents();
    return NextResponse.json({ success: true, events: updated, message: 'Event added globally' });
  } catch (err) {
    console.error('POST /api/events error:', err);
    return NextResponse.json({ error: 'Failed to add event' }, { status: 500 });
  }
}
