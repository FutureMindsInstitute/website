import { NextResponse } from 'next/server';
import connectDB from '../../../../lib/db';
import Course from '../../../../models/Course';
import Category from '../../../../models/Category';
import adminAuth from '../../../../middleware/adminAuth';

async function handler(req) {
  try {
    await connectDB();

    if (req.method === 'GET') {
      const courses = await Course.find().populate('categories');
      return NextResponse.json({
        success: true,
        courses,
      });
    } else if (req.method === 'POST') {
      const body = await req.json();
      const {
        name,
        description,
        duration,
        courseTotalDuration,
        features,
        price,
        discountPrice,
        earlyBirdTitle,
        isActive,
        categories,
      } = body;

      if (!name || !description || !duration || !courseTotalDuration || !features || 
          price === undefined || discountPrice === undefined || !earlyBirdTitle) {
        return NextResponse.json(
          { success: false, msg: 'All fields are required' },
          { status: 400 }
        );
      }

      // Handle features - convert string to array if needed
      let featuresArray = features;
      if (typeof features === 'string') {
        featuresArray = features.split(',').map(f => f.trim()).filter(f => f.length > 0);
      }

      // Handle categories - convert string to array if needed
      let categoriesArray = categories || [];
      if (typeof categories === 'string') {
        categoriesArray = categories.split(',').map(c => c.trim()).filter(c => c.length > 0);
      }

      const course = await Course.create({
        name,
        description,
        duration,
        courseTotalDuration,
        features: featuresArray,
        price,
        discountPrice,
        earlyBirdTitle,
        isActive: isActive !== undefined ? isActive : true,
        categories: categoriesArray,
      });

      await course.populate('categories');

      return NextResponse.json({
        success: true,
        course,
      }, { status: 201 });
    } else {
      return NextResponse.json(
        { success: false, msg: 'Method not allowed' },
        { status: 405 }
      );
    }
  } catch (error) {
    console.error('Error in courses:', error);
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
