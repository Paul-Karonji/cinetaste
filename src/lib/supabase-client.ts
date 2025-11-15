/**
 * Supabase Client Configuration
 *
 * This provides an alternative to Prisma for local development
 * when direct PostgreSQL connections are blocked by firewalls.
 *
 * Works over HTTPS (port 443) - bypasses most firewall restrictions.
 */

import { createClient } from '@supabase/supabase-js';

// Get environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

/**
 * Public Supabase Client
 * - Safe to use in browser
 * - Respects Row Level Security (RLS) policies
 * - Use for user-facing features
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Admin Supabase Client
 * - Server-side only (NEVER expose to browser)
 * - Bypasses Row Level Security
 * - Use for admin operations, migrations, system tasks
 */
export const supabaseAdmin = supabaseServiceKey
  ? createClient(supabaseUrl, supabaseServiceKey)
  : null;

/**
 * Database Table Helpers
 * Type-safe helpers for accessing CineTaste tables
 */
export const db = {
  users: () => supabase.from('User'),
  titles: () => supabase.from('Title'),
  watchlist: () => supabase.from('WatchListItem'),
  history: () => supabase.from('WatchHistory'),
  ratings: () => supabase.from('Rating'),
  moodTags: () => supabase.from('MoodTag'),
  reviews: () => supabase.from('Review'),
  friendships: () => supabase.from('Friendship'),
  permissions: () => supabase.from('UserPermission'),
};

/**
 * Admin Database Helpers (Server-side only)
 */
export const adminDb = supabaseAdmin ? {
  users: () => supabaseAdmin.from('User'),
  titles: () => supabaseAdmin.from('Title'),
  watchlist: () => supabaseAdmin.from('WatchListItem'),
  history: () => supabaseAdmin.from('WatchHistory'),
  ratings: () => supabaseAdmin.from('Rating'),
  moodTags: () => supabaseAdmin.from('MoodTag'),
  reviews: () => supabaseAdmin.from('Review'),
  friendships: () => supabaseAdmin.from('Friendship'),
  permissions: () => supabaseAdmin.from('UserPermission'),
} : null;

export default supabase;
