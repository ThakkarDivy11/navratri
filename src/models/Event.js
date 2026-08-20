import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    name: {
      type: String,
      required: [true, 'Event name is required'],
      trim: true,
    },
    location: {
      type: String,
      default: '',
    },
    city: {
      type: String,
      default: 'Ahmedabad',
    },
    dates: {
      type: String,
      default: 'Oct 11 – Oct 19, 2026',
    },
    artist: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'ahmedabad',
    },
    category: {
      type: String,
      default: 'mandli',
    },
    passTypes: {
      type: String,
      default: 'General / VIP',
    },
    formats: {
      type: String,
      default: 'Physical & Online Available',
    },
    image: {
      type: String,
      default: '/assets/ruda_garba.png',
    },
    b2bPrice: {
      type: String,
      default: 'Get B2B Rate',
    },
    badge: {
      type: String,
      default: 'Authentic Mandli Garba',
    },
    availability: {
      type: String,
      default: 'High Inventory',
    },
    isDefault: {
      type: Boolean,
      default: false,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Prevent re-compilation of model across hot-reloads
export default mongoose.models.Event || mongoose.model('Event', EventSchema);
