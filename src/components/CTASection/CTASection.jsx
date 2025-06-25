import React from "react";
import { Slide } from "react-awesome-reveal";
import { Link } from "react-router-dom";
import ctaBg from "/ctaBg.jpg";

const CTASection = ({desc, cta,title, link}) => {
  return (
    <section
      className="relative py-25 bg-cover bg-center text-white"
      style={{
         backgroundImage: `url(${ctaBg})`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40"></div>

      {/* Content */}
      <div className="relative container mx-auto px-4 text-center">
         <Slide direction="up" cascade triggerOnce>
        <h2 className="text-3xl md:text-4xl md:font-bold mb-4">{title}</h2>
        <p className="md:text-xl max-w-2xl mx-auto mb-8">
          {desc}
        </p>
        <div className="flex flex-wrap justify-center gap-4 items-center">
          <Link
            to={link}
            className="inline-flex items-center justify-center rounded-md bg-green-600 px-4 md:px-6 py-2.5 md:py-3 text-base md:font-semibold text-white shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-950 transition"
          >
           {cta}
          </Link>
        </div>
        </Slide>
      </div>
    </section>
  );
};

export default CTASection;
