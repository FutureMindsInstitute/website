import { NextResponse } from 'next/server';
import connectDB from '../../../lib/db';
import Course from '../../../models/Course';
import Category from '../../../models/Category';

export async function GET() {
  try {
    await connectDB();

    const courses = await Course.find({ isActive: true }).populate('categories');
    return NextResponse.json({
      success: true,
      courses,
    });
  } catch (error) {
    console.error('Error in public courses:', error);
    return NextResponse.json(
      { success: false, msg: 'Internal server error' },
      { status: 500 }
    );
  }
}
