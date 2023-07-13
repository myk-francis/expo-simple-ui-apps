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

export const image500 = (path: string) =>
  path ? `https://image.tmdb.org/t/p/w500/${path}` : "";

export const image342 = (path: string) =>
  path ? `https://image.tmdb.org/t/p/w342/${path}` : "";

export const image185 = (path: string) =>
  path ? `https://image.tmdb.org/t/p/w185/${path}` : "";

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

export const fetchTreadingMovies = () => {
  return apiCall(trendingMoviesEndpoint, {});
};
export const fetchUpcomingMovies = () => {
  return apiCall(upcomingMoviesEndpoint, {});
};
export const fetchTopRatedMovies = () => {
  return apiCall(topRatedMoviesEndpoint, {});
};
