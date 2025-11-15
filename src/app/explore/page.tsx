'use client';

import { useState, useEffect } from 'react';
import Container from '@/components/Container';
import TitleCard from '@/components/TitleCard';
import TitleGrid from '@/components/TitleGrid';
import Loading from '@/components/Loading';

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [discoverResults, setDiscoverResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [mediaType, setMediaType] = useState<'movie' | 'tv'>('movie');

  useEffect(() => {
    fetchDiscover();
  }, [mediaType]);

  const fetchDiscover = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/tmdb/discover?mediaType=${mediaType}`);
      const data = await res.json();
      setDiscoverResults(data);
    } catch (error) {
      console.error('Error fetching discover:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    try {
      setLoading(true);
      const res = await fetch(`/api/tmdb/search?query=${encodeURIComponent(searchQuery)}`);
      const data = await res.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Error searching:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-6">Explore</h1>

        {/* Search */}
        <form onSubmit={handleSearch} className="mb-6">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for movies, series, anime..."
              className="w-full px-6 py-4 bg-secondary rounded-lg border border-accent/10 text-accent placeholder-accent/50 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              type="submit"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-primary hover:text-highlight"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </form>

        {/* Media Type Tabs */}
        <div className="flex gap-2">
          <button
            onClick={() => setMediaType('movie')}
            className={`px-6 py-2 rounded-lg transition-colors ${
              mediaType === 'movie'
                ? 'bg-primary text-accent'
                : 'bg-secondary text-accent/70 hover:bg-secondary/80'
            }`}
          >
            Movies
          </button>
          <button
            onClick={() => setMediaType('tv')}
            className={`px-6 py-2 rounded-lg transition-colors ${
              mediaType === 'tv'
                ? 'bg-primary text-accent'
                : 'bg-secondary text-accent/70 hover:bg-secondary/80'
            }`}
          >
            TV Shows
          </button>
        </div>
      </div>

      {loading && <Loading />}

      {/* Search Results */}
      {searchResults.length > 0 && (
        <TitleGrid title="Search Results">
          {searchResults.map((item) => (
            <TitleCard
              key={item.id}
              id={item.id}
              title={item.title || item.name}
              posterPath={item.poster_path}
              releaseDate={item.release_date || item.first_air_date}
              rating={item.vote_average}
              mediaType={item.media_type || mediaType}
            />
          ))}
        </TitleGrid>
      )}

      {/* Discover Results */}
      {!loading && searchResults.length === 0 && (
        <TitleGrid title={`Popular ${mediaType === 'movie' ? 'Movies' : 'TV Shows'}`}>
          {discoverResults.map((item) => (
            <TitleCard
              key={item.id}
              id={item.id}
              title={item.title || item.name}
              posterPath={item.poster_path}
              releaseDate={item.release_date || item.first_air_date}
              rating={item.vote_average}
              mediaType={mediaType}
            />
          ))}
        </TitleGrid>
      )}
    </Container>
  );
}
