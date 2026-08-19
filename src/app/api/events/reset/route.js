import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { DEFAULT_VENUES } from '@/data/venues';

function getFilePath() {
  if (process.env.VERCEL) {
    return path.join('/tmp', 'events.json');
  }
  return path.join(process.cwd(), 'events.json');
}

export async function POST() {
  try {
    const filePath = getFilePath();
    fs.writeFileSync(filePath, JSON.stringify(DEFAULT_VENUES, null, 2), 'utf8');
  } catch (err) {
    console.error('Reset write error:', err);
  }
  return NextResponse.json({ success: true, events: DEFAULT_VENUES, message: 'Reset to default events globally' });
}
