import { createBrowserRouter } from "react-router-dom";
import Browse from "./Browse";
import { RouterProvider } from "react-router-dom";
import Login from "./Login";
import Header from "./Header";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";

const Body = () => {
  //always write the hooks at the top of your component and rest of the things should be after that
  const dispatch = useDispatch();

  const appRouter = createBrowserRouter([
    
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/browse",
      element: <Browse />,
    },
  ]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName,photoURL } = user;
        dispatch(addUser({ uid: uid, email: email, displayName: displayName,photoURL: photoURL }));
      } else {
        dispatch(removeUser());
      }
    });
  }, []);

  return (
    <div>
      
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default Body;
