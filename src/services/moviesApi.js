import axios from 'axios';

const fetchMoviesWithHome = () => {
  return axios
    .get(
      `https://api.themoviedb.org/3/trending/movie/day?api_key=1c964d4f1f1c3449faca2eb29e0c69b3`,
    )
    .then(response => response.data.results);
};

const fetchMoviesWithQuery = (query = '', pageNumber = 1) => {
  return axios
    .get(
      `https://api.themoviedb.org/3/search/movie?api_key=1c964d4f1f1c3449faca2eb29e0c69b3&query=${query}&page=${pageNumber}`,
    )
    .then(response => response.data.results);
};

const fetchMoviesWithDetails = id => {
  return axios
    .get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=1c964d4f1f1c3449faca2eb29e0c69b3`,
    )
    .then(response => response.data);
};

const fetchMoviesWithCredits = id => {
  return axios
    .get(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=87547ad0a5cfee0fba05460a073a9eb9`,
    )
    .then(response => response.data.cast);
};

const fetchMoviesWithReviews = id => {
  return axios
    .get(
      `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=87547ad0a5cfee0fba05460a073a9eb9`,
    )
    .then(response => response.data.results);
};

const imgpath = 'https://image.tmdb.org/t/p/w185/';
const posterimgpath = `https://image.tmdb.org/t/p/w342/`;

export default {
  fetchMoviesWithHome,
  fetchMoviesWithQuery,
  fetchMoviesWithDetails,
  fetchMoviesWithReviews,
  fetchMoviesWithCredits,
  posterimgpath,
  imgpath,
};
