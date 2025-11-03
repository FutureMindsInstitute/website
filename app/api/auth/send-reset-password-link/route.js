import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import connectDB from '../../../../lib/db';
import User from '../../../../models/User';
import { sendPasswordResetEmail } from '../../../../lib/email';

const JWT_SECRET = process.env.JWT_SECRET;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { success: false, message: 'Email is required' },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Email doesn't exist, please register first." },
        { status: 404 }
      );
    }

    // Check if reset link was sent recently (within 2 minutes)
    if (user.lastResetPasswordAt) {
      const timeSinceLastReset = Date.now() - user.lastResetPasswordAt.getTime();
      if (timeSinceLastReset < 120000) { // 2 minutes
        return NextResponse.json(
          { success: false, message: 'Please wait 2 minutes before requesting another reset link.' },
          { status: 400 }
        );
      }
    }

    // Generate reset token (expires in 5 minutes)
    const resetToken = jwt.sign({ id: user._id.toString() }, JWT_SECRET, {
      expiresIn: '5m',
    });

    user.resetToken = resetToken;
    user.resetTokenExpire = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes
    await user.save();

    // Send reset email
    const resetLink = `${FRONTEND_URL}/reset-password?token=${resetToken}`;
    await sendPasswordResetEmail(email, resetLink);

    return NextResponse.json({
      success: true,
      message: 'Reset password link sent successfully. Check your email.',
    });
  } catch (error) {
    console.error('Error in send-reset-password-link:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
