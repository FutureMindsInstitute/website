import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import connectDB from '../../../../lib/db';
import User from '../../../../models/User';

const JWT_SECRET = process.env.JWT_SECRET;

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const resetToken = searchParams.get('resetToken');

    if (!resetToken) {
      return NextResponse.json(
        { success: false, message: 'Reset token is required' },
        { status: 400 }
      );
    }

    let decoded;
    try {
      decoded = jwt.verify(resetToken, JWT_SECRET);
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        // Clean up expired token
        const user = await User.findOne({ resetToken });
        if (user) {
          user.resetToken = undefined;
          user.resetTokenExpire = undefined;
          await user.save();
        }
      }
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

    // Check if token is expired in database
    if (user.resetTokenExpire && user.resetTokenExpire < new Date()) {
      user.resetToken = undefined;
      user.resetTokenExpire = undefined;
      await user.save();
      return NextResponse.json(
        { success: false, message: 'Reset token expired.' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Reset token verified successfully.',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Error in verify-reset-password-link:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
