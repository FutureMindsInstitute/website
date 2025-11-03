import { NextResponse } from 'next/server';
import connectDB from '../../../../../lib/db';
import Category from '../../../../../models/Category';
import Course from '../../../../../models/Course';
import adminAuth from '../../../../../middleware/adminAuth';

async function handler(req, { params }) {
  try {
    await connectDB();

    const id = params.id;

    if (req.method === 'PUT') {
      const body = await req.json();
      const { name, description } = body;

      const category = await Category.findByIdAndUpdate(
        id,
        { name, description },
        { new: true, runValidators: true }
      );

      if (!category) {
        return NextResponse.json(
          { success: false, msg: 'Category not found' },
          { status: 404 }
        );
      }

      return NextResponse.json({
        success: true,
        category,
      });
    } else if (req.method === 'DELETE') {
      const category = await Category.findByIdAndDelete(id);
      if (!category) {
        return NextResponse.json(
          { success: false, msg: 'Category not found' },
          { status: 404 }
        );
      }

      // Remove category reference from all courses
      await Course.updateMany(
        { categories: id },
        { $pull: { categories: id } }
      );

      return NextResponse.json({
        success: true,
        msg: 'Category deleted successfully',
      });
    } else {
      return NextResponse.json(
        { success: false, msg: 'Method not allowed' },
        { status: 405 }
      );
    }
  } catch (error) {
    console.error('Error in category operation:', error);
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
