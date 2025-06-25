import React from "react";

const Loading = () => {
  return (
    <div
      id="loadingScreen"
      className="bg-white dark:bg-gray-800 z-50 backdrop-blur-md  absolute top-0 left-0 w-full h-full flex items-center gap-4  justify-center"
    >
      <svg className="animate-spin h-7 w-7 text-green-600  border-t-transparent border-4 rounded-full" viewBox="0 0 24 24"></svg>

      <h2 className="text-black dark:text-white">Loading...</h2>
    </div>
  );
};

export default Loading;
