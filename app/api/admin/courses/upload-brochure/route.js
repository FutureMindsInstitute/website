import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';
import adminAuth from '../../../../../middleware/adminAuth';
import { generateUniqueFileName } from '../../../../../lib/utils';

async function handler(req) {
  try {
    if (req.method !== 'POST') {
      return NextResponse.json(
        { success: false, msg: 'Method not allowed' },
        { status: 405 }
      );
    }

    const formData = await req.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json(
        { success: false, msg: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file type
    if (file.type !== 'application/pdf') {
      return NextResponse.json(
        { success: false, msg: 'Only PDF files are allowed' },
        { status: 400 }
      );
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { success: false, msg: 'File size must be less than 10MB' },
        { status: 400 }
      );
    }

    // Ensure brochures directory exists
    const brochuresDir = join(process.cwd(), 'public', 'brochures');
    if (!existsSync(brochuresDir)) {
      await mkdir(brochuresDir, { recursive: true });
    }

    // Generate unique filename
    const fileName = generateUniqueFileName(file.name);
    const filePath = join(brochuresDir, fileName);

    // Convert file to buffer and save
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filePath, buffer);

    // Return the public path
    const publicPath = `/brochures/${fileName}`;

    return NextResponse.json({
      success: true,
      path: publicPath,
    });
  } catch (error) {
    console.error('Error uploading brochure:', error);
    return NextResponse.json(
      { success: false, msg: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  return adminAuth(req, handler);
}

