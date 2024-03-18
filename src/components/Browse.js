import React from 'react';
import Header from './Header';
import useNowPlayingMoviesList from '../customHooks/useNowPlayingMovies';
import MainContiner from './MainContiner';
import SecondaryContainer from './SecondaryContainer';

const Browse = () => {
  
  useNowPlayingMoviesList();

  return (
    <div>
      <Header/>
      <MainContiner/>
      <SecondaryContainer/>
    </div>
  )
}

export default Browse