import { Redis } from '@upstash/redis';
import { DEFAULT_VENUES } from '@/data/venues';

const EVENTS_KEY = 'navratri_events';

let redis = null;

function getRedis() {
  if (!redis) {
    const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
    const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
    if (!url || !token) {
      console.error('Missing KV_REST_API_URL/TOKEN or UPSTASH_REDIS_REST_URL/TOKEN');
      return null;
    }
    redis = new Redis({ url, token });
  }
  return redis;
}

export async function getEvents() {
  try {
    const r = getRedis();
    if (!r) return DEFAULT_VENUES;
    const data = await r.get(EVENTS_KEY);
    if (data && Array.isArray(data) && data.length > 0) {
      return data;
    }
    // First time — seed with defaults
    await r.set(EVENTS_KEY, DEFAULT_VENUES);
    return DEFAULT_VENUES;
  } catch (err) {
    console.error('Redis getEvents error:', err);
    return DEFAULT_VENUES;
  }
}

export async function setEvents(events) {
  try {
    const r = getRedis();
    if (!r) return false;
    await r.set(EVENTS_KEY, events);
    return true;
  } catch (err) {
    console.error('Redis setEvents error:', err);
    return false;
  }
}
