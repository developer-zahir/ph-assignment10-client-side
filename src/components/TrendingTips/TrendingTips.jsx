import { Calendar, Eye, ThumbsUp, TrendingUp } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TipsCard from "./TipsCard";
import { Slide } from "react-awesome-reveal";

const TrendingTips = () => {
  const [trendingTips, setTrendingTips] = useState([]);
  useEffect(() => {
    fetch("https://garden-hub-three.vercel.app/all-tips")
      .then((res) => res.json())
      .then((data) => setTrendingTips(data));
  }, []);

  return (
    <>
      <section className="bg-white dark:bg-gray-900 py-10 md:py-17">
        <div className="max-w-screen-xl px-2 mx-auto">
          {/* section title  */}
          <Slide direction="up" cascade triggerOnce>
            <div className="title-section flex flex-col md:flex-row justify-between items-center">
              <div className="left">
                <h2 className="text-3xl md:font-bold flex gap-3 items-center dark:text-white flex-col md:flex-row">
                  {" "}
                  <TrendingUp className="text-green-600" size={40}></TrendingUp>
                  Top Trending Tips
                </h2>
              </div>
              <div className="right text-lg dark:text-white text-green-600 hover:underline pb-5 md:pb-0">
                <Link to="/all-tips" className=" text-sm md:text-lg ">
                  View All
                </Link>
              </div>
            </div>
          </Slide>
          {/* card wrapper  */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
            {" "}
            <Slide direction="up" triggerOnce>
              {trendingTips
                .slice(0, 6)
                .reverse()
                .map((tips) => {
                  return <TipsCard tips={tips}></TipsCard>;
                })}
            </Slide>
          </div>
        </div>
      </section>
    </>
  );
};

export default TrendingTips;
