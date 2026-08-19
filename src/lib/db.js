import { connectToDatabase } from './mongodb';
import Event from '@/models/Event';
import { DEFAULT_VENUES } from '@/data/venues';

/**
 * Auto-seed database with default venues if collection is empty
 */
async function seedDefaultEvents() {
  try {
    const docs = DEFAULT_VENUES.map((v, index) => ({
      ...v,
      order: index,
      isDefault: true,
    }));
    await Event.insertMany(docs);
    return docs;
  } catch (err) {
    console.error('Failed to seed default events:', err);
    return DEFAULT_VENUES;
  }
}

/**
 * Fetch all events from MongoDB (or fallback to DEFAULT_VENUES)
 */
export async function getEvents() {
  try {
    const conn = await connectToDatabase();
    if (!conn) {
      return DEFAULT_VENUES;
    }

    const events = await Event.find({}).sort({ order: 1, createdAt: -1 }).lean();
    if (events && events.length > 0) {
      return events.map((e) => {
        const { _id, ...rest } = e;
        return rest;
      });
    }

    // First time — seed with defaults
    return await seedDefaultEvents();
  } catch (err) {
    console.error('MongoDB getEvents error:', err);
    return DEFAULT_VENUES;
  }
}

/**
 * Create a new event
 */
export async function createEvent(eventData) {
  try {
    const conn = await connectToDatabase();
    if (!conn) return null;

    if (!eventData.id) {
      eventData.id = 'event_' + Date.now();
    }
    eventData.isDefault = false;

    const created = await Event.create(eventData);
    return created.toObject();
  } catch (err) {
    console.error('MongoDB createEvent error:', err);
    return null;
  }
}

/**
 * Update an existing event by its id
 */
export async function updateEvent(id, updateData) {
  try {
    const conn = await connectToDatabase();
    if (!conn) return null;

    const updated = await Event.findOneAndUpdate({ id }, updateData, { new: true }).lean();
    return updated;
  } catch (err) {
    console.error('MongoDB updateEvent error:', err);
    return null;
  }
}

/**
 * Delete an event by its id
 */
export async function deleteEvent(id) {
  try {
    const conn = await connectToDatabase();
    if (!conn) return false;

    const res = await Event.findOneAndDelete({ id });
    return !!res;
  } catch (err) {
    console.error('MongoDB deleteEvent error:', err);
    return false;
  }
}

/**
 * Reset all events back to DEFAULT_VENUES
 */
export async function resetEvents() {
  try {
    const conn = await connectToDatabase();
    if (!conn) return DEFAULT_VENUES;

    await Event.deleteMany({});
    return await seedDefaultEvents();
  } catch (err) {
    console.error('MongoDB resetEvents error:', err);
    return DEFAULT_VENUES;
  }
}

/**
 * Bulk set / replace events
 */
export async function setEvents(events) {
  try {
    const conn = await connectToDatabase();
    if (!conn) return false;

    await Event.deleteMany({});
    const docs = events.map((v, index) => ({
      ...v,
      order: index,
    }));
    await Event.insertMany(docs);
    return true;
  } catch (err) {
    console.error('MongoDB setEvents error:', err);
    return false;
  }
}
