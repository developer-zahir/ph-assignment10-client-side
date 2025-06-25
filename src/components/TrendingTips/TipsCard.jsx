import { Calendar, Eye, GlobeIcon, GlobeLock, ThumbsUp } from "lucide-react";
import React from "react";
import { formatDate } from "../../utils/utils";
import { Link } from "react-router-dom";
import { Tooltip } from "react-tooltip";

const TipsCard = ({ tips }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden">
      <div className="relative h-55 w-full overflow-hidden">
        <Link to={`/all-tips/${tips._id}`}>
          <img src={tips.imageUrl} alt={tips.title} className="w-full h-full object-cover hover:opacity-95" />
        </Link>
        <span
          className={`absolute top-2 right-2 text-xs font-semibold px-2 py-1 rounded
          ${tips.difficulty === "Easy" ? "bg-green-100 text-green-700 dark:bg-green-500/50 dark:text-white" : ""}
          ${tips.difficulty === "Medium" ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/50 dark:text-white" : ""}
          ${tips.difficulty === "Hard" ? "bg-red-100 text-red-700 dark:bg-red-500/50 dark:text-white" : ""}
        `}
        >
          {tips.difficulty}
        </span>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="meta flex gap-3 ">
          {/* post availability */}
          {tips.availability === "Public" ? (
            <span>
              <GlobeIcon
                size={22}
                className="text-gray-700 dark:text-gray-200 hover:text-green-500 cursor-pointer"
                data-tooltip-id="availability"
                data-tooltip-content="Public"
              ></GlobeIcon>
              <Tooltip id="availability" content="Availability"></Tooltip>
            </span>
          ) : (
            <span>
              <GlobeLock
                size={22}
                className="text-gray-700 dark:text-gray-200 hover:text-green-500 cursor-pointer"
                data-tooltip-id="availability"
                data-tooltip-content="Hidden"
              ></GlobeLock>
              <Tooltip id="availability" content="Availability"></Tooltip>
            </span>
          )}

          <span className="inline-block bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-300 text-xs font-semibold px-3 py-1 rounded mb-2">
            {tips.category}
          </span>
          <p className="text-sm text-gray-500 dark:text-gray-300 mb-2 flex items-center gap-1">
            <Calendar className="w-4 h-4" /> {formatDate(tips.date)}
          </p>
        </div>

        <h3 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-white mb-2 line-clamp-2">{tips.title}</h3>

        <p className="text-gray-600 dark:text-gray-200 mb-3.5 text-sm">{tips.description.slice(0, 150)}...</p>

        {/* Footer */}
        <div className="flex items-center justify-between text-sm text-gray-700 dark:text-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs">{tips.userName?.charAt(0)}</div>
            {tips.userName}
          </div>
          <div className="flex items-center gap-2">
            <ThumbsUp className="w-4 h-4 text-green-500" /> {tips.likes}
            <Link to={`/all-tips/${tips._id}`} className="flex items-center gap-1">
              {" "}
              <Eye className="w-4 h-4 text-green-500" />
              <span className="text-green-500">See More</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TipsCard;
