import { NextResponse } from 'next/server';
import { setEvents } from '@/lib/db';
import { DEFAULT_VENUES } from '@/data/venues';

export const dynamic = 'force-dynamic';

export async function POST() {
  try {
    await setEvents(DEFAULT_VENUES);
    return NextResponse.json({ success: true, events: DEFAULT_VENUES, message: 'Reset to default events globally' });
  } catch (err) {
    console.error('POST /api/events/reset error:', err);
    return NextResponse.json({ error: 'Failed to reset events' }, { status: 500 });
  }
}
