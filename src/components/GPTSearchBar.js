import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import lang from '../utils/languageConstants'
import openai from '../utils/openai';
import { API_OPTIONS } from '../utils/constants';
import { addGPTMovieResults } from '../utils/gptSlice';

const GPTSearchBar = () => {
  const dispatch = useDispatch();
  const langKey = useSelector(store => store.config.lang);
  const searchText = useRef(null);
  
  // Search movie in TMDB
  const searchMovieTMBD = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
      movie +
      "&include_adult=false&language=en-US&page=1", 
      API_OPTIONS
    );
    const jsonData = await data.json();
    return jsonData.results;
  };

  const handleGPTSearchClick = async () => {
    const gptQuery = "Act as a movie recommendation system for the query:" + searchText.current.value +   
      ". only give me names of 5 movies, comma serated like the example result given ahead. Example Results: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya";

    // Make an API call to GPT API and get movie results
    // const gptResults = await openai.chat.completions.create({
    //   messages: [{ role: 'user', gptQuery }],
    //   model: 'gpt-3.5-turbo',
    // });

    // Hard coding the movies list since this API is a paid API
    const gptResults = "Andaz Apna Apna, Vikram Vedha, Chupke Chupke, Jaane Bhi Do Yaaro, Padosan";
    const gptMovies = gptResults.split(", ");
    
    // For each movie, we will search TMDB API
    const moviesPromiseArray = gptMovies.map(movie => searchMovieTMBD(movie)); // This will return an array of 5 promises
    const tmdbResults = await Promise.all(moviesPromiseArray); // This will be finished only after all 5 promises are resolved

    // Store movies in Redux
    dispatch(addGPTMovieResults(tmdbResults));
  };

  return (
    <div className='pt-[10%] flex justify-center'>
        <form 
          className='w-1/2 bg-black grid grid-cols-12' 
          onSubmit={e => e.preventDefault()}
        >
            <input 
              ref={searchText}
              type='text' 
              className='col-span-9 p-4 m-4' 
              placeholder={lang[langKey].gptSearchPlaceHolder} 
            />
            <button 
              className='col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg'
              onClick={handleGPTSearchClick}
            >
              {lang[langKey].search}
            </button>
        </form>
    </div>
  )
}

export default GPTSearchBar