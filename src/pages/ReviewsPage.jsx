import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieReviews } from '../services/tmdb';
import Loader from '../components/Loader/Loader';
import ErrorMessage from '../components/ErrorMessage/ErrorMessage';
import css from './ReviewsPage.module.css';

export default function ReviewsPage() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getMovieReviews(movieId);
        setReviews(data);
      } catch {
        setError('İncelemeler yüklenemedi.');
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [movieId]);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;
  if (reviews.length === 0) return <p className={css.empty}>Bu film için henüz inceleme yok.</p>;

  return (
    <ul className={css.list}>
      {reviews.map(review => (
        <li key={review.id} className={css.item}>
          <div className={css.header}>
            <span className={css.author}>{review.author}</span>
            {review.author_details?.rating && (
              <span className={css.rating}>⭐ {review.author_details.rating}/10</span>
            )}
          </div>
          <p className={css.content}>{review.content}</p>
        </li>
      ))}
    </ul>
  );
}
