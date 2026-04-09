import { useEffect, useState } from 'react';
import { getTrendingMovies } from '../services/tmdb';
import MovieList from '../components/MovieList/MovieList';
import Loader from '../components/Loader/Loader';
import ErrorMessage from '../components/ErrorMessage/ErrorMessage';
import css from './HomePage.module.css';

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getTrendingMovies();
        setMovies(data);
      } catch {
        setError('Trend filmler yüklenemedi.');
      } finally {
        setLoading(false);
      }
    };

    fetchTrending();
  }, []);

  return (
    <main className={css.page}>
      <h1 className={css.title}>Bugünün Trend Filmleri</h1>
      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && movies.length > 0 && <MovieList movies={movies} />}
    </main>
  );
}
