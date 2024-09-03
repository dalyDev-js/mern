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

let routers = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <SignIn /> },
      { path: "/register", element: <SignUp /> },
      { path: "/jobs", element: <JobSearch /> },
      { path: "/started", element: <GetStarted /> },
      { path: "/profile", element: <ProfilePage /> },
      { path: "/job-details", element: <JobDetail /> },
      { path: "/client", element: <Client /> },

      { path: "*", element: <NotFound /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={routers}></RouterProvider>;
}

export default App;
