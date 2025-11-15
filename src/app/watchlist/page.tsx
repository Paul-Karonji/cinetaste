'use client';

import { useState } from 'react';
import Container from '@/components/Container';
import Button from '@/components/Button';

export default function WatchlistPage() {
  const [watchlist, setWatchlist] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'Movies', 'Series', 'Anime', 'Weekend Picks'];

  return (
    <Container>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">My Watchlist</h1>
          <p className="text-accent/70">
            {watchlist.length} titles waiting to be watched
          </p>
        </div>
        <Button variant="primary">
          + Add Title
        </Button>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedCategory === category
                ? 'bg-primary text-accent'
                : 'bg-secondary text-accent/70 hover:bg-secondary/80'
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {/* Empty State */}
      {watchlist.length === 0 && (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">📋</div>
          <h2 className="text-2xl font-bold mb-2">Your watchlist is empty</h2>
          <p className="text-accent/70 mb-6">
            Start adding movies, series, and anime you want to watch!
          </p>
          <Button variant="primary">Explore Titles</Button>
        </div>
      )}

      {/* Watchlist Grid - Will be populated with actual data */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {/* Title cards will go here */}
      </div>
    </Container>
  );
}
