'use client';

import { useState } from 'react';
import Container from '@/components/Container';
import Button from '@/components/Button';

export default function WatchlistPage() {
  const [watchlist, setWatchlist] = useState<any[]>([]);

  return (
    <Container>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-4xl font-bold" style={{ color: '#F5F5F5' }}>My Watchlist</h1>
        <div className="flex gap-3">
          {['Filter', 'Sort'].map((label) => (
            <button
              key={label}
              className="px-4 py-2 rounded-lg transition-all"
              style={{
                backgroundColor: '#221F1F',
                color: '#F5F5F5',
                border: '1px solid #B81D24',
                opacity: 0.9,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.filter = 'brightness(1.2)')}
              onMouseLeave={(e) => (e.currentTarget.style.filter = 'brightness(1)')}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Empty State */}
      {watchlist.length === 0 && (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">📋</div>
          <h2 className="text-2xl font-bold mb-2" style={{ color: '#F5F5F5' }}>
            Your watchlist is empty
          </h2>
          <p className="mb-6" style={{ color: '#F5F5F5', opacity: 0.7 }}>
            Start adding movies, series, and anime you want to watch!
          </p>
          <Button variant="primary">Explore Titles</Button>
        </div>
      )}

      {/* Watchlist Grid - Will be populated with actual data */}
      <div className="grid grid-cols-5 gap-5">
        {/* Title cards will go here */}
      </div>
    </Container>
  );
}
