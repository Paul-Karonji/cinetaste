import { NextResponse } from 'next/server';
import { tmdb } from '@/lib/tmdb';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const mediaType = (searchParams.get('mediaType') as 'all' | 'movie' | 'tv') || 'all';
    const timeWindow = (searchParams.get('timeWindow') as 'day' | 'week') || 'week';

    const results = await tmdb.getTrending(mediaType, timeWindow);
    return NextResponse.json(results);
  } catch (error) {
    console.error('Error fetching trending:', error);
    return NextResponse.json({ error: 'Failed to fetch trending titles' }, { status: 500 });
  }
}
