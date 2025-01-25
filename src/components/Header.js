import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO, SUPPORTED_LANGUAGES, USER_ICON } from "../utils/constants";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const showGptSearch=useSelector((store)=>store.gpt.showGptSearch);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
      //unsubscribe when component unmounts
      return () => unsubscribe();
    });
  }, []);
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        
      })
      .catch((error) => {
        // An error happened.
        navigate("/error");
      });
  };

  const handleGptSearchClick = () => {
    //Toggle GPT Search
    dispatch(toggleGptSearchView());
  };

  const handleLanguageChange=(e)=>{
      dispatch(changeLanguage(e.target.value));
  }
  return (
    <div className="absolute top-0 w-screen px-8 py-2 bg-gradient-to-b from-black z-[20] flex flex-col md:flex-row justify-between ">
      <img className="w-44 mx-auto md:mx-0 " src={LOGO} alt="logo" />

      {user && (
        <div className=" flex p-2 justify-between">
        
        { showGptSearch && (
         <select className="p-2 m-2 bg-gray-900 text-white" onChange={handleLanguageChange}>
          {SUPPORTED_LANGUAGES.map(lang=><option key={lang.identifier} value={lang.identifier}>{lang.name}</option>)}
         </select>)
}


          <button className="py-2 px-4 mx-4 my-2 text-white bg-purple-800 rounded-lg pointer-events-auto" onClick={handleGptSearchClick}>
           {showGptSearch?"Home Page":"GPT Search"} 
          </button>
          <img className=" hidden md:block  w-12 h-12 " alt="usericon" src={USER_ICON} />

          <button onClick={handleSignOut} className="font-bold text-white mx-2 ">
            (Sign Out)
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
