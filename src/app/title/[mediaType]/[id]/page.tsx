'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Container from '@/components/Container';
import Button from '@/components/Button';
import RatingStars from '@/components/RatingStars';
import Loading from '@/components/Loading';
import { tmdb } from '@/lib/tmdb';

export default function TitleDetailPage() {
  const params = useParams();
  const mediaType = params.mediaType as 'movie' | 'tv';
  const id = Number(params.id);

  const [title, setTitle] = useState<any>(null);
  const [similar, setSimilar] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [userRating, setUserRating] = useState(0);

  useEffect(() => {
    const fetchTitle = async () => {
      try {
        let data;
        if (mediaType === 'movie') {
          data = await tmdb.getMovie(id);
        } else {
          data = await tmdb.getTVShow(id);
        }
        setTitle(data);

        const similarData = await tmdb.getSimilar(mediaType, id);
        setSimilar(similarData.slice(0, 6));
      } catch (error) {
        console.error('Error fetching title:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTitle();
  }, [mediaType, id]);

  if (loading) {
    return <Loading />;
  }

  if (!title) {
    return (
      <Container>
        <div className="text-center py-16">
          <h2 className="text-2xl font-bold mb-2">Title not found</h2>
          <p className="text-accent/70">The requested title could not be loaded.</p>
        </div>
      </Container>
    );
  }

  const displayTitle = title.title || title.name;
  const releaseDate = title.release_date || title.first_air_date;
  const year = releaseDate ? new Date(releaseDate).getFullYear() : 'N/A';

  return (
    <div className="min-h-screen">
      {/* Hero Section with Backdrop */}
      <div className="relative h-[60vh] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: title.backdrop_path
              ? `url(${tmdb.getImageUrl(title.backdrop_path, 'original')})`
              : 'none',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
      </div>

      <Container className="-mt-48 relative z-10">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Poster */}
          <div className="flex-shrink-0">
            <img
              src={tmdb.getImageUrl(title.poster_path)}
              alt={displayTitle}
              className="w-64 rounded-lg shadow-2xl"
            />
          </div>

          {/* Info */}
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-bold mb-2">{displayTitle}</h1>
            <div className="flex flex-wrap items-center gap-4 text-accent/70 mb-4">
              <span>{year}</span>
              {title.runtime && <span>• {title.runtime} min</span>}
              {title.number_of_seasons && (
                <span>• {title.number_of_seasons} Seasons</span>
              )}
            </div>

            {/* Genres */}
            {title.genres && (
              <div className="flex flex-wrap gap-2 mb-6">
                {title.genres.map((genre: any) => (
                  <span
                    key={genre.id}
                    className="px-3 py-1 bg-secondary rounded-full text-sm"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            )}

            {/* Rating */}
            <div className="flex items-center gap-4 mb-6">
              <div>
                <div className="text-sm text-accent/70 mb-1">TMDB Rating</div>
                <RatingStars rating={title.vote_average / 2} />
              </div>
              <div>
                <div className="text-sm text-accent/70 mb-1">Your Rating</div>
                <RatingStars
                  rating={userRating}
                  interactive
                  onChange={setUserRating}
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3 mb-6">
              <Button variant="primary">+ Add to Watchlist</Button>
              <Button variant="secondary">✓ Mark as Watched</Button>
              <Button variant="ghost">Share</Button>
            </div>

            {/* Overview */}
            <div>
              <h2 className="text-2xl font-bold mb-2">Overview</h2>
              <p className="text-accent/80 leading-relaxed">{title.overview}</p>
            </div>
          </div>
        </div>

        {/* Similar Titles */}
        {similar.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Similar Titles</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
              {similar.map((item) => (
                <div key={item.id} className="rounded-lg overflow-hidden">
                  <img
                    src={tmdb.getImageUrl(item.poster_path)}
                    alt={item.title || item.name}
                    className="w-full"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}
