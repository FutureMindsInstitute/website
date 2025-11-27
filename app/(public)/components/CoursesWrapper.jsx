import { cache } from 'react';
import connectDB from '../../../lib/db';
import mongoose from 'mongoose';
import Courses from './Courses';

// Cache the database connection and queries
const getCoursesData = cache(async () => {
  // Connect to database first - this ensures mongoose is ready
  await connectDB();
  
  // Ensure models are registered by importing them
  // Import at runtime to ensure mongoose connection is established
  const CourseModule = await import('../../../models/Course');
  const CategoryModule = await import('../../../models/Category');
  
  const Course = CourseModule.default;
  const Category = CategoryModule.default;
  
  // Double-check models are available
  if (!Course || !Category) {
    throw new Error('Models not properly initialized');
  }
  
  // Fetch courses and categories in parallel
  const [courses, categories] = await Promise.all([
    Course.find({ isActive: true })
      .select('name description duration courseTotalDuration features price discountPrice earlyBirdTitle isActive categories brochurePdf')
      .populate('categories', 'name description')
      .lean(),
    Category.find()
      .select('name description')
      .lean()
  ]);

  // Convert MongoDB documents to JSON-serializable format
  const coursesData = JSON.parse(JSON.stringify(courses));
  const categoriesData = JSON.parse(JSON.stringify(categories));

  return { courses: coursesData, categories: categoriesData };
});

export default async function CoursesWrapper() {
  try {
    const { courses, categories } = await getCoursesData();
    
    // Filter only active courses (in case any slipped through)
    const activeCourses = courses.filter(c => c.isActive);
    
    return <Courses initialCourses={activeCourses} initialCategories={categories} />;
  } catch (error) {
    console.error('Error fetching courses data:', error);
    // Fallback to client-side fetching if server-side fails
    return <Courses />;
  }
}

