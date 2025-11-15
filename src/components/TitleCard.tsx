'use client';

import Image from 'next/image';
import Link from 'next/link';
import { tmdb } from '@/lib/tmdb';

interface TitleCardProps {
  id: number;
  title: string;
  posterPath: string | null;
  releaseDate?: string;
  rating?: number;
  mediaType?: 'movie' | 'tv';
  onClick?: () => void;
}

export default function TitleCard({
  id,
  title,
  posterPath,
  releaseDate,
  rating,
  mediaType = 'movie',
  onClick,
}: TitleCardProps) {
  const year = releaseDate ? new Date(releaseDate).getFullYear() : null;
  const imageUrl = tmdb.getImageUrl(posterPath);

  return (
    <div
      onClick={onClick}
      className="group relative overflow-hidden rounded-lg bg-secondary card-hover cursor-pointer"
    >
      <Link href={`/title/${mediaType}/${id}`}>
        <div className="aspect-[2/3] relative">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Rating Badge */}
          {rating && (
            <div className="absolute top-2 right-2 bg-primary/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-semibold">
              ⭐ {rating.toFixed(1)}
            </div>
          )}

          {/* Hover Overlay */}
          <div className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-full">
              <h3 className="text-accent font-semibold text-sm mb-1 line-clamp-2">
                {title}
              </h3>
              {year && (
                <p className="text-accent/60 text-xs">{year}</p>
              )}
            </div>
          </div>
        </div>
      </Link>

      {/* Quick Actions */}
      <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            // Add to watchlist logic
          }}
          className="p-2 bg-background/80 backdrop-blur-sm rounded-full hover:bg-primary transition-colors"
          title="Add to Watchlist"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>
    </div>
  );
}
