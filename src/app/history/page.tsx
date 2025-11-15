'use client';

import { useState } from 'react';
import Container from '@/components/Container';

export default function HistoryPage() {
  const [history, setHistory] = useState<any[]>([]);
  const [filterMood, setFilterMood] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'date' | 'rating'>('date');

  return (
    <Container>
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Watch History</h1>
        <p className="text-accent/70">
          A timeline of everything you've watched
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-8">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as 'date' | 'rating')}
          className="px-4 py-2 bg-secondary rounded-lg border border-accent/10 text-accent"
        >
          <option value="date">Sort by Date</option>
          <option value="rating">Sort by Rating</option>
        </select>

        <select
          value={filterMood || ''}
          onChange={(e) => setFilterMood(e.target.value || null)}
          className="px-4 py-2 bg-secondary rounded-lg border border-accent/10 text-accent"
        >
          <option value="">All Moods</option>
          <option value="LAUGH">Funny</option>
          <option value="CRY">Emotional</option>
          <option value="ACTION">Action</option>
          <option value="ROMANTIC">Romantic</option>
        </select>
      </div>

      {/* Empty State */}
      {history.length === 0 && (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🕒</div>
          <h2 className="text-2xl font-bold mb-2">No history yet</h2>
          <p className="text-accent/70">
            Start watching and rating titles to build your history timeline!
          </p>
        </div>
      )}

      {/* Timeline - Will be populated with actual data */}
      <div className="space-y-4">
        {/* History items will go here */}
      </div>
    </Container>
  );
}
