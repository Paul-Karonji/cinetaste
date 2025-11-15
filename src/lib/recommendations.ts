import { prisma } from './prisma';
import type { MoodType, TitleType } from '@/types';

/**
 * AI Recommendation Engine for CineTaste
 *
 * This module provides intelligent recommendations based on:
 * - User ratings and preferences
 * - Mood tags and patterns
 * - Viewing history and habits
 * - Genre preferences
 */

interface RecommendationParams {
  userId: string;
  limit?: number;
  excludeWatched?: boolean;
}

interface MoodRecommendationParams {
  userId: string;
  mood: MoodType;
  limit?: number;
}

/**
 * Get personalized recommendations for a user
 */
export async function getPersonalizedRecommendations({
  userId,
  limit = 10,
  excludeWatched = true,
}: RecommendationParams) {
  try {
    // Fetch user's rating history with mood tags
    const ratings = await prisma.rating.findMany({
      where: { userId },
      include: {
        title: true,
        moodTags: true,
      },
      orderBy: { rating: 'desc' },
    });

    // Analyze user preferences
    const genrePreferences = analyzeGenrePreferences(ratings);
    const moodPatterns = analyzeMoodPatterns(ratings);

    // Generate recommendations based on preferences
    // This is a simplified version - a production system would use more sophisticated ML
    const recommendations = await findSimilarTitles({
      genres: genrePreferences.slice(0, 3),
      moods: moodPatterns.slice(0, 2),
      limit,
    });

    return recommendations;
  } catch (error) {
    console.error('Error generating recommendations:', error);
    return [];
  }
}

/**
 * Get mood-based recommendations
 */
export async function getMoodBasedRecommendations({
  userId,
  mood,
  limit = 10,
}: MoodRecommendationParams) {
  try {
    // Find titles that other users with similar taste rated highly with this mood
    const recommendations = await prisma.rating.findMany({
      where: {
        moodTags: {
          some: { mood },
        },
        rating: { gte: 4.0 },
      },
      include: {
        title: true,
      },
      take: limit,
      orderBy: { rating: 'desc' },
    });

    return recommendations.map((r: any) => r.title);
  } catch (error) {
    console.error('Error generating mood recommendations:', error);
    return [];
  }
}

/**
 * Get "Because you watched X" recommendations
 */
export async function getSimilarTitleRecommendations(titleId: string, limit = 6) {
  try {
    const title = await prisma.title.findUnique({
      where: { id: titleId },
    });

    if (!title) return [];

    // Find titles with similar genres
    const similar = await prisma.title.findMany({
      where: {
        id: { not: titleId },
        type: title.type,
        // In a real implementation, you'd use genre matching
      },
      take: limit,
    });

    return similar;
  } catch (error) {
    console.error('Error finding similar titles:', error);
    return [];
  }
}

/**
 * Analyze user's genre preferences from ratings
 */
function analyzeGenrePreferences(ratings: any[]) {
  const genreCounts: Record<string, number> = {};

  ratings.forEach((rating) => {
    if (rating.rating >= 4.0) {
      rating.title.genres?.forEach((genre: string) => {
        genreCounts[genre] = (genreCounts[genre] || 0) + 1;
      });
    }
  });

  return Object.entries(genreCounts)
    .sort(([, a], [, b]) => b - a)
    .map(([genre]) => genre);
}

/**
 * Analyze user's mood patterns from ratings
 */
function analyzeMoodPatterns(ratings: any[]) {
  const moodCounts: Record<MoodType, number> = {} as Record<MoodType, number>;

  ratings.forEach((rating) => {
    if (rating.rating >= 4.0) {
      rating.moodTags?.forEach((tag: { mood: MoodType }) => {
        moodCounts[tag.mood] = (moodCounts[tag.mood] || 0) + 1;
      });
    }
  });

  return Object.entries(moodCounts)
    .sort(([, a], [, b]) => b - a)
    .map(([mood]) => mood as MoodType);
}

/**
 * Find titles matching given criteria
 */
async function findSimilarTitles({
  genres,
  moods,
  limit,
}: {
  genres: string[];
  moods: MoodType[];
  limit: number;
}) {
  try {
    // This is a simplified version
    // In production, you'd use more sophisticated matching algorithms
    const titles = await prisma.title.findMany({
      take: limit,
      orderBy: { voteAverage: 'desc' },
    });

    return titles;
  } catch (error) {
    console.error('Error finding similar titles:', error);
    return [];
  }
}

/**
 * Calculate user stats for the dashboard
 */
export async function calculateUserStats(userId: string) {
  try {
    const [watchHistory, ratings] = await Promise.all([
      prisma.watchHistory.findMany({
        where: { userId },
        include: { title: true },
      }),
      prisma.rating.findMany({
        where: { userId },
        include: { title: true, moodTags: true },
      }),
    ]);

    // Calculate total hours watched
    const totalHours = watchHistory.reduce((sum: number, item: any) => {
      return sum + (item.title.runtime || 0);
    }, 0) / 60;

    // Favorite genres
    const genrePreferences = analyzeGenrePreferences(ratings);
    const favoriteGenres = genrePreferences.slice(0, 5).map((genre, index) => ({
      genre,
      count: ratings.filter((r: any) => r.title.genres?.includes(genre)).length,
    }));

    // Top rated titles
    const topRated = ratings
      .sort((a: any, b: any) => b.rating - a.rating)
      .slice(0, 10)
      .map((r: any) => r.title);

    return {
      totalWatched: watchHistory.length,
      totalHours: Math.round(totalHours),
      favoriteGenres,
      topRated,
      bingeStreak: 0, // TODO: Calculate actual streak
      monthlyActivity: [], // TODO: Calculate monthly breakdown
    };
  } catch (error) {
    console.error('Error calculating user stats:', error);
    return {
      totalWatched: 0,
      totalHours: 0,
      favoriteGenres: [],
      topRated: [],
      bingeStreak: 0,
      monthlyActivity: [],
    };
  }
}
