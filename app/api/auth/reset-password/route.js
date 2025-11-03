import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import connectDB from '../../../../lib/db';
import User from '../../../../models/User';

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    const { resetToken, password } = body;

    if (!resetToken || !password) {
      return NextResponse.json(
        { success: false, message: 'Reset token and password are required' },
        { status: 400 }
      );
    }

    let decoded;
    try {
      decoded = jwt.verify(resetToken, JWT_SECRET);
    } catch (error) {
      return NextResponse.json(
        { success: false, message: 'Reset token expired.' },
        { status: 400 }
      );
    }

    const user = await User.findById(decoded.id);
    if (!user || user.resetToken !== resetToken) {
      return NextResponse.json(
        { success: false, message: 'Invalid reset token.' },
        { status: 400 }
      );
    }

    // Check if token is expired
    if (user.resetTokenExpire && user.resetTokenExpire < new Date()) {
      user.resetToken = undefined;
      user.resetTokenExpire = undefined;
      await user.save();
      return NextResponse.json(
        { success: false, message: 'Reset token expired.' },
        { status: 400 }
      );
    }

    // Check if user can reset (once per hour)
    if (user.lastResetPasswordAt) {
      const timeSinceLastReset = Date.now() - user.lastResetPasswordAt.getTime();
      if (timeSinceLastReset < 3600000) { // 1 hour
        return NextResponse.json(
          { success: false, message: 'Password can only be reset once per hour.' },
          { status: 400 }
        );
      }
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpire = undefined;
    user.lastResetPasswordAt = new Date();
    await user.save();

    return NextResponse.json({
      success: true,
      message: 'Password changed successfully, please login with new password.',
    });
  } catch (error) {
    console.error('Error in reset-password:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
