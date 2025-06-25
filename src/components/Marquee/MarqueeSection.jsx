import React from "react";
import MarqueeMain from "react-fast-marquee";

const MarqueeSection = () => {
  return (
    <>
      <MarqueeMain speed={50} className="bg-green-600 text-white py-3 md:py-5 text-base md:text-xl uppercase">
        🌱 Discover the best gardening tips, connect with expert gardeners, and grow your green space with us! | 🪴 New blog on Hydroponic Farming
        just dropped! | 🌼 Don’t miss our June Garden Tour – Book your spot now!
      </MarqueeMain>
    </>
  );
};

export default MarqueeSection;
