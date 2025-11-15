// Manual type definitions that match Prisma schema
// These will be replaced by @prisma/client types after running `prisma generate`

export enum TitleType {
  MOVIE = 'MOVIE',
  SERIES = 'SERIES',
  ANIME = 'ANIME',
  ANIMATION = 'ANIMATION',
}

export enum MoodType {
  LAUGH = 'LAUGH',
  CRY = 'CRY',
  ROMANTIC = 'ROMANTIC',
  ACTION = 'ACTION',
  SCIFI = 'SCIFI',
  MIND_BLOWING = 'MIND_BLOWING',
  DARK_MYSTERIOUS = 'DARK_MYSTERIOUS',
  FEEL_GOOD = 'FEEL_GOOD',
  EMOTIONAL = 'EMOTIONAL',
  SLOW_BURN = 'SLOW_BURN',
  THRILLER = 'THRILLER',
}

export enum FriendshipStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
}

export enum PermissionType {
  VIEW_WATCHLIST = 'VIEW_WATCHLIST',
  VIEW_RATINGS = 'VIEW_RATINGS',
  VIEW_REVIEWS = 'VIEW_REVIEWS',
  VIEW_ACTIVITY = 'VIEW_ACTIVITY',
  VIEW_PREFERENCES = 'VIEW_PREFERENCES',
}

export interface User {
  id: string;
  email: string;
  username: string;
  password: string;
  name: string | null;
  bio: string | null;
  avatar: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Title {
  id: string;
  tmdbId: number;
  type: TitleType;
  title: string;
  originalTitle: string | null;
  overview: string | null;
  posterPath: string | null;
  backdropPath: string | null;
  releaseDate: Date | null;
  runtime: number | null;
  genres: string[];
  cast: string[];
  crew: string[];
  voteAverage: number | null;
  voteCount: number | null;
  numberOfSeasons: number | null;
  numberOfEpisodes: number | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface WatchListItem {
  id: string;
  userId: string;
  titleId: string;
  category: string | null;
  priority: number;
  addedAt: Date;
}

export interface WatchHistory {
  id: string;
  userId: string;
  titleId: string;
  watchedAt: Date;
  currentSeason: number | null;
  currentEpisode: number | null;
  completed: boolean;
  notes: string | null;
}

export interface Rating {
  id: string;
  userId: string;
  titleId: string;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Review {
  id: string;
  userId: string;
  titleId: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Friendship {
  id: string;
  initiatorId: string;
  receiverId: string;
  status: FriendshipStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserPermission {
  id: string;
  granterId: string;
  userId: string;
  permission: PermissionType;
  granted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

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
