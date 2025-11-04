import { unlink } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

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

