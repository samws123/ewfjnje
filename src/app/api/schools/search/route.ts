import { NextRequest, NextResponse } from 'next/server';
import { searchSchools } from '@/lib/database';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    if (!query || query.trim().length < 2) {
      return NextResponse.json(
        { error: 'Query must be at least 2 characters long' },
        { status: 400 }
      );
    }

    const schools = await searchSchools(query.trim());
    
    return NextResponse.json({ schools });
  } catch (error: any) {
    console.error('Error searching schools:', error);
    return NextResponse.json(
      { error: 'Failed to search schools' },
      { status: 500 }
    );
  }
}
