'use client';

import { useState } from 'react';
import Container from '@/components/Container';

const moods = [
  { name: 'Happy', color: 'rgba(255, 200, 87, 0.3)', icon: '😊' },
  { name: 'Sad', color: 'rgba(100, 150, 230, 0.3)', icon: '😢' },
  { name: 'Thrilling', color: 'rgba(229, 9, 20, 0.3)', icon: '😱' },
  { name: 'Romantic', color: 'rgba(255, 150, 180, 0.3)', icon: '💕' },
];

export default function MoodPage() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  return (
    <Container>
      <h1 className="text-4xl font-bold mb-3" style={{ color: '#F5F5F5' }}>
        How Are You Feeling?
      </h1>
      <p className="mb-8 text-lg" style={{ color: '#F5F5F5', opacity: 0.7 }}>
        Select your mood and discover perfect recommendations
      </p>

      <div className="grid grid-cols-2 gap-6 mb-8">
        {moods.map((mood) => (
          <button
            key={mood.name}
            className="p-8 rounded-xl border transition-all"
            style={{
              backgroundColor: '#221F1F',
              borderColor: selectedMood === mood.name ? '#B81D24' : '#221F1F',
            }}
            onClick={() => setSelectedMood(mood.name)}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#B81D24';
              e.currentTarget.style.boxShadow = `0 0 30px ${mood.color}`;
            }}
            onMouseLeave={(e) => {
              if (selectedMood !== mood.name) {
                e.currentTarget.style.borderColor = '#221F1F';
              }
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div className="text-6xl mb-4">{mood.icon}</div>
            <h3 className="text-2xl font-bold" style={{ color: '#F5F5F5' }}>
              {mood.name}
            </h3>
          </button>
        ))}
      </div>

      {selectedMood && (
        <div className="mt-12 text-center">
          <p style={{ color: '#F5F5F5', opacity: 0.7 }}>
            Loading recommendations for your {selectedMood.toLowerCase()} mood...
          </p>
        </div>
      )}
    </Container>
  );
}
