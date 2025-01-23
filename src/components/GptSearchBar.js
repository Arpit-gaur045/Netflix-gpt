import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/languageConstants";
import { useRef } from "react";
import { API_OPTIONS, Gemini_KEY, OPENAI_KEY } from "../utils/constants";
import axios from "axios";
import { addGptMovieResult } from "../utils/gptSlice";

const GptSearchBar =  () => {
    const langKey=useSelector(store=>store.config.lang);
    const searchText=useRef(null);
    const dispatch=useDispatch(); 
    //search movie in TMDB 
    const searchMovieTMDB = async(movie)=>{
      const data =await fetch("https://api.themoviedb.org/3/search/movie?query="+ movie+ "&include_adult=false&language=en-US&page=1", API_OPTIONS);
      const json=await data.json();
      return json.results;
    }
    const handleGptSearchClick= async()=>{

      //console.log(searchText.current.value);

      //Make an API call to GPT API and get Movie Results
      
      const geminiQuery="Act as a Movie Recommendation system and suggest some movies for the query : "+ searchText.current.value + ". only give me names of 5 movies,comma seperated like the example result given ahead.Example Result: Gadar, Sholay, Don, Golmaal, Koi mil gaya";

      const gptResults= await axios({
        url:Gemini_KEY,
        method:"post",
        data:{
          
            "contents": [{
              "parts":[{"text": geminiQuery}]
              }]
             
        }

      })
      

      //console.log(gptResults?.data?.candidates[0]?.content?.parts[0]?.text);
      const geminiMovies=gptResults?.data?.candidates[0]?.content?.parts[0]?.text.split(",");

      //['Golmaal', ' Hera Pheri', ' Chupke Chupke', '  Angoor', '  Padosan\n']

      //For each movie i will search TMDB API

       const promiseArray= geminiMovies.map((movie)=>searchMovieTMDB(movie));
       //an array of promises will be stored here
       //[Promise,Promise,Promise,Promise,Promise]

       const tmdbResults= await  Promise.all(promiseArray);
       //console.log(tmdbResults);
       dispatch(addGptMovieResult({movieNames:geminiMovies,movieResults:tmdbResults}));
       

    }
  return (
    <div className="pt-[10%] flex justify-center">
      <form onSubmit={(e)=>e.preventDefault()} className="w-1/2 bg-black grid grid-cols-9">
        <input
          ref={searchText}
          type="text"
          className="p-4 m-4 col-span-6  "
          placeholder={lang[langKey].gptSearchPlaceholder}
        />
        <button onClick={handleGptSearchClick} className="col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg">
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
