import { NextResponse } from 'next/server';
import { resetEvents } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function POST() {
  try {
    const defaultEvents = await resetEvents();
    return NextResponse.json({ success: true, events: defaultEvents, message: 'Reset to default events globally' });
  } catch (err) {
    console.error('POST /api/events/reset error:', err);
    return NextResponse.json({ error: 'Failed to reset events' }, { status: 500 });
  }
}
