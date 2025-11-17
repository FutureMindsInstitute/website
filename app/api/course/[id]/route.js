import { NextResponse } from 'next/server';
import connectDB from '../../../../lib/db';
import Course from '../../../../models/Course';
import Category from '../../../../models/Category';

export async function GET(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { success: false, msg: 'Course ID is required' },
        { status: 400 }
      );
    }

    const course = await Course.findOne({ _id: id, isActive: true }).populate('categories');

    if (!course) {
      return NextResponse.json(
        { success: false, msg: 'Course not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      course,
    });
  } catch (error) {
    console.error('Error fetching course:', error);
    return NextResponse.json(
      { success: false, msg: 'Internal server error' },
      { status: 500 }
    );
  }
}

