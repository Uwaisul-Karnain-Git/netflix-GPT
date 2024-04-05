import { useEffect } from "react";
import { useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch } from 'react-redux';
import { addPopularMovies } from "../utils/moviesSlice";

const usePopularMoviesList = () => {
  const dispatch = useDispatch();

  const popularMovies = useSelector(store => store.movies.popularMovies);

  useEffect(() => {
    !popularMovies && getPopularMovies();
  }, []);

  const getPopularMovies = async () => {
    const data = await fetch(
      'https://api.themoviedb.org/3/movie/popular?page=1',
      API_OPTIONS
    );

    const json = await data.json();
    dispatch(addPopularMovies(json.results))
  };
}

export default usePopularMoviesList;
