import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { AuthContent } from "../../contexts/Authcontext";
import PageTitle from "../../components/PageTitle/PageTitle";

const ShareTip = () => {
  const [imagePreview, setImagePreview] = useState("");
  const { user } = useContext(AuthContent);

  const handleImageUrlChange = (e) => {
    setImagePreview(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    if (!data.title || !data.topic || !data.difficulty || !data.category || !data.description) {
      toast.error("Please fill in all   fields.");
      return;
    }

    fetch("https://garden-hub-three.vercel.app/share-tips", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, date: new Date() }),
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success("Tip shared successfully!");
        // console.log(data);

        e.target.reset();
        setImagePreview("");
      })
      .catch(() => toast.error("Failed to share tip."));
  };

  return (
    <>
      <PageTitle title="Share Tips" />
      <section className="min-h-screen bg-green-50 dark:bg-gray-900 flex items-center justify-center p-4">
        <div className="w-full max-w-screen-xl bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 md:p-10">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">Share Your Valuable Tips</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col lg:grid  gap-3 lg:gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
                <input
                  name="title"
                  type="text"
                  className="mt-1 w-full rounded-md p-2.5 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-700 focus:border-green-500 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Plant Type/Topic</label>
                <input
                  name="topic"
                  type="text"
                  className="mt-1 w-full rounded-md p-2.5 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-700 focus:border-green-500 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Difficulty Level</label>
                <select
                  name="difficulty"
                  className="mt-1 w-full rounded-md p-2.5 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-700 focus:border-green-500 focus:ring-green-500"
                >
                  <option value="">Select Difficulty</option>
                  <option>Easy</option>
                  <option>Medium</option>
                  <option>Hard</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
                <select
                  name="category"
                  className="mt-1 w-full rounded-md p-2.5 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-700 focus:border-green-500 focus:ring-green-500"
                >
                  <option value="">Select Category</option>
                  <option>Plant Care</option>
                  <option>Soil Tips</option>
                  <option>Watering</option>
                  <option>Fertilizing</option>
                </select>
              </div>

              <div className="col-span-1 lg:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Image URL</label>
                <input
                  name="imageUrl"
                  type="url"
                  onChange={handleImageUrlChange}
                  className="mt-1 w-full rounded-md p-2.5 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-700 focus:border-green-500 focus:ring-green-500"
                />
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    onError={() => setImagePreview("")}
                    className="mt-2 h-24 w-24 rounded-md object-cover ring-2 ring-green-500"
                  />
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
                <textarea
                  name="description"
                  rows="4"
                  className="mt-1 w-full rounded-md p-2.5 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-700 focus:border-green-500 focus:ring-green-500"
                ></textarea>
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Availability</label>
                <select
                  name="availability"
                  className="mt-1 w-full rounded-md p-2.5 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-700 focus:border-green-500 focus:ring-green-500"
                >
                  <option>Public</option>
                  <option>Hidden</option>
                </select>
              </div>
              <div className="col-span-2 ">
                <div className="flex items-center justify-between">
                  <p className=" dark:bg-gray-600 bg-gray-300 w-full h-[1px]"></p>
                  <h1 className="shrink-0 px-5 text-black dark:text-white text-[16px]">User Info</h1>
                  <p className=" dark:bg-gray-600 bg-gray-300 w-full h-[1px]"></p>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name (read-only)</label>
                <input
                  name="userName"
                  type="text"
                  readOnly
                  value={user && user.displayName}
                  className="mt-1 w-full rounded-md p-2.5 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 border-gray-300 dark:border-gray-700"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email (read-only)</label>
                <input
                  name="userEmail"
                  type="text"
                  readOnly
                  value={user && user.email}
                  className="mt-1 w-full rounded-md p-2.5 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 border-gray-300 dark:border-gray-700"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3.5 px-4 rounded-md shadow-md transition cursor-pointer"
            >
              Submit Tips
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default ShareTip;
