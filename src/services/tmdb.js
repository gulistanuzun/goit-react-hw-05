import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';
const TOKEN =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YmM5OWM1ZmFiNDlhOGY2MzJlMDI2MThlNzA3NDZlZSIsIm5iZiI6MTc3NTcyMzYwMy43MjYsInN1YiI6IjY5ZDc2NDUzOWM0YTU2YTNjNWQ3NzM1YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ahAnKY7BBT2oAYx6RZ57R7_S-vEkSKUWbjmH6kisOWA';

export const IMG_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const tmdb = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});

export const getTrendingMovies = async () => {
  const { data } = await tmdb.get('/trending/movie/day');
  return data.results;
};

export const searchMovies = async (query) => {
  const { data } = await tmdb.get('/search/movie', { params: { query } });
  return data.results;
};

export const getMovieDetails = async (movieId) => {
  const { data } = await tmdb.get(`/movie/${movieId}`);
  return data;
};

export const getMovieCast = async (movieId) => {
  const { data } = await tmdb.get(`/movie/${movieId}/credits`);
  return data.cast;
};

export const getMovieReviews = async (movieId) => {
  const { data } = await tmdb.get(`/movie/${movieId}/reviews`);
  return data.results;
};
