import axios from 'axios';
import type { TMDBMovie, TMDBTVShow } from '@/types';

const TMDB_API_KEY = process.env.TMDB_API_KEY || '';
const TMDB_BASE_URL = process.env.TMDB_API_BASE_URL || 'https://api.themoviedb.org/3';

const tmdbClient = axios.create({
  baseURL: TMDB_BASE_URL,
  params: {
    api_key: TMDB_API_KEY,
  },
});

export const tmdb = {
  // Search for movies and TV shows
  search: async (query: string) => {
    const { data } = await tmdbClient.get('/search/multi', {
      params: { query, include_adult: false },
    });
    return data.results;
  },

  // Get movie details
  getMovie: async (id: number): Promise<TMDBMovie> => {
    const { data } = await tmdbClient.get(`/movie/${id}`, {
      params: { append_to_response: 'credits,videos' },
    });
    return data;
  },

  // Get TV show details
  getTVShow: async (id: number): Promise<TMDBTVShow> => {
    const { data } = await tmdbClient.get(`/tv/${id}`, {
      params: { append_to_response: 'credits,videos' },
    });
    return data;
  },

  // Get trending
  getTrending: async (mediaType: 'all' | 'movie' | 'tv' = 'all', timeWindow: 'day' | 'week' = 'week') => {
    const { data } = await tmdbClient.get(`/trending/${mediaType}/${timeWindow}`);
    return data.results;
  },

  // Get popular movies
  getPopularMovies: async () => {
    const { data } = await tmdbClient.get('/movie/popular');
    return data.results;
  },

  // Get popular TV shows
  getPopularTVShows: async () => {
    const { data } = await tmdbClient.get('/tv/popular');
    return data.results;
  },

  // Get similar titles
  getSimilar: async (mediaType: 'movie' | 'tv', id: number) => {
    const { data } = await tmdbClient.get(`/${mediaType}/${id}/similar`);
    return data.results;
  },

  // Discover movies by genre
  discoverMovies: async (genreIds?: number[]) => {
    const { data } = await tmdbClient.get('/discover/movie', {
      params: {
        with_genres: genreIds?.join(','),
        sort_by: 'popularity.desc',
      },
    });
    return data.results;
  },

  // Discover TV shows by genre
  discoverTVShows: async (genreIds?: number[]) => {
    const { data } = await tmdbClient.get('/discover/tv', {
      params: {
        with_genres: genreIds?.join(','),
        sort_by: 'popularity.desc',
      },
    });
    return data.results;
  },

  // Get image URL
  getImageUrl: (path: string | null, size: 'w200' | 'w500' | 'original' = 'w500') => {
    if (!path) return '/placeholder-poster.jpg';
    return `https://image.tmdb.org/t/p/${size}${path}`;
  },
};
