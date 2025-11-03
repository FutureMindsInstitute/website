import { NextResponse } from 'next/server';
import connectDB from '../../../../../lib/db';
import Course from '../../../../../models/Course';
import Category from '../../../../../models/Category';
import adminAuth from '../../../../../middleware/adminAuth';

async function handler(req, { params }) {
  try {
    await connectDB();

    const id = (await params).id;

    if (req.method === 'PUT') {
      const body = await req.json();

      // Handle features - convert string to array if needed
      if (body.features && typeof body.features === 'string') {
        body.features = body.features.split(',').map(f => f.trim()).filter(f => f.length > 0);
      }

      // Handle categories - convert string to array if needed
      if (body.categories && typeof body.categories === 'string') {
        body.categories = body.categories.split(',').map(c => c.trim()).filter(c => c.length > 0);
      }

      const course = await Course.findByIdAndUpdate(
        id,
        { $set: body },
        { new: true, runValidators: true }
      ).populate('categories');

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
    } else if (req.method === 'DELETE') {
      const course = await Course.findByIdAndDelete(id);
      if (!course) {
        return NextResponse.json(
          { success: false, msg: 'Course not found' },
          { status: 404 }
        );
      }

      return NextResponse.json({
        success: true,
        msg: 'Course deleted successfully',
      });
    } else {
      return NextResponse.json(
        { success: false, msg: 'Method not allowed' },
        { status: 405 }
      );
    }
  } catch (error) {
    console.error('Error in course operation:', error);
    return NextResponse.json(
      { success: false, msg: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  return adminAuth(req, (req) => handler(req, { params }));
}

export async function DELETE(req, { params }) {
  return adminAuth(req, (req) => handler(req, { params }));
}
