'use client';

import { useState, useEffect } from 'react';
import Container from '@/components/Container';

export default function StatsPage() {
  const [stats, setStats] = useState({
    totalWatched: 0,
    totalHours: 0,
    favoriteGenres: [] as { genre: string; count: number }[],
    topRated: [] as any[],
    monthlyActivity: [] as { month: string; count: number }[],
    bingeStreak: 0,
  });

  return (
    <Container>
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Your Stats</h1>
        <p className="text-accent/70">
          Insights about your watching habits and preferences
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="bg-secondary p-6 rounded-lg border border-accent/10">
          <div className="text-primary text-3xl font-bold mb-2">
            {stats.totalWatched}
          </div>
          <div className="text-accent/70">Titles Watched</div>
        </div>

        <div className="bg-secondary p-6 rounded-lg border border-accent/10">
          <div className="text-primary text-3xl font-bold mb-2">
            {stats.totalHours}h
          </div>
          <div className="text-accent/70">Total Hours</div>
        </div>

        <div className="bg-secondary p-6 rounded-lg border border-accent/10">
          <div className="text-primary text-3xl font-bold mb-2">
            {stats.bingeStreak} days
          </div>
          <div className="text-accent/70">Longest Streak</div>
        </div>
      </div>

      {/* Favorite Genres */}
      <div className="bg-secondary p-6 rounded-lg border border-accent/10 mb-8">
        <h2 className="text-2xl font-bold mb-4">Favorite Genres</h2>
        {stats.favoriteGenres.length === 0 ? (
          <p className="text-accent/70">Start watching to discover your favorite genres!</p>
        ) : (
          <div className="space-y-3">
            {stats.favoriteGenres.map((genre, index) => (
              <div key={genre.genre} className="flex items-center gap-4">
                <div className="text-primary font-bold text-lg w-8">{index + 1}</div>
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="font-semibold">{genre.genre}</span>
                    <span className="text-accent/70">{genre.count} titles</span>
                  </div>
                  <div className="w-full bg-background h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-primary h-full rounded-full"
                      style={{ width: `${(genre.count / stats.totalWatched) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Monthly Activity */}
      <div className="bg-secondary p-6 rounded-lg border border-accent/10">
        <h2 className="text-2xl font-bold mb-4">Monthly Activity</h2>
        {stats.monthlyActivity.length === 0 ? (
          <p className="text-accent/70">Your monthly activity will appear here!</p>
        ) : (
          <div className="space-y-2">
            {/* Simple bar chart representation */}
            {stats.monthlyActivity.map((month) => (
              <div key={month.month} className="flex items-center gap-4">
                <div className="w-24 text-accent/70">{month.month}</div>
                <div className="flex-1">
                  <div className="bg-primary h-6 rounded" style={{ width: `${month.count * 10}%` }}>
                    <span className="px-2 text-sm">{month.count}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Container>
  );
}
