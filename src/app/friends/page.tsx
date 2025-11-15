'use client';

import { useState } from 'react';
import Container from '@/components/Container';
import Button from '@/components/Button';

export default function FriendsPage() {
  const [friends, setFriends] = useState<any[]>([]);
  const [pendingRequests, setPendingRequests] = useState<any[]>([]);

  return (
    <Container>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Friends</h1>
          <p className="text-accent/70">
            Connect with friends and share your movie taste
          </p>
        </div>
        <Button variant="primary">
          + Add Friend
        </Button>
      </div>

      {/* Pending Requests */}
      {pendingRequests.length > 0 && (
        <div className="mb-8 bg-secondary p-6 rounded-lg border border-accent/10">
          <h2 className="text-xl font-bold mb-4">Pending Requests ({pendingRequests.length})</h2>
          <div className="space-y-3">
            {/* Pending request items will go here */}
          </div>
        </div>
      )}

      {/* Friends List */}
      <div className="bg-secondary p-6 rounded-lg border border-accent/10">
        <h2 className="text-xl font-bold mb-4">My Friends ({friends.length})</h2>

        {friends.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">👥</div>
            <h3 className="text-2xl font-bold mb-2">No friends yet</h3>
            <p className="text-accent/70 mb-6">
              Add friends to share and compare your movie tastes!
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {/* Friend cards will go here */}
          </div>
        )}
      </div>

      {/* Privacy Notice */}
      <div className="mt-8 p-4 bg-primary/10 border border-primary/20 rounded-lg">
        <h3 className="font-bold mb-2">🔐 Privacy First</h3>
        <p className="text-sm text-accent/70">
          Your activity is private by default. Friends can only see what you explicitly allow them to view.
          You have full control over your privacy settings.
        </p>
      </div>
    </Container>
  );
}
