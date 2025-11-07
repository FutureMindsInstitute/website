import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/models/User";
import mongoose from "mongoose";

function escapeRegExp(s = "") {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;
    const skip = (page - 1) * limit;

    const q = (searchParams.get("q") || '')?.trim();
    const courseParam = (searchParams.get("course") || '')?.trim();

    const filter = {};
    if (q) {
      const safe = escapeRegExp(q);
      filter.$or = [
        { name: { $regex: safe, $options: "i" } },
        { email: { $regex: safe, $options: "i" } },
      ];
    }

    if (courseParam) {
      const rawIds = courseParam
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      const validIds = rawIds.filter((id) => /^[0-9a-fA-F]{24}$/.test(id));
      if (validIds.length === 0) {
        return NextResponse.json(
          { success: false, msg: "Invalid course id(s)" },
          { status: 400 },
        );
      }
      const objectIds = validIds.map((id) => new mongoose.Types.ObjectId(id));
      filter['courses.courseId'] = { $in: objectIds };
    }

    const total = await User.countDocuments(filter);
    const users = await User.find(filter)
      .select("-password")
      .skip(skip)
      .sort({ createdAt: -1 })
      .limit(limit)
      .populate('courses.courseId', 'name')
      .lean();

    return NextResponse.json(
      {
        success: true,
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        users,
      },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, msg: "Internal Server Error" },
      { status: 500 },
    );
  }
}
