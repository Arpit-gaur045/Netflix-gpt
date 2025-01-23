import { createSlice } from "@reduxjs/toolkit";

const moviesSlice=createSlice({
    
    name: "movies",
    initialState:{
        nowPlayingMovies:null,
        popularMovies:null,
        trailerVideo:null,
        UpcomingMovies:null,
        TopRatedMovies:null
    },
    reducers:{
        addNowPlayingMovies:(state,action)=>{
            //whatever will come in as an action, will simply add it to now playing movies
            state.nowPlayingMovies=action.payload;
        },
        addPopularMovies:(state,action)=>{
            //whatever will come in as an action, will simply add it to now playing movies
            state.PopularMovies=action.payload;
        },
        addTopRatedMovies:(state,action)=>{
            //whatever will come in as an action, will simply add it to now playing movies
            state.PopularMovies=action.payload;
        },
        addUpcomingMovies:(state,action)=>{
            //whatever will come in as an action, will simply add it to now playing movies
            state.UpcomingMovies=action.payload;
        },

        addTrailerVideo:(state,action)=>{
            state.trailerVideo=action.payload;
        }
    }});
    
    export const {addNowPlayingMovies,addTrailerVideo,addPopularMovies,addUpcomingMovies,addTopRatedMovies}=moviesSlice.actions;
    export default moviesSlice.reducer;