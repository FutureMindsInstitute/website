import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema({
  street: String,
  city: String,
  state: String,
  country: String,
  zipCode: String,
}, { _id: false });

const experienceSchema = new mongoose.Schema({
  jobTitle: String,
  company: String,
  location: String,
  employmentType: String,
  startDate: Date,
  endDate: Date,
  current: Boolean,
}, { _id: false });

const educationSchema = new mongoose.Schema({
  degree: String,
  field: String,
  institution: String,
  graduationYear: Number,
  gpa: Number,
}, { _id: false });

const courseSubscriptionSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  razorpay_order_id: {
    type: String,
    required: true,
  },
  razorpay_payment_id: {
    type: String,
    required: true,
  },
  couponName: {
    type: String,
    default: null,
  }
}, { _id: false });

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: String,
  resetToken: String,
  resetTokenExpire: Date,
  lastResetPasswordAt: Date,
  name: {
    type: String,
    required: true,
  },
  dateOfBirth: Date,
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
  },
  phone: {
    type: String,
    unique: true,
    sparse: true,
  },
  address: addressSchema,
  currentRole: String,
  currentCompany: String,
  experience: [experienceSchema],
  skills: [String],
  education: [educationSchema],
  careerObjective: String,
  preferredJobRoles: [String],
  preferredLocation: [String],
  salaryExpectation: Number,
  linkedinProfile: String,
  githubProfile: String,
  portfolio: String,
  courses: [courseSubscriptionSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
