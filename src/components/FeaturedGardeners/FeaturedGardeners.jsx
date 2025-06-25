import React, { useEffect, useState } from "react";
import GardenerCard from "./GardenerCard";
import { TrendingUp, User, User2, UserCheck2Icon } from "lucide-react";
import { Link } from "react-router-dom";
import Marquee from "react-fast-marquee";
import { Slide } from "react-awesome-reveal";

const FeaturedGardeners = () => {
  const [gardeners, setGardeners] = useState([]);

  useEffect(() => {
    fetch("https://garden-hub-three.vercel.app/gardeners")
      .then((res) => res.json())
      .then((data) => {
        const activeGardeners = data.filter((item) => item.status === "Active").reverse();
        setGardeners(activeGardeners);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  return (
    <>
      <section className="bg-green-50 dark:bg-gray-900 py-15 md:py-17 overflow-hidden">
        <div className="max-w-screen-xl px-2  mx-auto">
          <Slide direction="up" cascade triggerOnce>
            {/* section title  */}
            <div className="title-section flex flex-col md:flex-row justify-between items-center mb-10">
              <div className="left">
                <h2 className="text-3xl md:font-bold flex gap-3 items-center dark:text-white flex-col md:flex-row">
                  <UserCheck2Icon className="text-green-600" size={40}></UserCheck2Icon>
                  Featured Gardeners
                </h2>
              </div>
              <div className="right text-lg dark:text-white text-green-600 hover:underline">
                <Link to="/all-gardeners" className=" text-sm md:text-lg">
                  View All
                </Link>
              </div>
            </div>
          </Slide>
          {/* card wrapper  */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-between ">
            {gardeners.slice(0, 6).map((gardener) => (
              <GardenerCard key={gardener.name} gardener={gardener} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default FeaturedGardeners;
