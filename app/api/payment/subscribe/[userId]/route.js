import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import connectDB from '../../../../../lib/db';
import User from '../../../../../models/User';
import Course from '../../../../../models/Course';
import Coupon from '../../../../../models/Coupon';
import userAuth from '../../../../../middleware/userAuth';

async function handler(req, { params }) {
  try {
    await connectDB();

    const razorpay = new Razorpay({
      key_id: process.env.RAZ_KEY_ID,
      key_secret: process.env.RAZ_KEY_SECRET,
    });

    const userId = (await params).userId;
    const body = await req.json();
    const { courseId, couponName } = body;

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

    // Calculate final amount with coupon discount if applicable
    let finalPrice = course.discountPrice;
    let appliedCoupon = null;

    if (couponName) {
      const coupon = await Coupon.findOne({ 
        name: couponName,
        isActive: true 
      }).populate('courses');

      if (coupon) {
        // Check if coupon applies to this course
        const appliesToCourse = coupon.courses.some(
          (c) => c._id.toString() === courseId
        );

        // Check if coupon is not exhausted
        const isAvailable = coupon.currentRedeemNumbers < coupon.totalRedeemNumbers;

        if (appliesToCourse && isAvailable) {
          appliedCoupon = coupon;
          finalPrice = Math.max(0, course.discountPrice - coupon.amount);
        }
      }
    }

    // Calculate GST (18% on final price after coupon)
    const gst = finalPrice * 0.18;
    const totalWithGst = finalPrice + gst;

    // Create Razorpay order
    const amount = Math.round(totalWithGst * 100); // Convert to paise
    // Razorpay receipt must be <= 40 chars
    const shortUser = String(userId).slice(-6);
    const shortCourse = String(courseId).slice(-6);
    const ts = Date.now().toString(36);
    const receipt = `r_${shortUser}_${shortCourse}_${ts}`.slice(0, 40);

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
