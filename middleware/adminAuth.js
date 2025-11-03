import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export default async function adminAuth(req, handler) {
  try {
    const authHeader = req.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');

    if (!token) {
      return NextResponse.json(
        { success: false, msg: 'Authentication required' },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    if (decoded.id !== 'admin') {
      return NextResponse.json(
        { success: false, msg: 'Access denied. Admins only.' },
        { status: 403 }
      );
    }

    req.adminId = decoded.id;
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
