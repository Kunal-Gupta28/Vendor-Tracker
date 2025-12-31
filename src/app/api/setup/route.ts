import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const preSetupPhoto = formData.get('preSetupPhoto') as File;
    const postSetupPhoto = formData.get('postSetupPhoto') as File;
    const notes = formData.get('notes') as string;

    // Validate
    if (!preSetupPhoto || !postSetupPhoto) {
      return NextResponse.json(
        { message: 'Both photos are required' },
        { status: 400 }
      );
    }

    // In a real app, store photos and notes in database
    // For now, just acknowledge receipt
    console.log('Setup received:', {
      preSetupPhoto: preSetupPhoto.name,
      postSetupPhoto: postSetupPhoto.name,
      notes: notes || 'No notes provided',
    });

    return NextResponse.json(
      { message: 'Setup photos and notes uploaded successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Setup error:', error);
    return NextResponse.json(
      { message: 'Setup upload failed' },
      { status: 500 }
    );
  }
}
