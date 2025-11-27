import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Ensure mongoose.models exists before accessing it
const Category = (mongoose.models && mongoose.models.Category) || mongoose.model('Category', categorySchema);

export default Category;
