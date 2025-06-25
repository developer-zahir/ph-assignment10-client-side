import { Filter, Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Fade } from "react-awesome-reveal";
import GardenerCard from "../../components/FeaturedGardeners/GardenerCard";
import CTASection from "../../components/CTASection/CTASection";
import PageTitle from "../../components/PageTitle/PageTitle";
import { AuthContent } from "../../contexts/Authcontext";
import NoData from "../../components/NoData/NoData";
import Loading from "../../components/Loading/Loading";

const AllGardeners = () => {
  const [loading, setLoading] = useState(true);
  const [gardeners, setGardeners] = useState([]);
  const [filteredGardeners, setFilteredGardeners] = useState([]); // New state for filtered data
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [experiences, setExperiences] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Fetch gardeners data
  useEffect(() => {
    fetch(`https://garden-hub-three.vercel.app/gardeners/?search=${search}`)
      .then((res) => res.json())
      .then((data) => {
        setGardeners(data.reverse());
        setFilteredGardeners(data.reverse()); // Initialize filtered data
        setCurrentPage(1);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [search]);

  // Apply client-side filtering based on status and experience
  useEffect(() => {
    let filteredData = [...gardeners];

    // Filter by status
    if (status !== "All") {
      filteredData = filteredData.filter((item) => item.status === status);
    }

    // Filter by experience
    if (experiences !== "All") {
      filteredData = filteredData.filter((item) => item.experiences === experiences);
    }

    setFilteredGardeners(filteredData);
    setCurrentPage(1); // Reset to first page when filters change
  }, [gardeners, status, experiences]);

  if (loading) {
    return <Loading />;
  }

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentGardeners = filteredGardeners.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredGardeners.length / itemsPerPage);

  return (
    <>
      <PageTitle title="Explore Gardeners" />

      <section className="py-15 md:py-17 bg-green-50 dark:bg-gray-900">
        <div className="max-w-screen-xl px-2 mx-auto">
          <Fade direction="up" triggerOnce>
            <h2 className="text-3xl md:text-4xl font-semibold md:font-bold text-center text-black dark:text-white">Explore Gardeners</h2>
            <p className="text-center mb-10 mt-3 md:text-xl dark:text-white">Discover the gardening community and connect with fellow enthusiasts.</p>
          </Fade>

          {/* Filter form */}
          <Fade direction="up" triggerOnce>
            <div className="filter mb-15 lg:mb-18">
              <div className="grid lg:grid-cols-2 gap-3 lg:gap-4.5">
                {/* Search box */}
                <div className="relative overflow-hidden">
                  <div className="absolute inset-y-0 top-4 lg:top-5 right-0 sm:right-auto sm:left-0 pr-3 lg:dark:bg-transparent lg:bg-transparent bg-green-100 dark:bg-gray-800 h-[15px] pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-neutral-400" />
                  </div>
                  <input
                    onChange={(e) => setSearch(e.target.value)}
                    type="text"
                    placeholder="Search gardeners by name or location..."
                    className="input-field pl-4 sm:pl-11 sm:pr-0 pr:10 bg-green-100 dark:bg-gray-800 text-black dark:text-gray-100 placeholder:text-black dark:placeholder:text-gray-300 px-4 py-[10px] lg:py-[11px] w-full rounded-lg border-2 border-gray-300 dark:border-gray-600 focus:border-green-600 focus:outline-0 lg:text-[17px]"
                  />
                </div>

                {/* Select box */}
                <div className="col-span-1">
                  <div className="wrapper grid sm:grid-cols-2 gap-3 sm:gap-4.5">
                    {/* Filter status */}
                    <div className="relative">
                      <select
                        id="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="appearance-none pr-8 select-field bg-green-100 dark:bg-gray-800 text-black dark:text-gray-100 px-4 py-[10px] lg:py-3 w-full rounded-lg border-2 border-gray-300 dark:border-gray-600 focus:border-green-600 focus:outline-0"
                      >
                        <option value="All">All Statuses</option>
                        <option value="Active">Active</option>
                        <option value="Regular">Regular</option>
                      </select>
                      <div className="absolute inset-y-0 right-1.5 flex items-center px-2 pointer-events-none">
                        <Filter className="h-4 w-4 text-neutral-500" />
                      </div>
                    </div>

                    {/* Filter experience */}
                    <div className="relative">
                      <select
                        id="experience"
                        value={experiences}
                        onChange={(e) => setExperiences(e.target.value)}
                        className="appearance-none pr-8 select-field bg-green-100 dark:bg-gray-800 text-black dark:text-gray-100 px-4 py-[10px] lg:py-3 w-full rounded-lg border-2 border-gray-300 dark:border-gray-600 focus:border-green-600 focus:outline-0"
                      >
                        <option value="All">All Experience Levels</option>
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                        <option value="Expert">Expert</option>
                      </select>
                      <div className="absolute inset-y-0 right-1.5 flex items-center px-2 pointer-events-none">
                        <Filter className="h-4 w-4 text-neutral-500" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Fade>

          {/* Gardeners cards */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {currentGardeners.length > 0 ? currentGardeners.map((gardener, index) => <GardenerCard key={index} gardener={gardener} />) : <NoData />}
          </div>

          {/* Pagination controls */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-10">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                className="px-4 py-2 mx-1 text-black bg-gray-300 hover:bg-green-700 hover:text-white rounded cursor-pointer"
                disabled={currentPage === 1}
              >
                Prev
              </button>
              {[...Array(totalPages).keys()].map((num) => (
                <button
                  key={num}
                  onClick={() => setCurrentPage(num + 1)}
                  className={`px-3 py-2 mx-1 rounded cursor-pointer ${
                    currentPage === num + 1 ? "bg-green-700 text-white" : "text-black bg-gray-300 hover:bg-green-700 hover:text-white"
                  }`}
                >
                  {num + 1}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                className="px-4 py-2 mx-1 text-black bg-gray-300 hover:bg-green-700 hover:text-white rounded cursor-pointer"
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </section>

      <CTASection
        title={"Ready to Level Up Your Gardening Game?"}
        cta={"Browse Pro Tips"}
        desc={"Explore our expert-curated pro tips to solve common gardening challenges, boost plant health, and make your garden thrive year-round."}
        link={"/all-tips"}
      />
    </>
  );
};

export default AllGardeners;
