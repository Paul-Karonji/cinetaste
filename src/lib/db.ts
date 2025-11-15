/**
 * Database Abstraction Layer
 *
 * Provides a unified interface for database operations that works with both:
 * - Supabase Client (for local development - bypasses firewall)
 * - Prisma (for production - direct PostgreSQL connection)
 *
 * Usage:
 *   import { dbClient } from '@/lib/db';
 *   const users = await dbClient.users.findMany();
 */

import { db as supabaseDb } from './supabase-client';
import { prisma } from './prisma';

/**
 * Determine which database client to use
 * - Local development: Use Supabase client (works over HTTPS)
 * - Production: Use Prisma (direct connection)
 */
const isProduction = process.env.NODE_ENV === 'production';
const usePrisma = isProduction || process.env.USE_PRISMA === 'true';

/**
 * Database client type
 */
type DatabaseClient = 'prisma' | 'supabase';

/**
 * Get the active database client type
 */
export function getActiveClient(): DatabaseClient {
  return usePrisma ? 'prisma' : 'supabase';
}

/**
 * Unified database interface
 *
 * This abstraction allows switching between Prisma and Supabase seamlessly
 */
export const dbClient = {
  /**
   * Get information about the active client
   */
  info: () => ({
    type: getActiveClient(),
    isPrisma: usePrisma,
    isSupabase: !usePrisma,
    environment: process.env.NODE_ENV,
  }),

  /**
   * Direct access to underlying clients
   * Use when you need client-specific features
   */
  prisma: usePrisma ? prisma : null,
  supabase: !usePrisma ? supabaseDb : null,
};

/**
 * Helper function to check if database is accessible
 */
export async function checkDatabaseConnection(): Promise<boolean> {
  try {
    if (usePrisma) {
      await prisma.$queryRaw`SELECT 1`;
      return true;
    } else {
      const { error } = await supabaseDb.users().select('id').limit(1);
      return !error || error.code === '42501'; // 42501 = RLS policy issue (table exists)
    }
  } catch (error) {
    return false;
  }
}

/**
 * Export the active client
 */
export default dbClient;

/**
 * Environment-aware database access
 *
 * Example usage:
 *
 * // Check which client is active
 * if (dbClient.info().isPrisma) {
 *   // Use Prisma
 *   const users = await dbClient.prisma.user.findMany();
 * } else {
 *   // Use Supabase
 *   const { data: users } = await dbClient.supabase.users().select('*');
 * }
 */

/**
 * Quick access functions for common operations
 */
export const db = {
  /**
   * Get database connection info
   */
  getInfo: () => dbClient.info(),

  /**
   * Check if database is accessible
   */
  isConnected: checkDatabaseConnection,

  /**
   * Access Supabase client (for local development)
   */
  supabase: supabaseDb,

  /**
   * Access Prisma client (for production or when explicitly enabled)
   */
  prisma: usePrisma ? prisma : null,
};
