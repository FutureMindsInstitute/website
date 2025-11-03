import { NextResponse } from 'next/server';
import connectDB from '../../../../../lib/db';
import User from '../../../../../models/User';
import Course from '../../../../../models/Course';
import userAuth from '../../../../../middleware/userAuth';

async function handler(req) {
  try {
    if (req.method === 'GET') {
      const user = await User.findById(req.user._id)
        .populate('courses.courseId')
        .select('-password');

      if (!user) {
        return NextResponse.json(
          { success: false, msg: 'User not found' },
          { status: 404 }
        );
      }

      return NextResponse.json({
        success: true,
        user,
      });
    } else if (req.method === 'PUT') {
      const body = await req.json();
      const {
        name,
        dateOfBirth,
        gender,
        phone,
        address,
        skills,
        education,
        experience,
        linkedinProfile,
        githubProfile,
        currentRole,
        currentCompany,
        careerObjective,
        preferredJobRoles,
        preferredLocation,
        salaryExpectation,
        portfolio,
      } = body;

      const updateData = {};
      if (name !== undefined) updateData.name = name;
      if (dateOfBirth !== undefined) updateData.dateOfBirth = dateOfBirth;
      if (gender !== undefined) updateData.gender = gender;
      if (phone !== undefined) updateData.phone = phone;
      if (address !== undefined) updateData.address = address;
      if (skills !== undefined) updateData.skills = skills;
      if (education !== undefined) updateData.education = education;
      if (experience !== undefined) updateData.experience = experience;
      if (linkedinProfile !== undefined) updateData.linkedinProfile = linkedinProfile;
      if (githubProfile !== undefined) updateData.githubProfile = githubProfile;
      if (currentRole !== undefined) updateData.currentRole = currentRole;
      if (currentCompany !== undefined) updateData.currentCompany = currentCompany;
      if (careerObjective !== undefined) updateData.careerObjective = careerObjective;
      if (preferredJobRoles !== undefined) updateData.preferredJobRoles = preferredJobRoles;
      if (preferredLocation !== undefined) updateData.preferredLocation = preferredLocation;
      if (salaryExpectation !== undefined) updateData.salaryExpectation = salaryExpectation;
      if (portfolio !== undefined) updateData.portfolio = portfolio;

      const user = await User.findByIdAndUpdate(
        req.user._id,
        { $set: updateData },
        { new: true, runValidators: true }
      ).select('-password');

      return NextResponse.json({
        success: true,
        msg: 'Profile updated successfully',
        user,
      });
    } else if (req.method === 'DELETE') {
      await User.findByIdAndDelete(req.user._id);
      return NextResponse.json({
        success: true,
        msg: 'Profile deleted successfully',
      });
    } else {
      return NextResponse.json(
        { success: false, msg: 'Method not allowed' },
        { status: 405 }
      );
    }
  } catch (error) {
    console.error('Error in user profile:', error);
    return NextResponse.json(
      { success: false, msg: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  return userAuth(req, handler);
}

export async function PUT(req) {
  return userAuth(req, handler);
}

export async function DELETE(req) {
  return userAuth(req, handler);
}
