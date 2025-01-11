import React from "react";

import { FiArrowLeft } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function Error() {
  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="text-center p-8 bg-white rounded-lg shadow-xl transform transition duration-500 ease-in-out scale-95 opacity-0 animate-fadeIn">
          <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
          <p className="text-lg text-gray-600 mb-6">
            Oops! The page you're looking for cannot be found.
          </p>
          <p className="text-sm text-gray-400">
            Please check the URL or go back to the homepage.
          </p>
          <div className="flex justify-center">
            <Link to={"/"}>
              <button className="flex text-sm items-center gap-3 bg-gray-500 mt-2  py-2 px-6 rounded-lg text-white">
                <FiArrowLeft /> Back to Home
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
