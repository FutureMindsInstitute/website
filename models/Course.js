import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  courseTotalDuration: {
    type: Number,
    required: true,
  },
  features: {
    type: [String],
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discountPrice: {
    type: Number,
    required: true,
  },
  earlyBirdTitle: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
    required: true,
  },
  categories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  }],
  brochurePdf: {
    type: String,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

courseSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Course = mongoose.models.Course || mongoose.model('Course', courseSchema);

export default Course;
