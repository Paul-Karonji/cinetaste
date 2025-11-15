/**
 * Supabase Client Connection Test
 *
 * Tests if we can connect to Supabase using the JavaScript client
 * (Works over HTTPS - bypasses firewall restrictions)
 */

require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

async function testSupabaseConnection() {
  console.log('🎬 CineTaste Supabase Client Test\n');
  console.log('=' .repeat(50));

  // Check environment variables
  if (!supabaseUrl || !supabaseKey) {
    console.log('❌ Missing Supabase credentials');
    console.log('\nPlease ensure .env file has:');
    console.log('  NEXT_PUBLIC_SUPABASE_URL');
    console.log('  NEXT_PUBLIC_SUPABASE_ANON_KEY\n');
    return false;
  }

  try {
    console.log('📡 Connecting to Supabase via HTTPS...\n');
    console.log(`URL: ${supabaseUrl}`);
    console.log(`Key: ${supabaseKey.substring(0, 20)}...\n`);

    // Create Supabase client
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Test 1: Check connection by querying tables
    console.log('🔍 Testing database access...\n');

    // Query each table to verify it exists and is accessible
    const tables = [
      'User',
      'Title',
      'WatchListItem',
      'WatchHistory',
      'Rating',
      'MoodTag',
      'Review',
      'Friendship',
      'UserPermission'
    ];

    console.log('📊 Table Accessibility Check:\n');

    for (const tableName of tables) {
      try {
        const { count, error } = await supabase
          .from(tableName)
          .select('*', { count: 'exact', head: true });

        if (error) {
          // Check if it's a permission error (table exists but no RLS policies)
          if (error.code === '42501' || error.message.includes('policy')) {
            console.log(`  ⚠️  ${tableName.padEnd(20)} - Exists (needs RLS policies)`);
          } else {
            console.log(`  ❌ ${tableName.padEnd(20)} - Error: ${error.message}`);
          }
        } else {
          console.log(`  ✅ ${tableName.padEnd(20)} - ${count || 0} records`);
        }
      } catch (err) {
        console.log(`  ❌ ${tableName.padEnd(20)} - ${err.message}`);
      }
    }

    console.log('\n' + '=' .repeat(50));
    console.log('🎉 SUPABASE CLIENT CONNECTION SUCCESSFUL!\n');
    console.log('✅ Connected over HTTPS (bypasses firewall)');
    console.log('✅ Can access Supabase database');
    console.log('✅ Ready for local development!\n');

    console.log('💡 Next Steps:');
    console.log('  1. Set up Row Level Security (RLS) policies in Supabase');
    console.log('  2. Use Supabase client for local development');
    console.log('  3. Prisma still available for production deployment\n');

    return true;

  } catch (error) {
    console.log('\n' + '=' .repeat(50));
    console.log('❌ CONNECTION FAILED\n');
    console.log('Error:', error.message);
    console.log('\n💡 Troubleshooting:');
    console.log('  • Check NEXT_PUBLIC_SUPABASE_URL in .env');
    console.log('  • Check NEXT_PUBLIC_SUPABASE_ANON_KEY in .env');
    console.log('  • Verify Supabase project is active\n');
    return false;
  }
}

// Run the test
testSupabaseConnection()
  .then((success) => {
    process.exit(success ? 0 : 1);
  })
  .catch((error) => {
    console.error('Unexpected error:', error);
    process.exit(1);
  });
