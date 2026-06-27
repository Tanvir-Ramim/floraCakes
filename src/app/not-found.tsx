"use client";

import Image from "next/image";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-b from-white
     via-black/20 to-gray/80 -500 text-white">
      <div className="text-center px-6 md:px-12">
        {/* Animated Image */}
        <div className="relative inline-block mb-6">
          <Image
            src="/notfound.jpg"
            alt="Under Construction"
            width={400}
            height={400}
            className="mx-auto w-64 h-64 object-cover rounded-full shadow-2xl border-4 border-white animate-bounce-slow"
          />
          <div className="absolute -top-4 -right-4 w-16 h-16 bg-yellow-300 rounded-full flex items-center justify-center shadow-lg animate-pulse">
            🚧
          </div>
        </div>

        {/* Title */}
        <h1 className="text-5xl md:text-7xl font-extrabold mb-4 drop-shadow-lg">
          Page Under Construction
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-2xl font-medium mb-6 opacity-90">
          We’re busy building something amazing for you. Please check back soon!
        </p>

        {/* Action Button */}
        <button
          onClick={() => window.history.back()}
          className="mt-4 bg-white cursor cursor-pointer text-purple-600 px-8 py-3 rounded-full shadow-md font-semibold text-lg hover:bg-gray-200 transition duration-300 transform hover:scale-105"
        >
          Go Back
        </button>

        {/* Decorative Elements */}
        <div className="mt-12 flex items-center justify-center space-x-4">
          <div className="w-8 h-8 bg-yellow-500 rounded-full shadow-md animate-bounce"></div>
          <div className="w-10 h-10 bg-pink-500 rounded-full shadow-md animate-bounce delay-150"></div>
          <div className="w-12 h-12 bg-purple-500 rounded-full shadow-md animate-bounce delay-300"></div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
