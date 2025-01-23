import { useSelector } from "react-redux";
import MovieList from "./MovieList"


const SecondaryContainer = () => {
  const movies=useSelector((store)=>store.movies);
  //console.log(movies);
  return movies.nowPlayingMovies && (
    
    <div className=" bg-black">

      {/* {
      
          MovieList - popular
              MovieCards*n
          MovieList - NowPlaying
          MovieList - trending
          MovieList - Horror
      
      } */}
      < div className="-mt-40">
      <MovieList title={"Now Playing"} movies={movies?.nowPlayingMovies}/>
      <MovieList title={"Top Rated Movies"} movies={movies?.PopularMovies}/>
      <MovieList title={"Popular"} movies={movies?.nowPlayingMovies}/>
      <MovieList title={"Upcoming movies"} movies={movies?.PopularMovies}/>
      <MovieList title={"Horror movies"} movies={movies?.nowPlayingMovies}/>
      </div>
      
    </div>
  )
}

export default SecondaryContainer