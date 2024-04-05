import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { API_OPTIONS } from '../utils/constants';
import { addTrailerVideo } from '../utils/moviesSlice';

const useMovieTrailer = (movieId) => {
    const dispatch = useDispatch();

    const trailerVideo = useSelector(store => store.movies.trailerVideo);

    useEffect(() => {
        !trailerVideo && getMovieVideos();
    }, []);

    // Fetch trailer video
    const getMovieVideos = async () => {
        const data = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`, API_OPTIONS);
        const jsonData = await data.json();

        const filteredData = jsonData.results.filter(r => r.type.toLowerCase() === 'trailer');
        const trailer = filteredData.length ? filteredData[0] : jsonData.results[0];
        dispatch(addTrailerVideo(trailer));
    };
}

export default useMovieTrailer;
