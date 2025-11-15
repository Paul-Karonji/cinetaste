import { NextResponse } from 'next/server';
import { tmdb } from '@/lib/tmdb';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const mediaType = searchParams.get('mediaType') || 'movie';
    const genreIds = searchParams.get('genres')?.split(',').map(Number);

    let results;
    if (mediaType === 'tv') {
      results = await tmdb.discoverTVShows(genreIds);
    } else {
      results = await tmdb.discoverMovies(genreIds);
    }

    return NextResponse.json(results);
  } catch (error) {
    console.error('Error discovering:', error);
    return NextResponse.json({ error: 'Failed to discover titles' }, { status: 500 });
  }
}
