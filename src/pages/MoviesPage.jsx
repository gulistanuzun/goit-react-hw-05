import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchMovies } from '../services/tmdb';
import MovieList from '../components/MovieList/MovieList';
import Loader from '../components/Loader/Loader';
import ErrorMessage from '../components/ErrorMessage/ErrorMessage';
import css from './MoviesPage.module.css';

export default function MoviesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') ?? '';

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) {
      setMovies([]);
      return;
    }

    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await searchMovies(query);
        setMovies(data);
      } catch {
        setError('Film araması başarısız oldu.');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = e.target.elements.search.value.trim();
    if (!value) return;
    setSearchParams({ query: value });
  };

  return (
    <main className={css.page}>
      <h1 className={css.title}>Film Ara</h1>
      <form className={css.form} onSubmit={handleSubmit}>
        <input
          className={css.input}
          type="text"
          name="search"
          defaultValue={query}
          placeholder="Film adı girin..."
          autoComplete="off"
        />
        <button className={css.button} type="submit">Ara</button>
      </form>

      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && query && movies.length === 0 && (
        <p className={css.noResult}>"{query}" için sonuç bulunamadı.</p>
      )}
      {!loading && !error && movies.length > 0 && <MovieList movies={movies} />}
    </main>
  );
}
