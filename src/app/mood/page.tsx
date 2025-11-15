'use client';

import { useState } from 'react';
import Container from '@/components/Container';
import MoodBadge from '@/components/MoodBadge';
import { MoodType } from '@/types';

const moods: MoodType[] = [
  MoodType.LAUGH,
  MoodType.CRY,
  MoodType.ROMANTIC,
  MoodType.ACTION,
  MoodType.SCIFI,
  MoodType.MIND_BLOWING,
  MoodType.DARK_MYSTERIOUS,
  MoodType.FEEL_GOOD,
  MoodType.EMOTIONAL,
  MoodType.SLOW_BURN,
  MoodType.THRILLER,
];

export default function MoodPage() {
  const [selectedMood, setSelectedMood] = useState<MoodType | null>(null);
  const [recommendations, setRecommendations] = useState<any[]>([]);

  const handleMoodSelect = async (mood: MoodType) => {
    setSelectedMood(mood);
    // Fetch recommendations based on mood
    // This would connect to your AI recommendation engine
  };

  return (
    <Container>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">How are you feeling today?</h1>
          <p className="text-accent/70 text-lg">
            Pick your mood and we'll suggest the perfect titles to match it
          </p>
        </div>

        {/* Mood Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
          {moods.map((mood) => (
            <div
              key={mood}
              className="flex justify-center"
              onClick={() => handleMoodSelect(mood)}
            >
              <MoodBadge mood={mood} selected={selectedMood === mood} />
            </div>
          ))}
        </div>

        {/* Recommendations */}
        {selectedMood && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">
              Perfect for your {selectedMood.toLowerCase().replace('_', ' ')} mood
            </h2>

            {recommendations.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-accent/70">
                  Loading recommendations based on your mood and preferences...
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {/* Recommendation cards will go here */}
              </div>
            )}
          </div>
        )}
      </div>
    </Container>
  );
}
