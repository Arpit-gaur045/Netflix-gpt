import { BG_URL } from "../utils/constants"
import GptMovieSuggestions from "./GptMovieSuggestions"
import GptSearchBar from "./GptSearchBar"

const GptSearch = () => {
  return (
    <>
    <div className="fixed -z-[10]">
    <img
          className="h-screen object-cover w-screen "
          src={BG_URL}
          alt="bgimg"
        ></img>
    </div>
       
      <div className="">
      <GptSearchBar/>
      <GptMovieSuggestions/>
      </div>
    </>
  )
}

export default GptSearch