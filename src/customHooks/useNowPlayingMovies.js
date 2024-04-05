import { useEffect } from "react";
import { useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch } from 'react-redux';
import { addNowPlayingMovies } from "../utils/moviesSlice";

const useNowPlayingMoviesList = () => {
  const dispatch = useDispatch();

  const nowPlayingMovies = useSelector(store => store.movies.nowPlayingMovies);

  useEffect(() => {
    if(!nowPlayingMovies) {
      getNowPlayingMovies();
    }
  }, []);

  const getNowPlayingMovies = async () => {
    const data = await fetch(
      'https://api.themoviedb.org/3/movie/now_playing?page=1', 
      API_OPTIONS
    );

    const json = await data.json();
    dispatch(addNowPlayingMovies(json.results))
  };
}

export default useNowPlayingMoviesList;
