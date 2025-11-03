import { NextResponse } from 'next/server';
import crypto from 'crypto';
import connectDB from '../../../../../lib/db';
import User from '../../../../../models/User';
import Course from '../../../../../models/Course';
import userAuth from '../../../../../middleware/userAuth';

const RAZ_KEY_SECRET = process.env.RAZ_KEY_SECRET;

function verifyPaymentSignature(orderId, paymentId, signature) {
  const payload = `${orderId}|${paymentId}`;
  const generatedSignature = crypto
    .createHmac('sha256', RAZ_KEY_SECRET)
    .update(payload)
    .digest('hex');
  return generatedSignature === signature;
}

async function handler(req, { params }) {
  try {
    await connectDB();

    const userId = params.userId;
    const body = await req.json();
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      courseId,
    } = body;

    // Verify user matches token
    if (req.user._id.toString() !== userId) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 403 }
      );
    }

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !courseId) {
      return NextResponse.json(
        { success: false, message: 'All payment details are required' },
        { status: 400 }
      );
    }

    // Verify payment signature
    const isValidSignature = verifyPaymentSignature(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    );

    if (!isValidSignature) {
      return NextResponse.json(
        { success: false, message: 'Invalid payment signature' },
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

    // Check if already subscribed
    const isAlreadySubscribed = user.courses.some(
      (c) => c.courseId.toString() === courseId
    );
    if (isAlreadySubscribed) {
      return NextResponse.json(
        { success: false, message: 'User is already subscribed to this course' },
        { status: 400 }
      );
    }

    // Calculate dates
    const startDate = new Date();
    const endDate = new Date(startDate);
    if (course.courseTotalDuration) {
      endDate.setDate(endDate.getDate() + course.courseTotalDuration);
    } else {
      endDate.setMonth(endDate.getMonth() + 6); // Default 6 months
    }

    // Add course to user
    user.courses.push({
      courseId,
      price: course.discountPrice,
      startDate,
      endDate,
      razorpay_order_id,
      razorpay_payment_id,
    });

    await user.save();

    // Populate course details for response
    await user.populate('courses.courseId');

    return NextResponse.json({
      success: true,
      message: 'Payment verified successfully',
      data: user,
    });
  } catch (error) {
    console.error('Error in verify-payment:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(req, { params }) {
  return userAuth(req, (req) => handler(req, { params }));
}
