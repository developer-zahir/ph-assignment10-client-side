import { Eye, Pencil, Trash } from "lucide-react";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContent } from "../../contexts/Authcontext";
const TipsTable = ({ myTips, handleDelete }) => {
  const { user } = useContext(AuthContent);
  return (
    <div className="overflow-x-auto rounded-lg shadow-sm col-span-3">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-green-600 dark:bg-green-700 text-white">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-semibold">Image</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">Title</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">Category</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">Difficulty</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">Availability</th>
            <th className="px-4 py-3 text-right text-sm font-semibold">Actions</th>
          </tr>
        </thead>

        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          {myTips.map((tip) => (
            <tr key={tip._id} className="hover:bg-green-50 dark:hover:bg-gray-700">
              {/* Image */}
              <td className="px-4 py-2">
                <img src={tip.imageUrl} alt={tip.title} className="h-12 w-12 object-cover rounded-md" />
              </td>

              {/* Title */}
              <td className="px-4 py-2 whitespace-nowrap">
                <span className="flex flex-col">
                  <span className="text-gray-800 dark:text-gray-100 font-medium">{tip.title}</span>
                  <small className="text-green-600">
                    Author: <span className="dark:text-white text-gray-700">{user?.displayName}</span>
                  </small>
                </span>
              </td>

              {/* Category */}
              <td className="px-4 py-2">
                <span className="inline-block bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-300 text-xs  px-3 py-1 rounded">
                  {tip.category}
                </span>
              </td>
              {/* Difficulty */}
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
                <span className="inline-block bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-300 text-xs  px-3 py-1 rounded">
                  {tip.availability}
                </span>
              </td>

              {/* Actions */}
              <td className="px-4 py-2 text-right space-x-2">
                <div className="allActions flex gap-2 w-full justify-end">
                  <Link
                    to={`/all-tips/${tip._id}`}
                    className="p-2 bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-100 rounded-[5px] hover:bg-green-200 dark:hover:bg-green-600 transition cursor-pointer"
                  >
                    <Eye className="w-4 h-4" />
                  </Link>

                  <Link
                    to={`/edit-tips/${tip._id}`}
                    className="p-2 bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 rounded-[5px] hover:bg-blue-200 dark:hover:bg-blue-600 transition cursor-pointer"
                  >
                    <Pencil className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => handleDelete(tip._id)}
                    className="p-2 bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-100 rounded-[5px] hover:bg-red-200 dark:hover:bg-red-600 transition cursor-pointer"
                  >
                    <Trash className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TipsTable;
