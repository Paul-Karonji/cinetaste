'use client';

import Container from '@/components/Container';
import { Film, Clock, Star } from 'lucide-react';

export default function StatsPage() {
  const stats = [
    { label: 'Movies Watched', value: '247', icon: Film },
    { label: 'Hours Watched', value: '412', icon: Clock },
    { label: 'Average Rating', value: '4.2', icon: Star },
  ];

  const monthlyData = [65, 45, 80, 55, 90, 70, 85, 60, 75, 95, 70, 80];

  return (
    <Container>
      <h1 className="text-4xl font-bold mb-8" style={{ color: '#F5F5F5' }}>
        Your Stats
      </h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="p-6 rounded-xl"
              style={{ backgroundColor: '#221F1F' }}
            >
              <Icon className="w-8 h-8 mb-3" style={{ color: '#E50914' }} />
              <div
                className="text-4xl font-bold mb-2"
                style={{ color: '#F5F5F5' }}
              >
                {stat.value}
              </div>
              <div style={{ color: '#F5F5F5', opacity: 0.7, fontSize: '15px' }}>
                {stat.label}
              </div>
            </div>
          );
        })}
      </div>

      {/* Monthly Activity Chart */}
      <div className="p-6 rounded-xl" style={{ backgroundColor: '#221F1F' }}>
        <h2 className="text-2xl font-bold mb-6" style={{ color: '#F5F5F5' }}>
          Monthly Activity
        </h2>
        <div className="h-64 flex items-end justify-around gap-2">
          {monthlyData.map((height, idx) => (
            <div
              key={idx}
              className="flex-1 flex flex-col items-center gap-2"
            >
              <div
                className="w-full rounded-t transition-all cursor-pointer"
                style={{
                  height: `${height}%`,
                  backgroundColor: '#E50914',
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.filter = 'brightness(1.2)')
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.filter = 'brightness(1)')
                }
              />
              <span
                className="text-xs"
                style={{ color: '#F5F5F5', opacity: 0.5 }}
              >
                {idx + 1}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}
