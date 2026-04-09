import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieCast, IMG_BASE_URL } from '../services/tmdb';
import Loader from '../components/Loader/Loader';
import ErrorMessage from '../components/ErrorMessage/ErrorMessage';
import css from './CastPage.module.css';

const PLACEHOLDER = 'https://via.placeholder.com/100x150?text=?';

export default function CastPage() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCast = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getMovieCast(movieId);
        setCast(data.slice(0, 20));
      } catch {
        setError('Oyuncu kadrosu yüklenemedi.');
      } finally {
        setLoading(false);
      }
    };

    fetchCast();
  }, [movieId]);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;
  if (cast.length === 0) return <p className={css.empty}>Oyuncu bilgisi bulunamadı.</p>;

  return (
    <ul className={css.list}>
      {cast.map(actor => (
        <li key={actor.cast_id ?? actor.id} className={css.item}>
          <img
            src={actor.profile_path ? `${IMG_BASE_URL}${actor.profile_path}` : PLACEHOLDER}
            alt={actor.name}
            className={css.photo}
          />
          <div className={css.info}>
            <p className={css.name}>{actor.name}</p>
            <p className={css.character}>{actor.character}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
