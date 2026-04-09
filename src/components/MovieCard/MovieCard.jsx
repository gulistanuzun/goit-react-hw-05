import { Link, useLocation } from 'react-router-dom';
import { IMG_BASE_URL } from '../../services/tmdb';
import css from './MovieCard.module.css';

const PLACEHOLDER = 'https://via.placeholder.com/200x300?text=No+Image';

export default function MovieCard({ movie }) {
  const location = useLocation();
  const poster = movie.poster_path
    ? `${IMG_BASE_URL}${movie.poster_path}`
    : PLACEHOLDER;

  return (
    <Link to={`/movies/${movie.id}`} state={{ from: location }} className={css.card}>
      <img src={poster} alt={movie.title} className={css.poster} />
      <div className={css.info}>
        <h3 className={css.title}>{movie.title}</h3>
        <span className={css.rating}>⭐ {movie.vote_average?.toFixed(1)}</span>
      </div>
    </Link>
  );
}
