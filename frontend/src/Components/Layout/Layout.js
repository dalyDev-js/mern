import React from "react";
import Navbar from "../NavBar/Navbar";
import Footer from "../Footer/Footer";
import { Outlet, useLocation } from "react-router-dom";

export default function Layout() {
  const location = useLocation();

  // Define the routes where the footer should be hidden
  const hideFooterRoutes = ["/chat", "/chat/:receiverId"];

  // Check if the current location matches any of the hideFooterRoutes
  const shouldHideFooter = hideFooterRoutes.some((route) =>
    location.pathname.startsWith("/chat")
  );
  return (
    <>
      <Navbar></Navbar>
      <Outlet></Outlet>
      {!shouldHideFooter && <Footer />}
    </>
  );
}
