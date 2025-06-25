import { Captions, Filter, Grid2x2, Search, TableProperties } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Fade, Slide } from "react-awesome-reveal";
import TipsCard from "../../components/TrendingTips/TipsCard";
import CTASection from "../../components/CTASection/CTASection";
import PageTitle from "../../components/PageTitle/PageTitle";
import { AuthContent } from "../../contexts/Authcontext";
import NoData from "../../components/NoData/NoData";
import Loading from "../../components/Loading/Loading";
import { Tooltip } from "react-tooltip";
import TipsTable from "../../components/TrendingTips/TipsTable";

const AllTips = () => {
  const [loading, setLoading] = useState(true);
  const [tipsData, setTipsData] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredTips, setFilteredTips] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTips = filteredTips.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredTips.length / itemsPerPage);

  // Layout switcher function
  const [layout, setLayout] = useState(() => {
    return localStorage.getItem("layout") || "table";
  });

  const handleLayoutChange = (selectedLayout) => {
    setLayout(selectedLayout === "table" ? "table" : "grid");
  };

  useEffect(() => {
    localStorage.setItem("layout", layout);
  }, [layout]);

  // Fetch tips data
  useEffect(() => {
    fetch(`https://garden-hub-three.vercel.app/all-tips?search=${search}`)
      .then((res) => res.json())
      .then((data) => {
        // Filter public tips
        const publicTips = data.filter((tip) => tip.availability === "Public");
        setTipsData(publicTips);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [search]);

  // frontend filter
  const [difficulty, setDifficulty] = useState("All");
  const [category, setCategory] = useState("All");
  useEffect(() => {
    let filtered = [...tipsData];

    // Filter by difficulty
    if (difficulty !== "All") {
      filtered = filtered.filter((tip) => tip.difficulty === difficulty);
    }

    // Filter by category
    if (category !== "All") {
      filtered = filtered.filter((tip) => tip.category === category);
    }

    setFilteredTips(filtered);
    setCurrentPage(1);
  }, [tipsData, difficulty, category]);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <PageTitle title="Browse Tips"></PageTitle>

      <section className="py-15 md:py-17 bg-green-50 dark:bg-gray-900">
        <div className="max-w-screen-xl px-2 mx-auto">
          <Fade direction="up" triggerOnce>
            <h2 className="text-3xl md:text-4xl font-semibold md:font-bold text-center text-black dark:text-white">Browse Garden Tips</h2>
            <p className="text-center mb-10 mt-3 md:text-xl dark:text-white">Browse garden tips from experienced gardeners around the world.</p>
          </Fade>

          {/* Filter form */}
          <Fade direction="up" triggerOnce>
            <form className="filter mb-5" onSubmit={(e) => e.preventDefault()}>
              <div className="grid lg:grid-cols-2 gap-3 lg:gap-4.5">
                {/* Search box */}
                <div className="relative overflow-hidden">
                  <div className="absolute inset-y-0 top-4 lg:top-5 right-0 sm:right-auto sm:left-0 pr-3 lg:dark:bg-transparent lg:bg-transparent bg-green-100 dark:bg-gray-800 h-[15px] pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-neutral-400" />
                  </div>
                  <input
                    onChange={(e) => {
                      setSearch(e.target.value);
                    }}
                    type="text"
                    placeholder="Search tips by name or category..."
                    className="input-field pl-4 sm:pl-11 sm:pr-0 pr:10 bg-green-100 dark:bg-gray-800 text-black dark:text-gray-100 placeholder:text-black dark:placeholder:text-gray-300 px-4 py-[10px] lg:py-[11px] w-full rounded-lg border-2 border-gray-300 dark:border-gray-600 focus:border-green-600 focus:outline-0 lg:text-[17px]"
                  />
                </div>

                {/* Filter options */}
                <div className="col-span-1">
                  <div className="wrapper grid sm:grid-cols-2 gap-3 sm:gap-4.5">
                    {/* Filter difficulty */}
                    <div className="relative">
                      <select
                        id="difficulties"
                        value={difficulty}
                        onChange={(e) => setDifficulty(e.target.value)}
                        className="appearance-none pr-8 select-field bg-green-100 dark:bg-gray-800 text-black dark:text-gray-100 px-4 py-[10px] lg:py-3 w-full rounded-lg border-2 border-gray-300 dark:border-gray-600 focus:border-green-600 focus:outline-0"
                      >
                        <option value="All">All Difficulties</option>
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                      </select>
                      <div className="absolute inset-y-0 right-1.5 flex items-center px-2 pointer-events-none">
                        <Filter className="h-4 w-4 text-neutral-500" />
                      </div>
                    </div>

                    {/* Filter category */}
                    <div className="relative">
                      <select
                        id="categories"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="appearance-none pr-8 select-field bg-green-100 dark:bg-gray-800 text-black dark:text-gray-100 px-4 py-[10px] lg:py-3 w-full rounded-lg border-2 border-gray-300 dark:border-gray-600 focus:border-green-600 focus:outline-0"
                      >
                        <option value="All">All Categories</option>
                        <option value="Plant Care">Plant Care</option>
                        <option value="Soil Tips">Soil Tips</option>
                        <option value="Watering">Watering</option>
                        <option value="Fertilizing">Fertilizing</option>
                      </select>
                      <div className="absolute inset-y-0 right-1.5 flex items-center px-2 pointer-events-none">
                        <Filter className="h-4 w-4 text-neutral-500" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </Fade>

          {/* Layout switcher */}
          <Slide direction="up" triggerOnce>
            <div className="layout-switcher flex justify-between mb-10">
              <div className="left">
                <p className="text-black dark:text-white flex gap-2">
                  <Captions /> Total Tips: {filteredTips.length}
                </p>
              </div>
              <div className="right">
                <p className="text-black dark:text-white flex items-center gap-2">
                  Layout:
                  <button
                    className={`hover:text-green-600 cursor-pointer ${layout === "table" ? "text-green-600" : ""}`}
                    onClick={() => handleLayoutChange("table")}
                    data-tooltip-id="tableView"
                    data-tooltip-content="Table view"
                  >
                    <Tooltip id="tableView" />
                    <TableProperties size={22} />
                  </button>
                  <button
                    className={`hover:text-green-600 cursor-pointer ${layout === "grid" ? "text-green-600" : ""}`}
                    onClick={() => handleLayoutChange("grid")}
                    data-tooltip-id="gridView"
                    data-tooltip-content="Grid view"
                  >
                    <Grid2x2 size={22} />
                    <Tooltip id="gridView" />
                  </button>
                </p>
              </div>
            </div>
          </Slide>

          {/* Tips display */}
          <Fade direction="up" triggerOnce>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {currentTips.length > 0 ? (
                layout === "table" ? (
                  <TipsTable currentTips={currentTips} />
                ) : (
                  currentTips.reverse().map((tips) => <TipsCard key={tips._id} tips={tips} />)
                )
              ) : (
                <NoData />
              )}
            </div>
          </Fade>

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

      {/* CTA */}
      <CTASection
        title={"Explore our community active gardeners"}
        cta={"Explore Gardeners"}
        desc={
          "We believe in a thriving community of gardeners who share their knowledge and experiences. Join our community today and connect with like-minded individuals who are passionate about gardening."
        }
        link={"/all-gardeners"}
      />
    </>
  );
};

export default AllTips;
