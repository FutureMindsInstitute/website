import { cache } from 'react';
import Courses from './Courses';

// Cache the API calls - using internal API routes for better compatibility
const getCoursesData = cache(async () => {
  try {
    // In server components, we can use the API routes directly
    // For production, use the full URL; for local, use localhost
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 
                   process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000';
    
    // Fetch from our optimized API routes
    const [coursesRes, categoriesRes] = await Promise.all([
      fetch(`${baseUrl}/api/course`, {
        next: { revalidate: 60 }, // Cache for 60 seconds
        headers: {
          'Content-Type': 'application/json',
        }
      }),
      fetch(`${baseUrl}/api/category`, {
        next: { revalidate: 60 }, // Cache for 60 seconds
        headers: {
          'Content-Type': 'application/json',
        }
      })
    ]);

    if (!coursesRes.ok || !categoriesRes.ok) {
      throw new Error(`Failed to fetch data: ${coursesRes.status} ${categoriesRes.status}`);
    }

    const coursesData = await coursesRes.json();
    const categoriesData = await categoriesRes.json();

    return {
      courses: coursesData.success ? coursesData.courses : [],
      categories: categoriesData.success ? categoriesData.categories : []
    };
  } catch (error) {
    console.error('Error in getCoursesData:', error);
    throw error;
  }
});

export default async function CoursesWrapper() {
  try {
    const { courses, categories } = await getCoursesData();
    
    // Filter only active courses (in case any slipped through)
    const activeCourses = Array.isArray(courses) ? courses.filter(c => c.isActive) : [];
    
    return <Courses initialCourses={activeCourses} initialCategories={categories || []} />;
  } catch (error) {
    console.error('Error fetching courses data in wrapper:', error);
    // Fallback to client-side fetching if server-side fails
    return <Courses />;
  }
}

