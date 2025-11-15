'use client';

import { useEffect, useState } from 'react';
import TitleCard from '@/components/TitleCard';
import Container from '@/components/Container';
import Loading from '@/components/Loading';
import Button from '@/components/Button';
import { Play, Plus } from 'lucide-react';

export default function Home() {
  const [trendingMovies, setTrendingMovies] = useState<any[]>([]);
  const [trendingTV, setTrendingTV] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const [moviesRes, tvRes] = await Promise.all([
          fetch('/api/tmdb/trending?mediaType=movie'),
          fetch('/api/tmdb/trending?mediaType=tv'),
        ]);

        const movies = await moviesRes.json();
        const tv = await tvRes.json();

        setTrendingMovies(movies.slice(0, 12));
        setTrendingTV(tv.slice(0, 12));
      } catch (error) {
        console.error('Error fetching trending:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrending();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <main className="min-h-screen">
      <Container>
        <div className="space-y-8">
          {/* Hero Section */}
          <div className="relative h-[500px] rounded-xl overflow-hidden">
            <img
              src={trendingMovies[0]?.backdrop_path
                ? `https://image.tmdb.org/t/p/original${trendingMovies[0].backdrop_path}`
                : 'https://image.tmdb.org/t/p/original/4XM8DUTQb3lhLemJC51Jx4a2EuA.jpg'}
              alt="Hero"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#121212] via-[#121212]/80 to-transparent">
              <div className="h-full flex flex-col justify-center px-12 max-w-2xl">
                <h1 className="text-5xl font-bold mb-4" style={{ color: '#F5F5F5' }}>
                  {trendingMovies[0]?.title || 'Welcome to CineTaste'}
                </h1>
                <p className="text-lg mb-6" style={{ color: '#F5F5F5', opacity: 0.8, lineHeight: '1.6' }}>
                  {trendingMovies[0]?.overview || 'Your personalized movie & series companion. Track what you watch, get AI-powered recommendations, and discover your next favorite title.'}
                </p>
                <div className="flex gap-4">
                  <Button variant="primary" icon={<Play className="w-5 h-5" />}>
                    Watch Now
                  </Button>
                  <Button variant="secondary" icon={<Plus className="w-5 h-5" />}>
                    Add to List
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Continue Watching */}
          <div>
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#F5F5F5' }}>Continue Watching</h2>
            <div className="flex gap-5 overflow-x-auto pb-4">
              {trendingMovies.slice(0, 4).map((movie) => (
                <TitleCard
                  key={movie.id}
                  id={movie.id}
                  title={movie.title}
                  posterPath={movie.poster_path}
                  releaseDate={movie.release_date}
                  rating={movie.vote_average}
                  mediaType="movie"
                />
              ))}
            </div>
          </div>

          {/* Top Picks For You */}
          <div>
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#F5F5F5' }}>Top Picks For You</h2>
            <div className="flex gap-5 overflow-x-auto pb-4">
              {trendingMovies.map((movie) => (
                <TitleCard
                  key={movie.id}
                  id={movie.id}
                  title={movie.title}
                  posterPath={movie.poster_path}
                  releaseDate={movie.release_date}
                  rating={movie.vote_average}
                  mediaType="movie"
                />
              ))}
            </div>
          </div>

          {/* Trending TV Shows */}
          <div>
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#F5F5F5' }}>Trending TV Shows</h2>
            <div className="flex gap-5 overflow-x-auto pb-4">
              {trendingTV.map((show) => (
                <TitleCard
                  key={show.id}
                  id={show.id}
                  title={show.name}
                  posterPath={show.poster_path}
                  releaseDate={show.first_air_date}
                  rating={show.vote_average}
                  mediaType="tv"
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
