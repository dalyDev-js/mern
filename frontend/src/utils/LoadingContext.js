import React, { createContext, useContext, useState, useEffect } from "react";

const LoadingContext = createContext();

export const useLoading = () => useContext(LoadingContext);

export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  // Automatically set loading to false after 1.5 seconds
  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1500); // 1.5 seconds

      // Cleanup the timeout to avoid memory leaks
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {isLoading && <Loading />}
      {children}
    </LoadingContext.Provider>
  );
};

export const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="loader border-t-4 border-blue-500 rounded-full w-8 h-8 animate-spin"></div>
      <p className="ml-4">Loading...</p>
    </div>
  );
};
