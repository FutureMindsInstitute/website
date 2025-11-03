import { NextResponse } from 'next/server';
import connectDB from '../../../../lib/db';
import Category from '../../../../models/Category';
import Course from '../../../../models/Course';
import adminAuth from '../../../../middleware/adminAuth';

async function handler(req) {
  try {
    await connectDB();

    if (req.method === 'GET') {
      const categories = await Category.find();
      return NextResponse.json({
        success: true,
        categories,
      });
    } else if (req.method === 'POST') {
      const body = await req.json();
      const { name, description } = body;

      if (!name || !description) {
        return NextResponse.json(
          { success: false, msg: 'Name and description are required' },
          { status: 400 }
        );
      }

      const category = await Category.create({
        name,
        description,
      });

      return NextResponse.json({
        success: true,
        category,
      }, { status: 201 });
    } else {
      return NextResponse.json(
        { success: false, msg: 'Method not allowed' },
        { status: 405 }
      );
    }
  } catch (error) {
    console.error('Error in categories:', error);
    return NextResponse.json(
      { success: false, msg: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  return adminAuth(req, handler);
}

export async function POST(req) {
  return adminAuth(req, handler);
}
