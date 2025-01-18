import { createSlice } from "@reduxjs/toolkit";

const moviesSlice=createSlice({
    
    name: "movies",
    initialState:{
        nowPlayingMovies:null,
        trailerVideo:null,
    },
    reducers:{
        addNowPlayingMovies:(state,action)=>{
            //whatever will come in as an action, will simply add it to now playing movies
            state.nowPlayingMovies=action.payload;
        },
        addTrailerVideo:(state,action)=>{
            state.trailerVideo=action.payload;
        }
    }});
    
    export const {addNowPlayingMovies,addTrailerVideo}=moviesSlice.actions;
    export default moviesSlice.reducer;