import React from "react";

export default function NotFound() {
  return (
    <div className="bg-amber-100 flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-9xl font-extrabold text-black">404</h1>
        <p className="text-2xl md:text-3xl text-amber-600 font-medium mt-4">
          Oops! Page not found
        </p>
        <p className="text-md md:text-lg text-amber-500 mt-2">
          The page you're looking for doesn't exist.
        </p>
        <a
          href="/"
          className="mt-6 inline-block bg-amber-300 text-black font-semibold px-6 py-3 rounded-full text-lg hover:bg-amber-400 transition-colors">
          Go back home
        </a>
      </div>
    </div>
  );
}
