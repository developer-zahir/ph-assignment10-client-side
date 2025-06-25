import { Eye } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const TipsTable = ({ currentTips }) => {
  // console.log(currentTips);

  return (
    <div className="overflow-x-auto rounded-lg shadow-sm col-span-3">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-green-600 dark:bg-green-700 text-white">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-semibold">Image</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">Title</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">Category</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">Difficulties</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">Availability</th>
            <th className="px-4 py-3 text-right text-sm font-semibold">Action</th>
          </tr>
        </thead>

        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          {currentTips.map((tip) => (
            <tr key={tip._id} className="hover:bg-green-50 dark:hover:bg-gray-700">
              {/* Image */}
              <td className="px-4 py-2">
                <img src={tip.imageUrl} alt={tip.title} className="h-12 w-12 object-cover rounded-md" />
              </td>

              {/* Title */}
              <td className="px-4 py-2 whitespace-nowrap">
                <span className="text-gray-800 dark:text-gray-100 font-medium">{tip.title}</span>
              </td>

             
              {/* Category */}
              <td className="px-4 py-2">
                <span className="inline-block bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-300 text-xs font-semibold px-3 py-1 rounded">
                  {tip.category}
                </span>
              </td>
 {/* Difficulties */}
              <td className="px-4 py-2">
                <span
                  className={`right-2 text-xs font-semibold px-2 py-1 rounded
          ${tip.difficulty === "Easy" ? "bg-green-100 text-green-700 dark:bg-green-500/50 dark:text-white" : ""}
          ${tip.difficulty === "Medium" ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/50 dark:text-white" : ""}
          ${tip.difficulty === "Hard" ? "bg-red-100 text-red-700 dark:bg-red-500/50 dark:text-white" : ""}
        `}
                >
                  {tip.difficulty}
                </span>
              </td>

              {/* availability */}
              <td className="px-4 py-2">
                <span className="inline-block bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-300 text-xs font-semibold px-3 py-1 rounded">
                  {tip.availability}
                </span>
              </td>

              {/* Action */}
              <td className="px-4 py-2 text-right">
                <Link
                  to={`/all-tips/${tip._id}`}
                  className="inline-flex items-center gap-1 text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300"
                >
                  <Eye className="w-4 h-4" />
                  <span className="hidden sm:inline">See&nbsp;More</span>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TipsTable;
