import { cache } from 'react';
import connectDB from '../../../lib/db';
import Course from '../../../models/Course';
import Category from '../../../models/Category';
import Courses from './Courses';

// Cache the database connection and queries
const getCoursesData = cache(async () => {
  await connectDB();
  
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

