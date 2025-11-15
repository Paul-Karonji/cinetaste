'use client';

import { useEffect, useState } from 'react';
import TitleCard from '@/components/TitleCard';
import TitleGrid from '@/components/TitleGrid';
import Container from '@/components/Container';
import Loading from '@/components/Loading';
import Button from '@/components/Button';

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
      {/* Hero Section */}
      <div className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-background z-10" />
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: trendingMovies[0]?.backdrop_path
              ? `url(https://image.tmdb.org/t/p/original${trendingMovies[0].backdrop_path})`
              : 'none',
          }}
        />
        <div className="relative z-20 text-center px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-highlight to-primary bg-clip-text text-transparent">
            Welcome to CineTaste
          </h1>
          <p className="text-xl md:text-2xl text-accent/80 mb-8 max-w-3xl mx-auto">
            Your personalized movie & series companion. Track what you watch, get AI-powered
            recommendations, and discover your next favorite title.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" size="lg">
              Browse Trending
            </Button>
            <Button variant="outline" size="lg">
              Explore by Mood
            </Button>
          </div>
        </div>
      </div>

      <Container>
        {/* Trending Movies */}
        <TitleGrid title="🔥 Trending Movies">
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
        </TitleGrid>

        {/* Trending TV Shows */}
        <TitleGrid title="📺 Trending TV Shows">
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
        </TitleGrid>

        {/* Features Overview */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="p-6 bg-secondary rounded-lg border border-accent/10">
            <div className="text-4xl mb-4">📝</div>
            <h3 className="text-xl font-bold mb-2">Track Everything</h3>
            <p className="text-accent/70">
              Keep a detailed history of all movies, series, and anime you've watched with ratings and notes.
            </p>
          </div>
          <div className="p-6 bg-secondary rounded-lg border border-accent/10">
            <div className="text-4xl mb-4">🤖</div>
            <h3 className="text-xl font-bold mb-2">Smart Recommendations</h3>
            <p className="text-accent/70">
              Get AI-powered suggestions based on your unique taste, mood, and viewing patterns.
            </p>
          </div>
          <div className="p-6 bg-secondary rounded-lg border border-accent/10">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-bold mb-2">Insightful Stats</h3>
            <p className="text-accent/70">
              Discover your watching habits, favorite genres, and auto-generated yearly top 10 lists.
            </p>
          </div>
        </div>
      </Container>
    </main>
  );
}
