import { BookOpen, Share2, Users } from 'lucide-react';
import React from 'react';
import { Slide } from 'react-awesome-reveal';

const WhyOurCommunity = () => {
    return (
        <>
             <section className="py-16 bg-green-50 dark:bg-gray-800">
        <div className="mx-auto max-w-screen-xl px-4">
          {/*  Heading */}

          <div className="text-center mb-12">
            <Slide direction="up" cascade triggerOnce>
              <h2 className="text-3xl md:font-bold text-gray-800 dark:text-white mb-2">Why Join Our Community?</h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">Discover, connect, and grow with gardeners across the globe.</p>
            </Slide>
          </div>

          {/*  Feature cards  */}
          <Slide direction="up" cascade triggerOnce>
            <div className="grid gap-8 md:grid-cols-3">
              {/* 1. Expert Garden Tips */}
              <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-sm hover:shadow-md transition-all text-center">
                <div className="flex justify-center mb-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-500/20">
                    {/* lucide-react icon */}
                    <BookOpen className="h-8 w-8 text-green-500" />
                  </div>
                </div>
                <h3 className="mb-3 text-xl font-semibold text-gray-800 dark:text-white">Expert Garden Tips</h3>
                <p className="text-gray-600 dark:text-gray-200">
                  Access thousands of curated gardening tips from experienced gardeners around the world.
                </p>
              </div>

              {/* 2. Connect With Gardeners */}
              <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-sm hover:shadow-md transition-all text-center">
                <div className="flex justify-center mb-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-500/20">
                    <Users className="h-8 w-8 text-green-500" />
                  </div>
                </div>
                <h3 className="mb-3 text-xl font-semibold text-gray-800 dark:text-white">Connect With Gardeners</h3>
                <p className="text-gray-600 dark:text-gray-200">
                  Find and connect with local gardening enthusiasts who share your passion and interests.
                </p>
              </div>

              {/* 3. Share Your Knowledge */}
              <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-sm hover:shadow-md transition-all text-center">
                <div className="flex justify-center mb-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-500/20">
                    <Share2 className="h-8 w-8 text-green-500" />
                  </div>
                </div>
                <h3 className="mb-3 text-xl font-semibold text-gray-800 dark:text-white">Share Your Knowledge</h3>
                <p className="text-gray-600 dark:text-gray-200">
                  Contribute your own gardening tips and experiences to help others grow their green thumbs.
                </p>
              </div>
            </div>
          </Slide>
        </div>
      </section> 
        </>
    );
};

export default WhyOurCommunity;