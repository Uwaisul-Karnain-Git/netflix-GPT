import React from 'react';
import Header from './Header';
import MainContiner from './MainContiner';
import SecondaryContainer from './SecondaryContainer';
import useNowPlayingMoviesList from '../customHooks/useNowPlayingMovies';
import usePopularMoviesList from '../customHooks/usePopularMovies';

const Browse = () => {
  
  useNowPlayingMoviesList();
  usePopularMoviesList();

  return (
    <div>
      <Header/>
      <MainContiner/>
      <SecondaryContainer/>
    </div>
  )
}

export default Browse