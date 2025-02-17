import { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import {createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../utils/firebase";
import {signInWithEmailAndPassword } from "firebase/auth";

import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BG_URL, USER_ICON } from "../utils/constants";


const Login = () => {
  
  

  const dispatch=useDispatch();
  const [isSignInform, setSignInForm] = useState(true);
  const [errorMessage,setErrorMessage]=useState(null);
  const toggleSignInForm = () => {
    setSignInForm(!isSignInform);
  };
  
  const name=useRef(null);
  const email=useRef(null);
  const password=useRef(null);



  const handleButtonClick=()=>{
    //Validate the form data
    // console.log(email.current.value);
    // console.log(password.current.value);
    const message=checkValidData(email.current.value,password.current.value);
    setErrorMessage(message);
    if(message)return;

    //Sign In/Sign Up logic
    
    if(!isSignInform){
          //Sign Up logic here
          createUserWithEmailAndPassword(auth,email.current.value,password.current.value)
  .then((userCredential) => {
    const user = userCredential.user;
    //console.log(user);
    updateProfile(user, {
      displayName: name.current.value, photoURL: {USER_ICON},
    }).then(() => {
      // Profile updated!
      const { uid, email, displayName,photoURL } = auth.currentUser;
              dispatch(addUser({ uid: uid, email: email, displayName: displayName,photoURL: photoURL }));
      
    }).catch((error) => {
      // An error occurred
      setErrorMessage(errorMessage);
    });
     
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorMessage(errorCode+ "-"+errorMessage)
  });
  
    }else{
      //Sign In logic here

    signInWithEmailAndPassword(auth,email.current.value,password.current.value)
  .then((userCredential) => {
    
    const user = userCredential.user;
    //console.log(user);
  

  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorMessage(errorCode+ "-"+errorMessage)

  });



    }

    
    
  }
  return (
    <div>
      <Header />
      <div className="fixed">
        <img
          className="h-screen object-cover w-screen "
          src={BG_URL}
          alt="bgimg"
        ></img>
      </div>
      <form
       onSubmit={(e)=>e.preventDefault()}
       className="absolute w-9/12 md:w-3/12 p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80">
        <h1 className="font-bold text-3xl py-4">
          {isSignInform ? "Sign In" : "Sign Up"}
        </h1>

        {!isSignInform && (
          <input
            ref={name}
            type="text"
            placeholder="Name"
            className="p-4 my-4 w-full bg-gray-700"
          />
        )}

        <input
         ref={email}
          type="text"
          placeholder="Email Address"
          className="p-4 my-4 w-full bg-gray-700"
        />
        <input
        ref={password}
          type="password"
          placeholder="Password"
          className="p-4 my-4 w-full bg-gray-700"
        />

         <p className="text-red-500 font-bold text-lg py-2">{errorMessage}</p>

        <button
          type="submit"
          className="p-4 my-6  bg-red-700 w-full rounded-lg"
          onClick={handleButtonClick}
        >
          {isSignInform ? "Sign In" : "Sign Up"}
        </button>
        
        <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>
          {isSignInform
            ? "New to Netflix? Sign Up Now"
            : "Already registered? Sign In Now"}
        </p>
      </form>
    </div>
  );
};

export default Login;
