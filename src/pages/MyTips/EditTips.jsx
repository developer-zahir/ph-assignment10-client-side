import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContent } from "../../contexts/Authcontext";
import { ArrowLeft } from "lucide-react";
import { Tooltip } from "react-tooltip";
import PageTitle from "../../components/PageTitle/PageTitle";

const EditTips = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContent);

  const [tip, setTip] = useState({
    title: "",
    topic: "",
    difficulty: "",
    category: "",
    description: "",
    imageUrl: "",
    availability: "",
  });
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    fetch(`https://garden-hub-three.vercel.app/all-tips/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setTip(data); // Set the entire tip object
        setImagePreview(data.imageUrl || "");
      })
      .catch(() => toast.error("Failed to load tip"));
  }, [id]);

  // console.log("data", tip);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTip((prevTip) => ({
      ...prevTip,
      [name]: value,
    }));
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    if (!data.title || !data.topic || !data.difficulty || !data.category || !data.description) {
      toast.error("Please fill in all fields.");
      return;
    }

    fetch(`https://garden-hub-three.vercel.app/edit-tips/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast.success("Tip updated!");
          navigate("/my-tips");
        } else {
          toast.error("No changes made or tip not found.");
        }
      })
      .catch(() => toast.error("Failed to update tip"));
  };

  return (
    <>
      <PageTitle title="Edit Tips" />
      <section className="min-h-screen bg-green-50 dark:bg-gray-900 flex items-center justify-center px-2 py-17">
        <div className="w-full max-w-screen-xl bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 md:p-10">
          <h2 className="mb-6 text-gray-800 dark:text-gray-100 flex items-center">
            <ArrowLeft
              data-tooltip-id="goBack"
              data-tooltip-content="Go back"
              onClick={() => navigate(-1)}
              className="mr-1 inline-block hover:text-green-600 cursor-pointer"
            />
            <span className="text-2xl font-bold">Edit Tips</span>
            <Tooltip id="goBack" />
          </h2>

          <form onSubmit={handleUpdate} className="space-y-6">
            <div className="flex flex-col lg:grid gap-3 lg:gap-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
                <input
                  name="title"
                  type="text"
                  value={tip.title}
                  onChange={handleInputChange}
                  className="mt-1 w-full rounded-md p-2.5 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              {/* Topic */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Plant Type/Topic</label>
                <input
                  name="topic"
                  type="text"
                  value={tip.topic}
                  onChange={handleInputChange}
                  className="mt-1 w-full rounded-md p-2.5 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              {/* Difficulty */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Difficulty Level</label>
                <select
                  name="difficulty"
                  value={tip.difficulty}
                  onChange={handleInputChange}
                  className="mt-1 w-full rounded-md p-2.5 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="">Select Difficulty</option>
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
                <select
                  name="category"
                  value={tip.category}
                  onChange={handleInputChange}
                  className="mt-1 w-full rounded-md p-2.5 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="">Select Category</option>
                  <option value="Plant Care">Plant Care</option>
                  <option value="Soil Tips">Soil Tips</option>
                  <option value="Watering">Watering</option>
                  <option value="Fertilizing">Fertilizing</option>
                </select>
              </div>

              {/* Image URL */}
              <div className="col-span-1 lg:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Image URL</label>
                <input
                  name="imageUrl"
                  type="url"
                  value={tip.imageUrl}
                  onChange={(e) => {
                    handleInputChange(e);
                    setImagePreview(e.target.value);
                  }}
                  className="mt-1 w-full rounded-md p-2.5 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
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

              {/* Description */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
                <textarea
                  name="description"
                  rows="10"
                  value={tip.description}
                  onChange={handleInputChange}
                  className="mt-1 w-full rounded-md p-2.5 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                ></textarea>
              </div>

              {/* Availability */}
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Availability</label>
                <select
                  name="availability"
                  value={tip.availability}
                  onChange={handleInputChange}
                  className="mt-1 w-full rounded-md p-2.5 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="Public">Public</option>
                  <option value="Hidden">Hidden</option>
                </select>
              </div>

              {/* User Info */}
              <div className="col-span-2">
                <div className="flex items-center justify-between">
                  <p className="dark:bg-gray-600 bg-gray-300 w-full h-[1px]"></p>
                  <h1 className="shrink-0 px-5 text-black dark:text-white text-[16px]">User Info</h1>
                  <p className="dark:bg-gray-600 bg-gray-300 w-full h-[1px]"></p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name (read-only)</label>
                <input
                  readOnly
                  value={user?.displayName || ""}
                  className="mt-1 w-full rounded-md p-2.5 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email (read-only)</label>
                <input
                  readOnly
                  value={user?.email || ""}
                  className="mt-1 w-full rounded-md p-2.5 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full cursor-pointer bg-green-600 hover:bg-green-700 text-white font-semibold py-3.5 px-4 rounded-md shadow-md"
            >
              Update Tip
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default EditTips;
