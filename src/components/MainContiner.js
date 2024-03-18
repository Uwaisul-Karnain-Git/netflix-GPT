import React from 'react';
import { useSelector } from 'react-redux';
import VideoTitle from './VideoTitle';
import VideoBackground from './VideoBackground';

const MainContiner = () => {
    const movies = useSelector(store => store.movies?.nowPlayingMovies);

    if(!movies)
        return; // Early return

    const mainMovie = movies[0];
    const { original_title, overview, id } = mainMovie;
  return (
    <>
        <VideoTitle title={original_title} overview={overview} />
        <VideoBackground movieId={id} />
    </>
  )
}

export default MainContiner;