import { NextResponse } from 'next/server';
import connectDB from '../../../../lib/db';
import Coupon from '../../../../models/Coupon';
import { z } from 'zod';
import Mongoose from 'mongoose';

const isObjectIdString = (s) => /^[0-9a-fA-F]{24}$/.test(s);

const couponSchema = z.object({
  name: z.string().min(1),
  courses: z.array(z.string().min(1)).optional(),
  totalRedeemNumbers: z.coerce.number().min(1),
  amount: z.coerce.number().min(1),
  currentRedeemNumbers: z.coerce.number().min(0).optional().default(0),
  isActive: z.boolean().default(true).optional(),
});

export async function POST(req) {
  try {
    await connectDB();
    
    const body = await req.json();
    const parsed = couponSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, msg: 'Invalid request body', errors: parsed.error.format() }, 
        { status: 400 }
      );
    }
    const data = parsed.data;

    let courseObjectIds = [];
    if (Array.isArray(data.courses)) {
      for (const id of data.courses) {
        if (!isObjectIdString(id)) {
          return NextResponse.json(
            { success: false, msg: `Invalid course id: ${id}` },
            { status: 400 }
          );
        }
        courseObjectIds.push(new Mongoose.Types.ObjectId(id));
      }
    }

    const Payload = {
      name: data.name,
      courses: courseObjectIds,
      totalRedeemNumbers: data.totalRedeemNumbers,
      currentRedeemNumbers: data.currentRedeemNumbers ?? 0,
      amount: data.amount,
      isActive: data.isActive,
    };

    const coupon = await Coupon.create(Payload);
    if (courseObjectIds.length > 0) {
      await coupon.populate('courses');
    }
    return NextResponse.json({ success: true, coupon }, { status: 201 });
  } catch (error) {
    console.error('Error in creating coupon:', error);
    if (error && error.code === 11000) {
      return NextResponse.json(
        { success: false, msg: 'Coupon name already exists', detail: err.keyValue || null },
        { status: 409 }
      );
    }
    return NextResponse.json({ success: false, msg: 'Internal server error' }, { status: 500 });
  }
}