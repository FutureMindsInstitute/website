import mongoose from 'mongoose';

const otpSchema = new mongoose.Schema({
  phone: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60, // OTP expires after 60 seconds
  },
});

const OTP = mongoose.models.OTP || mongoose.model('OTP', otpSchema);

export default OTP;
