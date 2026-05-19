import { NextResponse } from 'next/server';
import connectDB from '../../../lib/db';
import Category from '../../../models/Category';

export const dynamic = 'force-dynamic';

export async function GET(req) {
  try {
    await connectDB();

    // Optimize query: only select needed fields
    const categories = await Category.find()
      .select('name description')
      .lean(); // Use lean() for better performance

    return NextResponse.json({
      success: true,
      categories,
    }, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
      },
    });
  } catch (error) {
    console.error('Error in public categories:', error);
    return NextResponse.json(
      { success: false, msg: 'Internal server error' },
      { status: 500 }
    );
  }
}
