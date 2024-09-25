import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "../layouts/mainLayout";


// // error
import Error from "../pages/Error";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";



const router = createBrowserRouter([
  {
    path: "/",
    element:<MainLayout/>,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
