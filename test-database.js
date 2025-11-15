/**
 * CineTaste Database Connection Test
 *
 * This script tests if we can connect to the Supabase database
 * and verifies that all tables exist.
 */

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  log: ['error', 'warn'],
});

async function testDatabaseConnection() {
  console.log('🎬 CineTaste Database Connection Test\n');
  console.log('=' .repeat(50));

  try {
    console.log('📡 Attempting to connect to Supabase...\n');

    // Test 1: Basic connection
    await prisma.$connect();
    console.log('✅ Connection successful!\n');

    // Test 2: Check if we can query the database
    console.log('🔍 Checking database tables...\n');

    // Count records in each table (they should be 0 if newly created)
    const userCount = await prisma.user.count();
    const titleCount = await prisma.title.count();
    const watchListCount = await prisma.watchListItem.count();
    const historyCount = await prisma.watchHistory.count();
    const ratingCount = await prisma.rating.count();
    const moodTagCount = await prisma.moodTag.count();
    const reviewCount = await prisma.review.count();
    const friendshipCount = await prisma.friendship.count();
    const permissionCount = await prisma.userPermission.count();

    console.log('📊 Table Record Counts:');
    console.log('  ├─ User:           ', userCount);
    console.log('  ├─ Title:          ', titleCount);
    console.log('  ├─ WatchListItem:  ', watchListCount);
    console.log('  ├─ WatchHistory:   ', historyCount);
    console.log('  ├─ Rating:         ', ratingCount);
    console.log('  ├─ MoodTag:        ', moodTagCount);
    console.log('  ├─ Review:         ', reviewCount);
    console.log('  ├─ Friendship:     ', friendshipCount);
    console.log('  └─ UserPermission: ', permissionCount);

    console.log('\n' + '=' .repeat(50));
    console.log('🎉 SUCCESS! Your database is set up correctly!\n');
    console.log('✅ All 9 tables exist and are accessible');
    console.log('✅ Connection from your machine works');
    console.log('✅ Ready to start building features!\n');

    return true;

  } catch (error) {
    console.log('\n' + '=' .repeat(50));
    console.log('❌ CONNECTION FAILED\n');

    if (error.code === 'P1001') {
      console.log('🔒 Network/Firewall Issue Detected');
      console.log('\nYour database is likely set up correctly in Supabase,');
      console.log('but your local machine cannot connect due to:');
      console.log('  • Firewall blocking ports 5432/6543');
      console.log('  • Corporate/School network restrictions');
      console.log('  • VPN/Proxy settings\n');
      console.log('📌 WORKAROUND:');
      console.log('  1. Verify tables exist in Supabase dashboard');
      console.log('  2. Use Supabase SQL Editor for database changes');
      console.log('  3. Deploy to Vercel (it can connect to Supabase)');
      console.log('  4. Or try from a different network\n');
    } else {
      console.log('Error Details:');
      console.log('  Code:', error.code);
      console.log('  Message:', error.message);
      console.log('\n💡 Possible fixes:');
      console.log('  • Check DATABASE_URL in .env file');
      console.log('  • Verify Supabase project is active (not paused)');
      console.log('  • Check password is correct\n');
    }

    return false;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the test
testDatabaseConnection()
  .then((success) => {
    process.exit(success ? 0 : 1);
  })
  .catch((error) => {
    console.error('Unexpected error:', error);
    process.exit(1);
  });
