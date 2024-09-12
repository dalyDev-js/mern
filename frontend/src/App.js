import "./App.css";
import Layout from "./Components/Layout/Layout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home/Home";
import NotFound from "./Pages/NotFound/NotFound";
import SignIn from "./Pages/SignIn/SignIn";
import SignUp from "./Pages/SignUp/SignUp";
import JobSearch from "./Pages/Jobs/Jobs";
import GetStarted from "./Pages/GetStarted/GetStarted";
import ProfilePage from "./Pages/ProfilePage/ProfilePage";
import JobDetail from "./Pages/JobDetails/JobDetails";
import Client from "./Pages/Client/Client";
import Profile from "./Pages/HireEngineer/Profile";
import HiringProcess from "./Pages/HiringProcess/HiringProcess";

let routers = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <SignIn /> },
      { path: "/register", element: <SignUp /> },
      { path: "/jobs", element: <JobSearch /> }, //engineer view to jobs
      { path: "/started", element: <GetStarted /> }, //join as an engineer or client
      { path: "/profile", element: <ProfilePage /> }, //update engineer profile engineer view
      { path: "/job-details", element: <JobDetail /> }, // job details engineer view
      { path: "/hire-engineer", element: <Profile /> }, //engineer details client view
      { path: "/hiring", element: <HiringProcess /> }, //proposal engineer view
      { path: "/client", element: <Client /> }, // job posting client view

      { path: "*", element: <NotFound /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={routers}></RouterProvider>;
  return <RouterProvider router={routers}></RouterProvider>;
}

export default App;
