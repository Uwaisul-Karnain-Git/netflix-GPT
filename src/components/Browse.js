import React from 'react';
import Header from './Header';
import MainContiner from './MainContiner';
import SecondaryContainer from './SecondaryContainer';
import useNowPlayingMoviesList from '../customHooks/useNowPlayingMovies';
import usePopularMoviesList from '../customHooks/usePopularMovies';
import useTopRatedMoviesList from '../customHooks/useTopRatedMovies';
import useUpcomingMoviesList from '../customHooks/useUpcommingMovies';

const Browse = () => {
  
  useNowPlayingMoviesList();
  usePopularMoviesList();
  useTopRatedMoviesList();
  useUpcomingMoviesList();

  return (
    <div>
      <Header/>
      <MainContiner/>
      <SecondaryContainer/>
    </div>
  )
}

export default Browse