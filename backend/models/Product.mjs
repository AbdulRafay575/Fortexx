import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  availableSizes: {
    type: [String],
    enum: ['Small','Medium','Large','X-Large','XXL','3XL','4XL','5XL'],
    required: true
  },
  availableColors: { type: [String], required: true },
  stylee: { type: String, required: true },
  images: [{
    url: { type: String, default: null },
    cloudinaryId: { type: String, default: null },
    isPrimary: { type: Boolean, default: false }
  }],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Product', ProductSchema);
