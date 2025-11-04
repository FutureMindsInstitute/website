import { unlink } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

export function formatDate(date) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(amount);
}

export function generateUniqueFileName(originalName) {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 15);
  const extension = originalName.split('.').pop();
  return `${timestamp}-${randomString}.${extension}`;
}

export async function deleteBrochureFile(brochurePath) {
  if (!brochurePath) return false;
  
  try {
    // Extract filename from path (e.g., /brochures/filename.pdf -> filename.pdf)
    const fileName = brochurePath.startsWith('/brochures/') 
      ? brochurePath.replace('/brochures/', '')
      : brochurePath.replace('/brochures', '').replace(/^\//, '');
    
    const filePath = join(process.cwd(), 'public', 'brochures', fileName);
    
    if (existsSync(filePath)) {
      await unlink(filePath);
      console.log('Deleted brochure file:', filePath);
      return true;
    } else {
      console.log('Brochure file not found:', filePath);
      return false;
    }
  } catch (error) {
    console.error('Error deleting brochure file:', error);
    return false;
  }
}

