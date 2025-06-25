import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router";
import PageTitle from "../../components/PageTitle/PageTitle";
import { Frown } from "lucide-react";

const ErrorPage = () => {
  return (
    <div>
      <PageTitle title={"Error Page"}></PageTitle>

      <div className="flex justify-center items-center h-screen bg-green-50 dark:bg-gray-800">
        <div className="text-center">
        <p className="flex justify-center mb-5 text-black dark:text-white">
           <Frown size={80} />
        </p>
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white">Page Not Found</h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-white">Sorry, the page you are looking for does not exist.</p>
          <Link
            to="/"
            className="shrink-0 mt-6 flex gap-2 px-4 py-2 bg-green-600 text-white rounded-md items-center mx-auto hover:bg-green-700 transition-colors w-fit"
          >
            <FaArrowLeft></FaArrowLeft> Go Back Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
