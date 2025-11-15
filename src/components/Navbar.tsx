'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Film, Plus, Clock, TrendingUp, BarChart3, Users, Search, Settings } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home', icon: Film },
    { href: '/watchlist', label: 'MyWatch', icon: Plus },
    { href: '/history', label: 'History', icon: Clock },
    { href: '/mood', label: 'Mood', icon: TrendingUp },
    { href: '/stats', label: 'Stats', icon: BarChart3 },
    { href: '/friends', label: 'Friends', icon: Users },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname?.startsWith(href);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50" style={{ backgroundColor: '#121212', borderBottom: '1px solid #221F1F' }}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <Film className="w-8 h-8" style={{ color: '#E50914' }} />
            <span className="text-2xl font-bold" style={{ color: '#F5F5F5' }}>CineTaste</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-6">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all"
                  style={{
                    backgroundColor: active ? '#221F1F' : 'transparent',
                    color: active ? '#E50914' : '#F5F5F5',
                    opacity: active ? 1 : 0.8,
                  }}
                  onMouseEnter={(e) => {
                    if (!active) {
                      e.currentTarget.style.color = '#E50914';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!active) {
                      e.currentTarget.style.color = '#F5F5F5';
                    }
                  }}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{link.label}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* User Menu */}
        <div className="hidden md:flex items-center gap-4">
          <Search
            className="w-5 h-5 cursor-pointer transition-colors"
            style={{ color: '#F5F5F5', opacity: 0.8 }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#E50914'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#F5F5F5'}
          />
          <Settings
            className="w-5 h-5 cursor-pointer transition-colors"
            style={{ color: '#F5F5F5', opacity: 0.8 }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#E50914'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#F5F5F5'}
          />
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2"
          style={{ color: '#F5F5F5' }}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden px-6 py-4 space-y-2" style={{ backgroundColor: '#121212' }}>
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors"
                style={{
                  backgroundColor: active ? '#221F1F' : 'transparent',
                  color: active ? '#E50914' : '#F5F5F5',
                  opacity: active ? 1 : 0.8,
                }}
              >
                <Icon className="w-5 h-5" />
                {link.label}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}
