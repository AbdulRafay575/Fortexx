import mongoose from 'mongoose';

const CartItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  size: {
    type: String,
    enum: ['Small','Medium','Large','X-Large','XXL','3XL','4XL','5XL'],
    required: true
  },
  color: { type: String, required: true },
  stylee: { type: String },
  design: { type: String },
  designCloudinaryId: { type: String },
  customText: { type: String },
  pattern: { type: String },
  quantity: { type: Number, required: true, min: 1 },
  priceAtAddition: { type: Number, required: true }
});

const CartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  items: [CartItemSchema],
  total: { type: Number, default: 0 },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model('Cart', CartSchema);
