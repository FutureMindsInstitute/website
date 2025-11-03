import { NextResponse } from 'next/server';
import connectDB from '../../../lib/db';
import Category from '../../../models/Category';

export async function GET(req) {
  try {
    await connectDB();

    const categories = await Category.find();
    return NextResponse.json({
      success: true,
      categories,
    });
  } catch (error) {
    console.error('Error in public categories:', error);
    return NextResponse.json(
      { success: false, msg: 'Internal server error' },
      { status: 500 }
    );
  }
}
