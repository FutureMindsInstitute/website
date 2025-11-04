'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Modal from '../ui/Modal';
import apiClient from '../../lib/api';

const courseSchema = z.object({
  name: z.string().min(1, 'Course name is required'),
  description: z.string().min(1, 'Description is required'),
  duration: z.string().min(1, 'Duration is required'),
  courseTotalDuration: z.number().min(1, 'Total duration must be at least 1'),
  features: z.array(z.string().min(1, 'Feature cannot be empty')).min(1, 'At least one feature is required'),
  price: z.number().min(0, 'Price must be positive'),
  discountPrice: z.number().min(0, 'Discount price must be positive'),
  earlyBirdTitle: z.string().min(1, 'Early bird title is required'),
  isActive: z.boolean().default(true),
  categories: z.array(z.string()).optional(),
});

const CourseForm = ({ isOpen, onClose, course = null, onSuccess }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [features, setFeatures] = useState(['']);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadingFile, setUploadingFile] = useState(false);
  const [brochurePath, setBrochurePath] = useState(null);
  
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(courseSchema),
    defaultValues: course || {
      name: '',
      description: '',
      duration: '',
      courseTotalDuration: 1,
      features: [''],
      price: 0,
      discountPrice: 0,
      earlyBirdTitle: '',
      isActive: true,
      categories: [],
    },
  });

  useEffect(() => {
    if (isOpen) {
      fetchCategories();
      if (course) {
        const courseFeatures = Array.isArray(course.features) 
          ? course.features.filter(f => f && f.trim().length > 0)
          : (course.features ? [course.features] : ['']);
        
        const courseForForm = {
          ...course,
          features: courseFeatures.length > 0 ? courseFeatures : [''],
          categories: Array.isArray(course.categories) ? course.categories.map(cat => 
            typeof cat === 'object' ? cat._id : cat
          ) : []
        };
        setFeatures(courseFeatures.length > 0 ? courseFeatures : ['']);
        setBrochurePath(course.brochurePdf || null);
        setSelectedFile(null);
        reset(courseForForm);
      } else {
        setFeatures(['']);
        setBrochurePath(null);
        setSelectedFile(null);
        reset({
          name: '',
          description: '',
          duration: '',
          courseTotalDuration: 1,
          features: [''],
          price: 0,
          discountPrice: 0,
          earlyBirdTitle: '',
          isActive: true,
          categories: [],
        });
      }
    }
  }, [isOpen, course, reset]);

  const fetchCategories = async () => {
    try {
      console.log('Fetching categories for course form...');
      const data = await apiClient.getCategories();
      console.log('Categories fetched:', data);
      setCategories(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setCategories([]);
    }
  };

  const addFeature = () => {
    const newFeatures = [...features, ''];
    setFeatures(newFeatures);
    setValue('features', newFeatures);
  };

  const removeFeature = (index) => {
    if (features.length > 1) {
      const newFeatures = features.filter((_, i) => i !== index);
      setFeatures(newFeatures);
      setValue('features', newFeatures);
    }
  };

  const updateFeature = (index, value) => {
    const newFeatures = [...features];
    newFeatures[index] = value;
    setFeatures(newFeatures);
    setValue('features', newFeatures);
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (file.type !== 'application/pdf') {
      alert('Please select a PDF file');
      e.target.value = '';
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert('File size must be less than 10MB');
      e.target.value = '';
      return;
    }

    setSelectedFile(file);
    setUploadingFile(true);

    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const path = await apiClient.uploadBrochure(formData);
      console.log('Brochure uploaded:', path);
      setBrochurePath(path);
      setSelectedFile(null);
    } catch (error) {
      console.error('Error uploading brochure:', error);
      alert('Failed to upload brochure. Please try again.');
      setSelectedFile(null);
      e.target.value = '';
    } finally {
      setUploadingFile(false);
    }
  };

  const handleRemoveBrochure = () => {
    setBrochurePath(null);
    setSelectedFile(null);
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // Ensure brochurePdf is properly set - handle empty strings
      const brochurePdfValue = brochurePath && brochurePath.trim() !== '' ? brochurePath.trim() : null;
      console.log('Brochure path before submission:', brochurePath);
      console.log('Brochure PDF value to send:', brochurePdfValue);
      
      const courseData = {
        ...data,
        features: data.features.filter(f => f && f.trim().length > 0),
        categories: Array.isArray(data.categories) ? data.categories : [],
        brochurePdf: brochurePdfValue,
      };
      
      console.log('Submitting course data:', courseData);
      
      if (course) {
        await apiClient.updateCourse(course._id, courseData);
      } else {
        await apiClient.createCourse(courseData);
      }
      onSuccess?.();
      onClose();
    } catch (error) {
      console.error('Error saving course:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={course ? 'Edit Course' : 'Create New Course'} size="lg">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
        <div>
          <Input
            label="Course Name"
            placeholder="Enter course name"
            error={errors.name?.message}
            required
            {...register('name')}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-800 mb-1">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            rows={3}
            className="block w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white placeholder-gray-400 resize-none"
            placeholder="Enter course description"
            {...register('description')}
          />
          {errors.description && (
            <p className="text-sm text-red-600 mt-1">{errors.description.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div>
            <Input
              label="Duration Title"
              placeholder="e.g., 6 months, 12 weeks"
              error={errors.duration?.message}
              required
              {...register('duration')}
            />
          </div>

          <div>
            <Input
              label="Total Course Duration (Days)"
              type="number"
              min="1"
              placeholder="1"
              error={errors.courseTotalDuration?.message}
              required
              {...register('courseTotalDuration', { valueAsNumber: true })}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div>
            <Input
              label="Price (₹)"
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              error={errors.price?.message}
              required
              {...register('price', { valueAsNumber: true })}
            />
          </div>

          <div>
            <Input
              label="Discount Price (₹)"
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              error={errors.discountPrice?.message}
              required
              {...register('discountPrice', { valueAsNumber: true })}
            />
          </div>
        </div>

        <div>
          <Input
            label="Early Bird Title"
            placeholder="e.g., Early Bird Special"
            error={errors.earlyBirdTitle?.message}
            required
            {...register('earlyBirdTitle')}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-800 mb-2">
            Course Brochure (PDF)
          </label>
          <div className="space-y-2">
            {brochurePath ? (
              <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-md">
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="text-sm text-green-800">Brochure uploaded</span>
                  <a 
                    href={brochurePath} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:text-blue-800 underline"
                  >
                    View PDF
                  </a>
                </div>
                <button
                  type="button"
                  onClick={handleRemoveBrochure}
                  className="text-sm text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              </div>
            ) : (
              <div>
                <input
                  type="file"
                  accept=".pdf,application/pdf"
                  onChange={handleFileChange}
                  disabled={uploadingFile}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed"
                />
                {uploadingFile && (
                  <p className="text-sm text-gray-500 mt-1">Uploading...</p>
                )}
                <p className="text-xs text-gray-500 mt-1">Maximum file size: 10MB</p>
              </div>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-800 mb-2">
            Features <span className="text-red-500">*</span>
          </label>
          <div className="space-y-2">
            {features.map((feature, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  placeholder={`Feature ${index + 1}`}
                  value={feature}
                  onChange={(e) => updateFeature(index, e.target.value)}
                  className="flex-1"
                />
                <button
                  type="button"
                  onClick={() => removeFeature(index)}
                  disabled={features.length === 1}
                  className="px-3 py-2 text-sm font-medium text-red-600 hover:text-red-700 disabled:text-gray-400 disabled:cursor-not-allowed border border-red-300 hover:border-red-400 disabled:border-gray-300 rounded-md transition-colors"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addFeature}
              className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 border border-blue-300 hover:border-blue-400 rounded-md transition-colors"
            >
              + Add Feature
            </button>
          </div>
          {errors.features && (
            <p className="text-sm text-red-600 mt-1">{errors.features.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-800 mb-2">
            Categories
          </label>
          
          <div className="border border-gray-300 rounded-md p-3 max-h-32 sm:max-h-40 overflow-y-auto bg-gray-50">
            {categories.length > 0 ? (
              <div className="space-y-2">
                {categories.map((category) => (
                  <label key={category._id} className="flex items-start space-x-2 cursor-pointer hover:bg-gray-100 p-2 rounded transition-colors">
                    <input
                      type="checkbox"
                      className="mt-0.5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-2"
                      onChange={(e) => {
                        const currentValues = watch('categories') || [];
                        if (e.target.checked) {
                          setValue('categories', [...currentValues, category._id]);
                        } else {
                          setValue('categories', currentValues.filter(id => id !== category._id));
                        }
                      }}
                      checked={watch('categories')?.includes(category._id) || false}
                    />
                    <div className="flex-1 min-w-0">
                      <span className="text-sm font-medium text-gray-900 block">{category.name}</span>
                      <span className="text-xs text-gray-500 block mt-0.5">{category.description}</span>
                    </div>
                  </label>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-600 text-center py-2">No categories available. Create categories first.</p>
            )}
          </div>
          {errors.categories && (
            <p className="text-sm text-red-600 mt-1">{errors.categories.message}</p>
          )}
        </div>

        <div className="flex items-center justify-center sm:justify-start">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-2"
              {...register('isActive')}
            />
            <span className="text-sm font-medium text-gray-700">Active Course</span>
          </label>
        </div>

        <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3 sm:pt-6 border-t border-gray-200 bg-gray-50 -mx-6 px-4 sm:px-6 py-5 rounded-b-lg sticky bottom-0">
          <Button
            type="submit"
            loading={loading}
            disabled={loading}
            className="w-full sm:w-auto order-1 sm:order-2"
          >
            {course ? 'Update Course' : 'Create Course'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default CourseForm;

