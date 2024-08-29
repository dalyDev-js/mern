import logo from "./logo.svg";
import "./App.css";
import Layout from "./Components/Layout/Layout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import NotFound from "./Components/NotFound/NotFound";
import ProfileHeader from "./Components/ProfileHeader/ProfileHeader";
import ProfileSummary from "./Components/ProfileSummary/ProfileSummary";
import ProfileSkills from "./Components/ProfileSkills/ProfileSkills";

let routers = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={routers}></RouterProvider>;
  
}

export default App;
