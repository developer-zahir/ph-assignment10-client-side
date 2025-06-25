import React from "react";
import Loading from "../Loading/Loading";
import TypewriterComponent from "typewriter-effect";
import { Slide } from "react-awesome-reveal";
import hero from "/hero.webp";
import { Link } from "react-router-dom";
const Banner = () => {
  return (
    <section className="bg-white dark:bg-gray-900 overflow-hidden">
      <div className="mx-auto max-w-screen-xl flex items-center lg:gap-12 h-[55vh] lg:h-[70vh] px-2">
        {" "}
        <div className="order-2 lg:order-1 flex-1 text-left">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl text-wrap font-semibold leading-12 md:leading-18 text-slate-900 dark:text-white">
            Where&nbsp;Garden
            <br className="inline sm:hidden lg:inline" />
            Enthusiasts
            <span id="typewriter" className="block text-green-600 dark:text-green-500">
              <TypewriterComponent
                options={{
                  strings: ["Grow", "Connect", "Inspire"],
                  autoStart: true,
                  loop: true,
                }}
              />
            </span>
          </h1>

          <p className="mt-6  text-lg text-slate-600 dark:text-slate-400 md:pr-50 lg:pr-0">
            Join our community of passionate gardeners to share knowledge, find local gardening enthusiasts, and grow your skills with expert tips.
          </p>

          <div className="mt-10 flex  flex-row  justify-start gap-4 ">
            <Link
              to="/register"
              className="inline-flex items-center justify-center rounded-md bg-green-600 px-4 md:px-6 py-2.5 md:py-3 text-base font-semibold text-white shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-950 transition"
            >
              Join Our Community
            </Link>

            <Link
              to="/all-gardeners"
              className=" hidden sm:inline-flex items-center justify-center rounded-md border border-green-600 px-6 py-3 text-base font-semibold text-green-600 hover:bg-green-50 dark:text-green-500 dark:border-green-500 dark:hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-950 transition"
            >
              Explore Garden Tips
            </Link>
          </div>
        </div>
        <div className="hidden lg:block order-1 lg:order-2 mb-12 lg:mb-0 flex-1 items-end justify-end ">
          <img src={hero} className="w-6/7 ml-auto rounded-lg shadow-lg ring-1 ring-gray-900/10 dark:ring-white/10" />
        </div>
      </div>
    </section>
  );
};

export default Banner;
