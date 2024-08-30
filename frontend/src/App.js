import "./App.css";
import Layout from "./Components/Layout/Layout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home/Home";

import NotFound from "./Pages/NotFound/NotFound";
import SignIn from "./Pages/SignIn/SignIn";
import SignUp from "./Pages/SignUp/SignUp";
<<<<<<< HEAD
import ProfilePage from "./Pages/ProfilePage/ProfilePage";
=======
import JobSearch from "./Pages/Jobs/Jobs";
>>>>>>> a00cc267dd5707c02f9a4c9a4078634f375c0056

let routers = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <SignIn /> },
      { path: "/register", element: <SignUp /> },
<<<<<<< HEAD
      { path: "/profile", element: <ProfilePage/> },
=======
      { path: "/jobs", element: <JobSearch /> },
>>>>>>> a00cc267dd5707c02f9a4c9a4078634f375c0056
      { path: "*", element: <NotFound /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={routers}></RouterProvider>;
}

export default App;
