import "./App.css";
import Layout from "./Components/Layout/Layout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home/Home";

import NotFound from "./Pages/NotFound/NotFound";
import SignIn from "./Pages/SignIn/SignIn";
import SignUp from "./Pages/SignUp/SignUp";
import ContactUs from "./Pages/Contact_Us/ContactUs";
import AboutUs from "./Pages/About_Us/AboutUs";

let routers = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <SignIn /> },
      { path: "/register", element: <SignUp /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

function App() {
  // return <RouterProvider router={routers}></RouterProvider>;
  return (
    <>
      <ContactUs />
      <AboutUs />
    </>
  );
}

export default App;
