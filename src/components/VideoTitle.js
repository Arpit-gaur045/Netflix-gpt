

const VideoTitle = ({title,overview}) => {
  return (
    <div className="absolute w-screen aspect-video pt-[30%] px-4 md:px-20 md:pt-[18%] text-white bg-gradient-to-r z-10 from black ">
        <h1 className=" text-2xl  md:text-6xl font-bold">{title}</h1>
        <p className=" hidden md:inline-block  py-6 text-lg w-1/4 ">{overview}</p>
        <div className="my-2 md:my-0">
            <button className="bg-white text-black  py-1 md:py-4  px-3 text-xl  rounded-lg hover:bg-opacity-70">▶️Play</button>
            <button className="hidden md:inline-block  mx-2  bg-gray-500 text-white p-4 px-12 text-xl bg-opacity-50 rounded-lg hover:bg-opacity-70">More Info</button>
        </div>

    </div>
  )
}

export default VideoTitle