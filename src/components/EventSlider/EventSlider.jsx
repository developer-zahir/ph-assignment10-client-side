import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Calendar } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Fade, Slide } from "react-awesome-reveal";

// Sample garden events data
const events = [
  {
    id: 1,
    title: "Spring Planting Workshop",
    description: "Learn the best techniques for planting your spring garden with our expert gardeners.",
    date: "April 15, 2025",
    image: "https://images.pexels.com/photos/7728086/pexels-photo-7728086.jpeg?auto=compress&cs=tinysrgb&w=1600",
    buttonText: "Register Now",
  },
  {
    id: 2,
    title: "Urban Gardening Expo",
    description: "Discover innovative solutions for gardening in small spaces and urban environments.",
    date: "May 22, 2025",
    image: "https://images.pexels.com/photos/1105019/pexels-photo-1105019.jpeg?auto=compress&cs=tinysrgb&w=1600",
    buttonText: "Learn More",
  },
  {
    id: 3,
    title: "Sustainable Garden Tour",
    description: "Tour beautiful gardens that implement sustainable practices and eco-friendly solutions.",
    date: "June 8, 2025",
    image: "https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg?auto=compress&cs=tinysrgb&w=1600",
    buttonText: "Book Your Spot",
  },
];

const EventSlider = () => {
  return (
    <section className="py-15 md:py-17 dark:bg-gray-800 bg-green-50">
      <div className="max-w-screen-xl mx-auto px-2">
        <Slide direction="up" cascade triggerOnce>
          <h2 className="text-3xl md:font-bold text-black dark:text-white text-center ">Upcomming Garden Events</h2>
          <p className="text-center text-black dark:text-white mb-10 mt-3 text-lg">Discover the latest gardening events happening around the world.</p>
        </Slide>

        <div className="relative h-[400px] md:h-[500px] overflow-hidden rounded-xl">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000 }}
            loop={true}
            className="h-full"
          >
            {events.map((event) => (
              <SwiperSlide key={event.id}>
                {/* Slide Content */}
                <div className="relative h-full">
                  <div className="absolute inset-0 bg-black/40 z-10"></div>
                  <img src={event.image} alt={event.title} className="w-full h-full object-cover" />

                  <div className="absolute inset-0 z-20 flex items-center justify-center px-4 md:px-12">
                    <div className="text-center text-white max-w-3xl mx-auto">
                      <div className="flex items-center justify-center mb-4">
                        <Calendar className="h-5 w-5 mr-2" />
                        <span className="text-sm font-medium">{event.date}</span>
                      </div>
                      <h2 className="text-3xl md:text-4xl lg:text-5xl md:font-bold mb-4">{event.title}</h2>
                      <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">{event.description}</p>
                      <button className="btn-primary">{event.buttonText}</button>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default EventSlider;
