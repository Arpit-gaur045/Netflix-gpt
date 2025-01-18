import { createBrowserRouter } from "react-router-dom";
import Browse from "./Browse";
import { RouterProvider } from "react-router-dom";
import Login from "./Login";


const Body = () => {
  //always write the hooks at the top of your component and rest of the things should be after that
  

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

  

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default Body;
