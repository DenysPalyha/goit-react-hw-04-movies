import React from 'react';
import axios from 'axios';

const bASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = process.env.REACT_APP_API_KEY_YT;

axios.defaults.baseURL = bASE_URL;
axios.defaults.params = {
  api_key: API_KEY,
};

const getHomeMoviesTrending = async () => {
  try {
    const { data } = await axios.get(`/trending/movie/day?`);
    return data.results;
  } catch (error) {
    alert(error);
    return [];
  }
};

const getMoviesPageSearch = async ({ query, pageNumber = 1 }) => {
  try {
    const { data } = await axios.get(
      `/search/movie?` + `&query=${query}&page=${pageNumber}`,
    );

    return data.results;
  } catch (error) {
    alert(error);
    return [];
  }
};

const getMoviesDetailsPage = async ({ id }) => {
  try {
    const { data } = await axios.get(`/movie/${id}`);
    return data;
  } catch (error) {
    alert(error);
    return [];
  }
};

const getMoviesCast = async ({ id }) => {
  try {
    const { data } = await axios.get(`/movie/${id}/credits?`);
    return data.cast;
  } catch (error) {
    alert(error);
    return [];
  }
};

const getMoviesReviews = async ({ id }) => {
  try {
    const { data } = await axios.get(`/movie/${id}/reviews?`);
    return data.results;
  } catch (error) {
    alert(error);
    return [];
  }
};

export default {
  getHomeMoviesTrending,
  getMoviesPageSearch,
  getMoviesDetailsPage,
  getMoviesCast,
  getMoviesReviews,
};
