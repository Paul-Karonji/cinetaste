'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Star } from 'lucide-react';
import { tmdb } from '@/lib/tmdb';
import { useState } from 'react';

interface TitleCardProps {
  id: number;
  title: string;
  posterPath: string | null;
  releaseDate?: string;
  rating?: number;
  mediaType?: 'movie' | 'tv';
  size?: 'normal' | 'hero';
  onClick?: () => void;
}

export default function TitleCard({
  id,
  title,
  posterPath,
  releaseDate,
  rating,
  mediaType = 'movie',
  size = 'normal',
  onClick,
}: TitleCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const year = releaseDate ? new Date(releaseDate).getFullYear() : null;
  const imageUrl = tmdb.getImageUrl(posterPath);

  const dimensions = size === 'hero'
    ? { width: 300, height: 450 }
    : { width: 180, height: 270 };

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group cursor-pointer"
      style={{
        width: `${dimensions.width}px`,
        height: `${dimensions.height}px`,
      }}
    >
      <Link href={`/title/${mediaType}/${id}`}>
        <div
          className="w-full h-full rounded-lg overflow-hidden transition-all duration-300"
          style={{
            backgroundColor: '#221F1F',
            transform: isHovered ? 'scale(1.03)' : 'scale(1)',
            boxShadow: isHovered ? '0 0 20px rgba(229, 9, 20, 0.4)' : 'none',
          }}
        >
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover"
            sizes={size === 'hero' ? '300px' : '180px'}
          />
        </div>
        <div
          className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#121212] to-transparent transition-opacity duration-200"
          style={{ opacity: isHovered ? 1 : 0 }}
        >
          <h3 className="font-medium mb-1" style={{ color: '#F5F5F5', fontSize: '15px' }}>
            {title}
          </h3>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-current" style={{ color: '#E50914' }} />
            <span className="text-sm" style={{ color: '#F5F5F5', opacity: 0.9 }}>
              {rating ? rating.toFixed(1) : 'N/A'}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
