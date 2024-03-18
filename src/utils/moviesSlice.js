import { createSlice } from '@reduxjs/toolkit';

const moviesSlice = createSlice({
    name: "movies",
    initialState: {
        trailerVideo: null,
        nowPlayingMovies: null,
        popularMovies: null,
    },
    reducers: {
        addTrailerVideo: (state, action) => {
            state.trailerVideo = action.payload;
        },
        addNowPlayingMovies: (state, action) => {
            state.nowPlayingMovies = action.payload;
        },
        addPopularMovies: (state, action) => {
            state.popularMovies = action.payload;
        },
    }
});

export const { addTrailerVideo, addNowPlayingMovies, addPopularMovies } = moviesSlice.actions;

export default moviesSlice.reducer;