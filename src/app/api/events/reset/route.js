import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { DEFAULT_VENUES } from '@/data/venues';

export const dynamic = 'force-dynamic';

const EVENTS_FILE = path.join(process.cwd(), 'events.json');

export async function POST() {
  try {
    fs.writeFileSync(EVENTS_FILE, JSON.stringify(DEFAULT_VENUES, null, 2), 'utf8');
    return NextResponse.json({ success: true, events: DEFAULT_VENUES, message: 'Reset to default events globally' });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to reset events' }, { status: 500 });
  }
}
