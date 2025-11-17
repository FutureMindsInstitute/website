'use client';

import { useParams } from 'next/navigation';
import CourseDetail from '../../components/CourseDetail';

export default function CoursePage() {
  const params = useParams();
  const courseId = params?.id;

  if (!courseId) {
    return (
      <div className="min-h-screen bg-primary-dark flex items-center justify-center">
        <div className="text-red-400">Invalid course ID</div>
      </div>
    );
  }

  return <CourseDetail courseId={courseId} />;
}

