export type { User, Title, WatchListItem, WatchHistory, Rating, Review, Friendship, UserPermission } from '@prisma/client';
export { TitleType, MoodType, FriendshipStatus, PermissionType } from '@prisma/client';

export interface TMDBMovie {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  runtime: number;
  genres: { id: number; name: string }[];
  vote_average: number;
  vote_count: number;
  media_type?: 'movie' | 'tv';
}

export interface TMDBTVShow {
  id: number;
  name: string;
  original_name: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  first_air_date: string;
  genres: { id: number; name: string }[];
  number_of_seasons: number;
  number_of_episodes: number;
  vote_average: number;
  vote_count: number;
  media_type?: 'movie' | 'tv';
}

export interface TitleWithRating extends Title {
  userRating?: number;
  userMoods?: MoodType[];
}

export interface StatsData {
  totalWatched: number;
  totalHours: number;
  favoriteGenres: { genre: string; count: number }[];
  topRated: Title[];
  monthlyActivity: { month: string; count: number }[];
}
