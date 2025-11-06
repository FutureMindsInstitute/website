import { NextResponse } from 'next/server';
import connectDB from '../../../../../lib/db';
import Course from '../../../../../models/Course';
import Category from '../../../../../models/Category';
import Coupon from '../../../../../models/Coupon';
import adminAuth from '../../../../../middleware/adminAuth';
import { deleteBrochureFile } from '../../../../../lib/serverUtils';

async function handler(req, { params }) {
  try {
    await connectDB();

    const id = (await params).id;

    if (req.method === 'PUT') {
      const body = await req.json();
      console.log('Update course - received body:', body);

      // Handle features - convert string to array if needed
      if (body.features && typeof body.features === 'string') {
        body.features = body.features.split(',').map(f => f.trim()).filter(f => f.length > 0);
      }

      // Handle categories - convert string to array if needed
      if (body.categories && typeof body.categories === 'string') {
        body.categories = body.categories.split(',').map(c => c.trim()).filter(c => c.length > 0);
      }

      // Handle brochurePdf - ensure empty strings are converted to null
      if (body.brochurePdf !== undefined) {
        body.brochurePdf = body.brochurePdf && body.brochurePdf.trim() !== '' ? body.brochurePdf.trim() : null;
      }
      console.log('Update course - brochurePdf value:', body.brochurePdf);
      console.log('Update course - body to set:', JSON.stringify(body, null, 2));

      // Get the current course to check for existing brochure
      const currentCourse = await Course.findById(id);
      if (currentCourse && currentCourse.brochurePdf) {
        // If brochurePdf is being changed or removed, delete the old file
        if (body.brochurePdf !== currentCourse.brochurePdf) {
          console.log('Deleting old brochure:', currentCourse.brochurePdf);
          await deleteBrochureFile(currentCourse.brochurePdf);
        }
      }

      // Build update object explicitly to ensure brochurePdf is included
      const updateData = {
        name: body.name,
        description: body.description,
        duration: body.duration,
        courseTotalDuration: body.courseTotalDuration,
        features: body.features,
        price: body.price,
        discountPrice: body.discountPrice,
        earlyBirdTitle: body.earlyBirdTitle,
        isActive: body.isActive !== undefined ? body.isActive : true,
        categories: body.categories || [],
        brochurePdf: body.brochurePdf, // Explicitly include brochurePdf
        updatedAt: Date.now(),
      };

      const course = await Course.findByIdAndUpdate(
        id,
        { $set: updateData },
        { new: true, runValidators: true }
      ).populate('categories');

      if (!course) {
        return NextResponse.json(
          { success: false, msg: 'Course not found' },
          { status: 404 }
        );
      }

      console.log('Course after update - brochurePdf:', course.brochurePdf);
      console.log('Course after update - full course:', JSON.stringify(course.toObject(), null, 2));

      return NextResponse.json({
        success: true,
        course,
      });
    } else if (req.method === 'DELETE') {
      const course = await Course.findById(id);
      if (!course) {
        return NextResponse.json(
          { success: false, msg: 'Course not found' },
          { status: 404 }
        );
      }

      // Delete the brochure PDF file if it exists
      if (course.brochurePdf) {
        console.log('Deleting brochure file for course:', course.brochurePdf);
        await deleteBrochureFile(course.brochurePdf);
      }


      await Coupon.updateMany(
        { courses: course._id },
        { $pull: { courses: course._id } }
      );
      console.log('Removed course reference from coupons');

      await Course.findByIdAndDelete(id);

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
