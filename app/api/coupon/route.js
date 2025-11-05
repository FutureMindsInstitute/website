import { NextResponse } from 'next/server';
import connectDB from '../../../lib/db';
import Coupon from '../../../models/Coupon';

export async function GET() {
  try {
    await connectDB();
    const coupons = await Coupon.find({ isActive: true });
    return NextResponse.json({ success: true, coupons }, { status: 200 });
  } catch (error) {
    console.error('Error in public coupons:', error);
    return NextResponse.json(
      { success: false, msg: 'Internal server error' },
      { status: 500 }
    );
  }
}