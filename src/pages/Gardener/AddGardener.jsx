import React, { useState } from "react";
import { toast } from "react-toastify";
import PageTitle from "../../components/PageTitle/PageTitle";

const AddGardener = () => {
  const [imagePreview, setImagePreview] = useState("https://cdn-icons-png.flaticon.com/512/9187/9187604.png");

  // Handle Image URL input
  const handleFile = (e) => {
    const imageUrl = e.target.value;
    setImagePreview(imageUrl);
  };

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const allFields = Object.fromEntries(formData.entries());
    const { expertise, ...restFields } = allFields;

    // Basic Validation
    if (Object.values(restFields).some((v) => !v) || !expertise || isNaN(parseInt(restFields.totalSharedTips))) {
      toast.error("Please fill all fields correctly.");
      return;
    }

    if (!isNaN(expertise)) {
      toast.error("Expertise can't be a number.");
      return;
    }

    // Final Data Object
    const newGardener = {
      ...restFields,
      age: parseInt(restFields.age),
      totalSharedTips: parseInt(restFields.totalSharedTips),
      expertise: expertise.split(",").map((exp) => exp.trim()),
      profileImage: imagePreview || null,
    };

    // Send to server
    fetch("https://garden-hub-three.vercel.app/gardeners", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newGardener),
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success("Gardener profile saved!");
        e.target.reset();
        setImagePreview("https://cdn-icons-png.flaticon.com/512/9187/9187604.png");
      })
      .catch((err) => {
        toast.error("Failed to save profile.");
      });
  };

  return (
    <>
      <PageTitle title="Add Gardener" />
      <section className="min-h-screen bg-green-50 dark:bg-gray-900 flex items-center justify-center p-4">
        <div className="w-full max-w-screen-xl bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 md:p-10">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">Add Gardener Profile</h2>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                <input
                  name="name"
                  type="text"
                  required
                  className="mt-1 w-full rounded-md p-2.5 bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:border-green-500 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Age</label>
                <input
                  name="age"
                  type="number"
                  required
                  className="mt-1 w-full rounded-md p-2.5 bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:border-green-500 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Gender</label>
                <select
                  name="gender"
                  required
                  className="mt-1 w-full rounded-md p-2.5 bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:border-green-500 focus:ring-green-500"
                >
                  <option value="">Select gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
                <select
                  name="status"
                  required
                  className="mt-1 w-full rounded-md p-2.5 bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:border-green-500 focus:ring-green-500"
                >
                  <option value="">Select Status</option>
                  <option>Active</option>
                  <option>Regular</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Experiences</label>
                <select
                  name="experiences"
                  required
                  className="mt-1 w-full rounded-md p-2.5 bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:border-green-500 focus:ring-green-500"
                >
                  <option value="">Experiences level</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Expert">Expert</option>
                </select>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Expertise</label>
                <textarea
                  name="expertise"
                  rows="7"
                  placeholder="e.g., Planting, Fertilizing, Watering"
                  required
                  className="mt-1 w-full rounded-md p-2.5 bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:border-green-500 focus:ring-green-500"
                />
                <p className="text-xs text-red-400 ">Separate expertise with commas, such as: Planting, Fertilizing, Watering</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Total Shared Tips</label>
                <input
                  name="totalSharedTips"
                  type="number"
                  required
                  className="mt-1 w-full rounded-md p-2.5 bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:border-green-500 focus:ring-green-500"
                />
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Profile Image URL</label>
                <input
                  type="url"
                  name="imageUrl"
                  onChange={handleFile}
                  placeholder="Paste image URL"
                  className="mt-1 w-[85%] rounded-md p-2.5 bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:border-green-500 focus:ring-green-500"
                />
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    onError={() => setImagePreview(null)}
                    className="absolute right-0 top-2 mt-1 h-15 w-15 rounded-full object-cover ring-2 ring-green-500"
                  />
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3.5 px-4 rounded-md shadow-md transition cursor-pointer"
              >
                Save Gardener Profile
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default AddGardener;
