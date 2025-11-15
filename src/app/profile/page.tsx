'use client';

import { useState } from 'react';
import Container from '@/components/Container';
import Button from '@/components/Button';

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    username: 'MovieLover',
    email: 'user@example.com',
    bio: 'Passionate about cinema and storytelling',
    avatar: '',
  });

  const [isEditing, setIsEditing] = useState(false);

  return (
    <Container>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Profile</h1>

        <div className="bg-secondary p-8 rounded-lg border border-accent/10">
          {/* Avatar */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-highlight flex items-center justify-center text-accent text-4xl font-bold mb-4">
              {profile.username.charAt(0).toUpperCase()}
            </div>
            <Button variant="ghost" size="sm">Change Avatar</Button>
          </div>

          {/* Profile Info */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-2">Username</label>
              <input
                type="text"
                value={profile.username}
                disabled={!isEditing}
                className="w-full px-4 py-3 bg-background rounded-lg border border-accent/10 text-accent disabled:opacity-70"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Email</label>
              <input
                type="email"
                value={profile.email}
                disabled={!isEditing}
                className="w-full px-4 py-3 bg-background rounded-lg border border-accent/10 text-accent disabled:opacity-70"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Bio</label>
              <textarea
                value={profile.bio}
                disabled={!isEditing}
                rows={4}
                className="w-full px-4 py-3 bg-background rounded-lg border border-accent/10 text-accent disabled:opacity-70 resize-none"
              />
            </div>

            <div className="flex gap-4">
              {isEditing ? (
                <>
                  <Button variant="primary" onClick={() => setIsEditing(false)}>
                    Save Changes
                  </Button>
                  <Button variant="secondary" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                </>
              ) : (
                <Button variant="primary" onClick={() => setIsEditing(true)}>
                  Edit Profile
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Privacy Settings */}
        <div className="mt-8 bg-secondary p-8 rounded-lg border border-accent/10">
          <h2 className="text-2xl font-bold mb-6">Privacy Settings</h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Public Profile</h3>
                <p className="text-sm text-accent/70">Allow others to find and view your profile</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-background peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Activity Visibility</h3>
                <p className="text-sm text-accent/70">Let friends see your recent activity</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-background peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Watchlist Visibility</h3>
                <p className="text-sm text-accent/70">Share your watchlist with friends</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-background peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Account Actions */}
        <div className="mt-8 flex gap-4">
          <Button variant="secondary">Change Password</Button>
          <Button variant="outline" className="text-red-400 border-red-400 hover:bg-red-400/10">
            Delete Account
          </Button>
        </div>
      </div>
    </Container>
  );
}
