const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema(
  {
    itemName: {
      type: String,
      required: [true, 'Please add an item name'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: '',
    },
    type: {
      type: String,
      enum: ['Lost', 'Found'],
      required: [true, 'Please specify if the item is Lost or Found'],
    },
    location: {
      type: String,
      trim: true,
      default: '',
    },
    date: {
      type: Date,
      default: Date.now,
    },
    contactInfo: {
      type: String,
      trim: true,
      default: '',
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Text index for search
itemSchema.index({ itemName: 'text', description: 'text', location: 'text' });

module.exports = mongoose.model('Item', itemSchema);
