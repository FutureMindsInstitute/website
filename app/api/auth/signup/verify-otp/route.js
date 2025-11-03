import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import connectDB from '../../../../../lib/db';
import OTP from '../../../../../models/OTP';
import User from '../../../../../models/User';
import { sendWelcomeEmail } from '../../../../../lib/email';

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    const { phone, otp, name, email, password } = body;

    if (!phone || !otp || !name || !email || !password) {
      return NextResponse.json(
        { success: false, msg: 'All fields are required' },
        { status: 400 }
      );
    }

    // Verify OTP
    const otpRecord = await OTP.findOne({ phone });
    if (!otpRecord || otpRecord.otp !== otp) {
      return NextResponse.json(
        { success: false, msg: 'Invalid or expired OTP' },
        { status: 400 }
      );
    }

    // Check if OTP is expired (60 seconds)
    const otpAge = Date.now() - otpRecord.createdAt.getTime();
    if (otpAge > 60000) {
      await OTP.deleteOne({ _id: otpRecord._id });
      return NextResponse.json(
        { success: false, msg: 'OTP has expired' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
    });

    // Delete OTP
    await OTP.deleteOne({ _id: otpRecord._id });

    // Generate JWT token
    const token = jwt.sign({ id: user._id.toString() }, JWT_SECRET, {
      expiresIn: '24h',
    });

    // Send welcome email
    await sendWelcomeEmail(email, name);

    return NextResponse.json({
      success: true,
      token,
    });
  } catch (error) {
    console.error('Error in verify-otp:', error);
    return NextResponse.json(
      { success: false, msg: 'Internal server error' },
      { status: 500 }
    );
  }
}
