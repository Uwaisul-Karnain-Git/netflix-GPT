import React from 'react';
import { useSelector } from 'react-redux';
import Header from './Header';
import MainContiner from './MainContiner';
import SecondaryContainer from './SecondaryContainer';
import useNowPlayingMoviesList from '../customHooks/useNowPlayingMovies';
import usePopularMoviesList from '../customHooks/usePopularMovies';
import useTopRatedMoviesList from '../customHooks/useTopRatedMovies';
import useUpcomingMoviesList from '../customHooks/useUpcommingMovies';
import GPTSearch from './GptSearch';

const Browse = () => {
  const showGPTSearch= useSelector(store => store.gpt?.showGPTSearch);

  useNowPlayingMoviesList();
  usePopularMoviesList();
  useTopRatedMoviesList();
  useUpcomingMoviesList();

  return (
    <div>
      <Header/>
      { showGPTSearch ? (
          <GPTSearch />
        ) : (
          <>
            <MainContiner/>
            <SecondaryContainer/>
          </>
        )
      }
    </div>
  )
}

export default Browse