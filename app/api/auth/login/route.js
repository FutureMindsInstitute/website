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
    const { phone, password } = body;

    if (!phone || !password) {
      return NextResponse.json(
        { success: false, msg: 'Phone and password are required' },
        { status: 400 }
      );
    }

    // Find user
    const user = await User.findOne({ phone });
    if (!user) {
      return NextResponse.json(
        { success: false, msg: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Check password
    if (!user.password) {
      return NextResponse.json(
        { success: false, msg: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, msg: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id.toString() }, JWT_SECRET, {
      expiresIn: '24h',
    });

    return NextResponse.json({
      token,
    });
  } catch (error) {
    console.error('Error in login:', error);
    return NextResponse.json(
      { success: false, msg: 'Internal server error' },
      { status: 500 }
    );
  }
}
