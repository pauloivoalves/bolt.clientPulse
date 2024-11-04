import mongoose from 'mongoose';

const clientSchema = new mongoose.Schema({
  company: {
    type: String,
    required: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    trim: true
  },
  phone: {
    type: String,
    trim: true
  },
  role: {
    type: String,
    required: true,
    trim: true
  },
  context: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Active'
  },
  health: {
    type: String,
    enum: ['good', 'neutral', 'bad'],
    default: 'neutral'
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  messages: [{
    content: {
      type: String,
      required: true
    },
    timestamp: {
      type: Date,
      required: true
    },
    sentiment: {
      type: String,
      enum: ['positive', 'neutral', 'negative'],
      default: 'neutral'
    }
  }]
}, {
  timestamps: true
});

export default mongoose.model('Client', clientSchema);
