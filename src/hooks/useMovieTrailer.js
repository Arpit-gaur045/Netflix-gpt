import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addTrailerVideo } from "../utils/moviesSlice";

const useMovieTrailer=(movieId)=>{
    


   const trailerVideo=useSelector(store=>store.movies.trailerVideo);
    //fetch trailer video and updating the store with trailer video data
    const dispatch=useDispatch();
    const getMovieVideos = async () => {
        const data = await fetch(
          "https://api.themoviedb.org/3/movie/"+ movieId+"/videos?language=en-US",
          API_OPTIONS
        );
        const json = await data.json();
        //console.log(json);
    
        const filterData = json?.results?.filter((video) => video?.type == "Trailer");
        const trailer =
        Array.isArray(filterData) && filterData.length > 0
          ? filterData[0]
          : Array.isArray(json?.results) && json.results.length > 0
          ? json.results[0]
          : null;
        //console.log(trailer);
        dispatch(addTrailerVideo(trailer));
    
      };
      useEffect(() => {
        !trailerVideo && getMovieVideos();
      }, []);
}

export default useMovieTrailer;