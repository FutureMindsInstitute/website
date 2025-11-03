import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

// Hardcoded admin credentials (as per API documentation)
const ADMIN_EMAIL = 'admin@womeninproductindia.com';
const ADMIN_PASSWORD = 'admin@123';

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { success: false, msg: 'Access denied. Admins only.' },
        { status: 403 }
      );
    }

    // Generate JWT token with admin ID
    const token = jwt.sign({ id: 'admin' }, JWT_SECRET, {
      expiresIn: '24h',
    });

    return NextResponse.json({
      success: true,
      msg: 'Admin authenticated successfully',
      token,
    });
  } catch (error) {
    console.error('Error in admin login:', error);
    return NextResponse.json(
      { success: false, msg: 'Internal server error' },
      { status: 500 }
    );
  }
}
