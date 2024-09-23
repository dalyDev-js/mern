import "./App.css";
import Layout from "./Components/Layout/Layout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home/Home";
import NotFound from "./Pages/NotFound/NotFound";
import SignIn from "./Pages/SignIn/SignIn";
import SignUp from "./Pages/SignUp/SignUpClient";
import JobSearch from "./Pages/Jobs/Jobs";
import GetStarted from "./Pages/GetStarted/GetStarted";
import ProfilePage from "./Pages/ProfilePage/ProfilePage";
import JobDetail from "./Pages/JobDetails/JobDetails";
import Client from "./Pages/Client/Client";
import Profile from "./Pages/HireEngineer/Profile";
import HiringProcess from "./Pages/HiringProcess/HiringProcess";
import Payment from "./Pages/Payment_Pages/Payment";
import Proposal from "./Pages/Proposal/Proposal";
import ContactUs from "./Pages/Contact_Us/ContactUs";
import Jobs from "./Pages/Jobs/Jobs";
import ProfileCertifications from "./Components/ProfileCertifications/ProfileCertifications";
import ProfileEducation from "./Components/ProfileEducation/ProfileEducation";
import ProfileHeader from "./Components/ProfileHeader/ProfileHeader";
import ProfilePortfolio from "./Components/ProfilePortofolio/ProfilePortfolio";
import ProfileSideBar from "./Components/ProfileSideBar/ProfileSideBar";
import AboutUs from "./Pages/About_Us/AboutUs";
import EngineersList from "./Pages/Engineers_List/EngineersList";
import SaveJobs from "./Pages/SaveJobs/SaveJobs";
import MyJobsPosts from "./Pages/MyJobsPosts/MyJobsPosts";
import JobProposals from "./Pages/JobProposals/JobProposals";
import ProposalsStatus from "./Pages/ProposalsStatus/ProposalsStatus";
import SignUpClient from "./Pages/SignUp/SignUpClient";
import SignUpEngineer from "./Pages/SignUp/SignUpEngineer";
import ProtectedRoute from "./utils/ProtectedRoute";
import Verify from "./Pages/Verify/Verify";
import { LoadingProvider } from "./utils/LoadingContext";

let routers = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "/signin", element: <SignIn /> },
      { path: "/signup-client", element: <SignUpClient /> },
      { path: "/signup-engineer", element: <SignUpEngineer /> },
      {
        path: "/jobs",
        element: (
          <ProtectedRoute role="engineer">
            <JobSearch />
          </ProtectedRoute>
        ),
      },
      { path: "/get-started", element: <GetStarted /> },
      {
        path: "/profile/:id",
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        ),
      }, // update engineer profile -- engineer view
      { path: "/job-details/:id", element: <JobDetail /> }, // job details -- engineer view
      { path: "/engineer-details", element: <Profile /> }, // engineer details -- client view
      { path: "/engineer-details/:id", element: <Profile /> }, // engineer details -- client view
      { path: "/hiring/:service/:id", element: <HiringProcess /> }, // sending proposal -- engineer view
      { path: "/verify", element: <Verify /> },
      {
        path: "/client",
        element: (
          <ProtectedRoute role="client">
            <Client />
          </ProtectedRoute>
        ), // Only clients can access
      }, // job posting -- client view
      { path: "/payment", element: <Payment /> }, // job payment for the engineer -- client view
      { path: "/proposal", element: <Proposal /> }, // job posting client view
      { path: "/contact", element: <ContactUs /> }, // job posting client view
      { path: "/about", element: <AboutUs /> }, // job posting client view
      { path: "/engineers-list", element: <EngineersList /> }, // job posting client viewwwwwwwwwwwwwwwwwwwwwwwwwwwww
      { path: "/saved-jobs", element: <SaveJobs /> }, // job posting client view
      { path: "/recent-posts", element: <MyJobsPosts /> }, // jobs already posted client view
      { path: "/job-proposals/:id", element: <JobProposals /> }, // job posting
      { path: "/proposals-status", element: <ProposalsStatus /> }, // job posting
      { path: "*", element: <NotFound /> },
    ],
  },
]);

function App() {
  return (
    <LoadingProvider>
      <RouterProvider router={routers}></RouterProvider>
    </LoadingProvider>
  );
}

export default App;
