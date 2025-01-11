import React from "react";
import { BsGlobe } from "react-icons/bs";
import { FaBitcoin, FaRobot } from "react-icons/fa";
import { ImBlogger } from "react-icons/im";
import { SiHiveBlockchain } from "react-icons/si";
import { Link } from "react-router-dom";

export default function HeroSection02() {
  const exploreItems = [
    {
      name: "Artificial Intelligence",
      link: "/category/artificial-intelligence",
      icon: <FaRobot className="text-violet-600 animate-bounce" />,
    },
    {
      name: "Blockchain",
      link: "/category/blockchain",
      icon: <SiHiveBlockchain className="text-yellow-500 animate-bounce" />,
    },
    {
      name: "Blog",
      link: "/blog-page",
      icon: <ImBlogger className="text-orange-500 animate-bounce " />,
    },
    {
      name: "Bitcoin",
      link: "/category/bitcoin",
      icon: <FaBitcoin className="text-yellow-500 animate-bounce" />,
    },
    {
      name: "WEB 3.O",
      link: "/category/web-3-0",
      icon: <BsGlobe className="text-blue-500 animate-bounce" />,
    },
  ];

  return (
    <div className="w-full">
      <p className="text-gray-500 font-semibold text-sm text-center">
        Explore Trending Topics
      </p>
      <div className="flex items-center  justify-center lg:h-[15vh] md:h-[30vh] h-fit  flex-wrap md:gap-8 gap-4 mx-auto w-full mt-5">
        {/* Dynamically render the links */}
        {exploreItems.map((item, index) => (
          <Link
            key={index}
            to={item.link}
            className="flex gap-4 w-[360px] text-sky-500 hover:bg-sky-500 hover:text-white duration-300 bg-violet-100 shadow-lg  rounded-full text-xl font-semibold items-center py-2  sm:px-16 sm:py-2 justify-center"
          >
            {item.icon}
            <span className="text-sm sm:text-lg">{item.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
