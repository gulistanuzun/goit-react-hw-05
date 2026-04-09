import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, Outlet, useLocation, useParams } from 'react-router-dom';
import { getMovieDetails, IMG_BASE_URL } from '../services/tmdb';
import Loader from '../components/Loader/Loader';
import ErrorMessage from '../components/ErrorMessage/ErrorMessage';
import css from './MovieDetailsPage.module.css';

const PLACEHOLDER = 'https://via.placeholder.com/300x450?text=No+Image';

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const location = useLocation();
  const backLink = location.state?.from ?? '/movies';
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getMovieDetails(movieId);
        setMovie(data);
      } catch {
        setError('Film detayları yüklenemedi.');
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [movieId]);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;
  if (!movie) return null;

  const poster = movie.poster_path
    ? `${IMG_BASE_URL}${movie.poster_path}`
    : PLACEHOLDER;

  const releaseYear = movie.release_date?.slice(0, 4);
  const genres = movie.genres?.map(g => g.name).join(', ');
  const score = Math.round((movie.vote_average ?? 0) * 10);

  return (
    <main className={css.page}>
      <Link to={backLink} className={css.backLink}>← Geri Dön</Link>

      <div className={css.hero}>
        <img src={poster} alt={movie.title} className={css.poster} />
        <div className={css.info}>
          <h1 className={css.title}>
            {movie.title} {releaseYear && <span className={css.year}>({releaseYear})</span>}
          </h1>
          <p className={css.score}>Kullanıcı Puanı: <strong>{score}%</strong></p>
          {movie.overview && (
            <>
              <h2 className={css.sectionTitle}>Genel Bakış</h2>
              <p className={css.overview}>{movie.overview}</p>
            </>
          )}
          {genres && (
            <>
              <h2 className={css.sectionTitle}>Türler</h2>
              <p className={css.genres}>{genres}</p>
            </>
          )}
        </div>
      </div>

      <div className={css.additional}>
        <h2 className={css.addTitle}>Ek Bilgiler</h2>
        <ul className={css.addLinks}>
          <li>
            <NavLink
              to="cast"
              className={({ isActive }) => (isActive ? css.activeTab : css.tab)}
            >
              Oyuncu Kadrosu
            </NavLink>
          </li>
          <li>
            <NavLink
              to="reviews"
              className={({ isActive }) => (isActive ? css.activeTab : css.tab)}
            >
              İncelemeler
            </NavLink>
          </li>
        </ul>
        <div className={css.outletWrapper}>
          <Outlet />
        </div>
      </div>
    </main>
  );
}
