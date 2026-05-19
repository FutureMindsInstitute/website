import { NextResponse } from 'next/server';
import connectDB from '../../../lib/db';
import Course from '../../../models/Course';
import Category from '../../../models/Category';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await connectDB();

    // Optimize query: only select needed fields and populate only necessary category fields
    const courses = await Course.find({ isActive: true })
      .select('name description duration courseTotalDuration features price discountPrice earlyBirdTitle isActive categories brochurePdf')
      .populate('categories', 'name description')
      .lean(); // Use lean() for better performance (returns plain JS objects)

    return NextResponse.json({
      success: true,
      courses,
    }, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
      },
    });
  } catch (error) {
    console.error('Error in public courses:', error);
    return NextResponse.json(
      { success: false, msg: 'Internal server error' },
      { status: 500 }
    );
  }
}
