import axios from "axios";
import { apiKey, apiReadAccessKey } from "../constants/Api";

// endpoint

const apiBaseUrl = "https://api.themoviedb.org/3";

const trendingMoviesEndpoint =
  "https://api.themoviedb.org/3/trending/movie/day?language=en-US";

const upcomingMoviesEndpoint =
  "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1";

const topRatedMoviesEndpoint =
  "https://api.themoviedb.org/3/trending/movie/top_rated?language=en-US&page=1";

const searchMoviesEndpoint = (query: string) =>
  `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`;

// movie
const movieDetailsEndpoint = (id: number) =>
  `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
const movieCreditsEndpoint = (id: number) =>
  `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`;
const similarMoviesEndpoint = (id: number) =>
  `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`;

// person
const personDetailsEndpoint = (id: number) =>
  `https://api.themoviedb.org/3/person/${id}?language=en-US`;
const personMoviesEndpoint = (id: number) =>
  `https://api.themoviedb.org/3/person/${id}/movie_credits?language=en-US`;

// fallback images
export const fallbackMoviePoster =
  "https://img.myloview.com/stickers/white-laptop-screen-with-hd-video-technology-icon-isolated-on-grey-background-abstract-circle-random-dots-vector-illustration-400-176057922.jpg";
export const fallbackPersonImage =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmUiF-YGjavA63_Au8jQj7zxnFxS_Ay9xc6pxleMqCxH92SzeNSjBTwZ0l61E4B3KTS7o&usqp=CAU";

export const image500 = (path: string) =>
  path ? `https://image.tmdb.org/t/p/w500/${path}` : "";

export const image342 = (path: string) =>
  path ? `https://image.tmdb.org/t/p/w342/${path}` : "";

export const image185 = (path: string) =>
  path ? `https://image.tmdb.org/t/p/w185/${path}` : "";

export const getBackdropPath = (path: string) =>
  `https://image.tmdb.org/t/p/w370_and_h556_multi_faces${path}`;

const apiCall = async (endpoint: string, params: any) => {
  const options = {
    method: "GET",
    url: endpoint,
    headers: {
      accept: "application/json",
      Authorization: "Bearer " + apiReadAccessKey,
    },
    params: params ? params : {},
  };

  try {
    const response = await axios.request(options);

    return response.data;
  } catch (error) {
    console.log("❌ File:movieDB | Function: apiCall | error:", error);
    return null;
  }
};

// home screen apis
export const fetchTreadingMovies = () => {
  return apiCall(trendingMoviesEndpoint, {});
};
export const fetchUpcomingMovies = () => {
  return apiCall(upcomingMoviesEndpoint, {});
};
export const fetchTopRatedMovies = () => {
  return apiCall(topRatedMoviesEndpoint, {});
};

// movie screen apis
export const fetchMovieDetails = (id: number) => {
  return apiCall(movieDetailsEndpoint(id), {});
};
export const fetchMovieCredits = (movieId: number) => {
  return apiCall(movieCreditsEndpoint(movieId), {});
};
export const fetchSimilarMovies = (movieId: number) => {
  return apiCall(similarMoviesEndpoint(movieId), {});
};

// person screen apis
export const fetchPersonDetails = (personId: number) => {
  return apiCall(personDetailsEndpoint(personId), {});
};
export const fetchPersonMovies = (personId: number) => {
  return apiCall(personMoviesEndpoint(personId), {});
};

// search screen apis
export const searchMovies = (query: string) => {
  return apiCall(searchMoviesEndpoint(query), {});
};
