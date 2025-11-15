'use client';

import Container from '@/components/Container';

const friends = [
  { name: 'Alice', online: true, moviesWatched: 142 },
  { name: 'Bob', online: true, moviesWatched: 98 },
  { name: 'Charlie', online: false, moviesWatched: 127 },
  { name: 'Diana', online: false, moviesWatched: 83 },
];

export default function FriendsPage() {
  return (
    <Container>
      <h1 className="text-4xl font-bold mb-6" style={{ color: '#F5F5F5' }}>
        Friends
      </h1>

      <div className="grid grid-cols-3 gap-6">
        {friends.map((friend) => (
          <div
            key={friend.name}
            className="p-6 rounded-xl"
            style={{ backgroundColor: '#221F1F' }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold"
                style={{
                  backgroundColor: friend.online ? '#E50914' : '#121212',
                  color: '#F5F5F5',
                  boxShadow: friend.online
                    ? '0 0 0 4px rgba(229, 9, 20, 0.3)'
                    : 'none',
                }}
              >
                {friend.name[0]}
              </div>
              <div>
                <h3 className="text-xl font-bold" style={{ color: '#F5F5F5' }}>
                  {friend.name}
                </h3>
                <p className="text-sm" style={{ color: '#F5F5F5', opacity: 0.6 }}>
                  {friend.online ? 'Online' : 'Offline'}
                </p>
              </div>
            </div>
            <div className="text-sm" style={{ color: '#F5F5F5', opacity: 0.7 }}>
              {friend.moviesWatched} movies watched
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}
