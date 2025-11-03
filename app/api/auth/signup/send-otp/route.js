import { NextResponse } from 'next/server';
import validator from 'validator';
import connectDB from '../../../../../lib/db';
import OTP from '../../../../../models/OTP';
import User from '../../../../../models/User';
import { generateOTP } from '../../../../../lib/otp';
import { sendOTP } from '../../../../../lib/sms';
import { createRateLimiterWithKey } from '../../../../../lib/rateLimit';

const rateLimiter = createRateLimiterWithKey(
  3600000, // 1 hour
  3, // 3 requests
  (req) => {
    const body = req.body ? JSON.parse(req.body) : {};
    return `${req.ip || 'unknown'}_${body.phone || 'unknown'}`;
  }
);

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    const { phone, email, name, password } = body;

    if (!phone || !email || !name || !password) {
      return NextResponse.json(
        { success: false, msg: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate phone (Indian mobile number)
    if (!validator.isMobilePhone(phone, 'en-IN')) {
      return NextResponse.json(
        { success: false, msg: 'Invalid phone number' },
        { status: 400 }
      );
    }

    // Validate email
    if (!validator.isEmail(email)) {
      return NextResponse.json(
        { success: false, msg: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { phone }],
    });

    if (existingUser) {
      return NextResponse.json(
        { success: false, msg: 'User already exists with this email or phone' },
        { status: 400 }
      );
    }

    // Check if OTP was sent recently (within 60 seconds)
    const recentOTP = await OTP.findOne({
      phone,
      createdAt: { $gte: new Date(Date.now() - 60000) },
    });

    if (recentOTP) {
      return NextResponse.json(
        { success: false, msg: 'Please wait 60 seconds before requesting another OTP' },
        { status: 400 }
      );
    }

    // Generate and save OTP
    const otp = generateOTP();
    await OTP.deleteMany({ phone }); // Delete old OTPs
    await OTP.create({ phone, otp });

    // Send OTP via SMS
    await sendOTP(phone, otp);

    return NextResponse.json({
      success: true,
      msg: 'OTP sent successfully',
    });
  } catch (error) {
    console.error('Error in send-otp:', error);
    return NextResponse.json(
      { success: false, msg: 'Internal server error' },
      { status: 500 }
    );
  }
}
