import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";



// // error
import Error from "../pages/Error";
import Home from "../pages/Home";
import Navbar from "../components/NavBar";
import Register from "../pages/Register";
import Login from "../pages/Login";



const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <div className="min-h-[89vh] text-light-text dark:text-dark-text bg-light-secondary dark:bg-dark-secondary">
          <Outlet />
        </div>
      </>
    ),
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
