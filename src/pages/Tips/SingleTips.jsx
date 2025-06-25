// src/pages/SingleTips.jsx
import React, { useContext } from "react";
import { Link, useNavigate, useLoaderData } from "react-router-dom";
import { ArrowLeft, Calendar, User, ThumbsUp, Tag } from "lucide-react";

import { AuthContent } from "../../contexts/Authcontext";
import { formatDate } from "../../utils/utils";
import PageTitle from "../../components/PageTitle/PageTitle";

const SingleTips = () => {
  const tip = useLoaderData();
  const { setLoading } = useContext(AuthContent);
  const navigate = useNavigate();

  if (!tip) {
    setLoading(true);
  }

  const handleLike = () => {
    alert("liked");
  };

  return (
    <>
      <PageTitle title={tip.title}></PageTitle>
      <section className="bg-green-50 dark:bg-gray-900 py-11 lg:py-20">
        <div className="max-w-screen-xl mx-auto px-2">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            {/* hero image */}
            <div className="relative h-64 md:h-96">
              {/* back button */}
              <button
                onClick={() => navigate(-1)}
                className="flex items-center absolute top-5 left-5 text-white cursor-pointer bg-gray-700 dark:bg-green-600 px-2 py-1.5 rounded-md text-sm"
              >
                <ArrowLeft className="h-4 w-4 mr-1" /> Back to Tips
              </button>
              <img
                src={`${tip.imageUrl ? tip.imageUrl : "https://via.placeholder.com/600x400"}`}
                alt={tip.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-black/70 to-transparent">
                <h1 className="text-2xl md:text-3xl font-bold text-white mb-3 capitalize">{tip.title}</h1>
                <div className="flex flex-wrap items-center text-white gap-4">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1 text-primary-300" />
                    <span className="text-sm">{formatDate(tip.date)}</span>
                  </div>
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1 text-primary-300" />
                    <span className="text-sm">{tip.userName}</span>
                  </div>
                  <div className="flex items-center">
                    <Tag className="h-4 w-4 mr-1 text-primary-300" />
                    <span className="text-sm">{tip.category}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* details */}
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <span
                    className={`text-xs font-medium px-3 py-1 rounded-full ${
                      tip.difficulty === "Easy"
                        ? "bg-green-200 text-black"
                        : tip.difficulty === "Medium"
                        ? "bg-yellow-100 text-warning-700"
                        : "bg-red-100 text-error-700"
                    }`}
                  >
                    {tip.difficulty} Difficulty
                  </span>
                  <span className="text-sm text-gray-900 dark:text-gray-400">
                    <span className="font-medium">Topic:</span> <span className="capitalize">{tip.topic}</span>
                  </span>
                </div>

                <button
                  onClick={handleLike}
                  className="flex items-center space-x-1 text-primary-600 text-green-600  dark:hover:text-green-600 cursor-pointer"
                >
                  <ThumbsUp className="h-5 w-5" />
                  <span>{tip.totalLiked ? tip.totalLiked : 0}</span>
                </button>
              </div>

              {/* description */}
              <div className="text-black text-sm md:text-base dark:text-gray-200">{tip.description}</div>

              {/* author */}
              <div className="mt-8 pt-6 border-t border-gray-300  dark:border-gray-600">
                <div className="flex items-center">
                  <div className="profileIcon w-10 h-10 rounded-full font-bold border border-green-500 bg-green-100 flex justify-center items-center">
                    {tip.userName.slice(0, 1).toUpperCase()}
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-primary-800 dark:text-primary-200 text-black dark:text-gray-200">{tip.userName}</p>
                    <p className="text-xs text-primary-600 dark:text-primary-400 text-black dark:text-gray-400">{tip.userEmail}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SingleTips;
