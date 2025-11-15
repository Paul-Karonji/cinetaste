'use client';

import { useState } from 'react';
import Container from '@/components/Container';
import { Star } from 'lucide-react';

// Sample data for demonstration
const sampleHistory = [
  {
    id: 1,
    title: 'Inception',
    poster: 'https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg',
    rating: 4.5,
    watchedDate: 'November 15, 2025',
    review: 'An incredible cinematic experience that left me speechless. The visuals, story, and performances were all top-tier.',
  },
  {
    id: 2,
    title: 'The Dark Knight',
    poster: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
    rating: 5,
    watchedDate: 'November 14, 2025',
    review: 'An incredible cinematic experience that left me speechless. The visuals, story, and performances were all top-tier.',
  },
  {
    id: 3,
    title: 'Interstellar',
    poster: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
    rating: 4.8,
    watchedDate: 'November 13, 2025',
    review: 'An incredible cinematic experience that left me speechless. The visuals, story, and performances were all top-tier.',
  },
];

export default function HistoryPage() {
  const [history] = useState<any[]>(sampleHistory);

  return (
    <Container>
      <h1 className="text-4xl font-bold mb-6" style={{ color: '#F5F5F5' }}>
        Watch History
      </h1>

      {/* Empty State */}
      {history.length === 0 && (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🕒</div>
          <h2 className="text-2xl font-bold mb-2" style={{ color: '#F5F5F5' }}>
            No history yet
          </h2>
          <p style={{ color: '#F5F5F5', opacity: 0.7 }}>
            Start watching and rating titles to build your history timeline!
          </p>
        </div>
      )}

      {/* Timeline */}
      <div className="space-y-6">
        {history.map((item) => (
          <div
            key={item.id}
            className="flex gap-6 p-6 rounded-xl"
            style={{ backgroundColor: '#221F1F' }}
          >
            <img
              src={item.poster}
              alt={item.title}
              className="w-32 h-48 object-cover rounded-lg"
            />
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-2xl font-bold mb-2" style={{ color: '#F5F5F5' }}>
                    {item.title}
                  </h3>
                  <p
                    className="mb-4"
                    style={{ color: '#F5F5F5', opacity: 0.7, fontSize: '15px' }}
                  >
                    Watched on {item.watchedDate}
                  </p>
                </div>
                <div
                  className="flex items-center gap-2 px-4 py-2 rounded-lg"
                  style={{ backgroundColor: '#121212' }}
                >
                  <Star
                    className="w-5 h-5 fill-current"
                    style={{ color: '#E50914' }}
                  />
                  <span className="font-bold" style={{ color: '#F5F5F5' }}>
                    {item.rating}
                  </span>
                </div>
              </div>
              <p
                style={{
                  color: '#F5F5F5',
                  opacity: 0.75,
                  lineHeight: '1.6',
                  fontSize: '15px',
                }}
              >
                {item.review}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}
