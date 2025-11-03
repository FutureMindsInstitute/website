import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import connectDB from '../../../../../lib/db';
import User from '../../../../../models/User';
import Course from '../../../../../models/Course';
import userAuth from '../../../../../middleware/userAuth';

const razorpay = new Razorpay({
  key_id: process.env.RAZ_KEY_ID,
  key_secret: process.env.RAZ_KEY_SECRET,
});

async function handler(req, { params }) {
  try {
    await connectDB();

    const userId = params.userId;
    const body = await req.json();
    const { courseId } = body;

    // Verify user matches token
    if (req.user._id.toString() !== userId) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 403 }
      );
    }

    if (!courseId) {
      return NextResponse.json(
        { success: false, message: 'Course ID is required' },
        { status: 400 }
      );
    }

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return NextResponse.json(
        { success: false, message: 'Course not found' },
        { status: 404 }
      );
    }

    if (!course.isActive) {
      return NextResponse.json(
        { success: false, message: 'Course is not active' },
        { status: 400 }
      );
    }

    // Check if user is already subscribed
    const isAlreadySubscribed = user.courses.some(
      (c) => c.courseId.toString() === courseId
    );
    if (isAlreadySubscribed) {
      return NextResponse.json(
        { success: false, message: 'User is already subscribed to this course' },
        { status: 400 }
      );
    }

    // Create Razorpay order
    const amount = course.discountPrice * 100; // Convert to paise
    const receipt = `receipt_${userId}_${courseId}_${Date.now()}`;

    const order = await razorpay.orders.create({
      amount,
      currency: 'INR',
      receipt,
    });

    const prefill = {
      name: user.name || '',
      email: user.email || '',
      contact: user.phone || '',
      countryCode: '+91',
    };

    return NextResponse.json({
      success: true,
      message: 'Course subscription initiated successfully',
      data: {
        order,
        prefill,
      },
    });
  } catch (error) {
    console.error('Error in subscribe:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(req, { params }) {
  return userAuth(req, (req) => handler(req, { params }));
}
