import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import User from '../../models/User';
import connectDB from '../../lib/db';

const JWT_SECRET = process.env.JWT_SECRET;

export default async function userAuth(req, handler) {
  try {
    await connectDB();
    
    const authHeader = req.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');

    if (!token) {
      return NextResponse.json(
        { success: false, msg: 'Authentication required' },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      return NextResponse.json(
        { success: false, msg: 'User not found' },
        { status: 401 }
      );
    }

    req.user = user;
    return handler(req);
  } catch (error) {
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      return NextResponse.json(
        { success: false, msg: 'Invalid or expired token' },
        { status: 401 }
      );
    }
    return NextResponse.json(
      { success: false, msg: 'Internal server error' },
      { status: 500 }
    );
  }
}
