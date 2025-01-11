import React, { useState } from "react";
import { FaBloggerB } from "react-icons/fa";
import { FiHome, FiSearch } from "react-icons/fi";
import { RiContactsBook2Fill } from "react-icons/ri";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners"; // Import spinner component

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Mobile menu state
  const [isSearchOpen, setIsSearchOpen] = useState(false); // Search overlay state
  const [searchQuery, setSearchQuery] = useState(""); // Search input state
  const [searchResults, setSearchResults] = useState([]); // Store search results
  const [loading, setLoading] = useState(false); // Loading state
  const { pathname } = useLocation(); // Current route
  const navigate = useNavigate(); // Navigation handler

  const menuItems = [
    { label: "Home", link: "/", icon: <FiHome /> },
    { label: "Blog", link: "/blog-page", icon: <FaBloggerB /> },
    { label: "Contact Us", link: "/contact-us", icon: <RiContactsBook2Fill /> },
  ];

  const handleSearch = async (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (query) {
      setLoading(true); // Start loading
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/posts?search=${query}`
        );
        const data = await response.json();
        setSearchResults(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setSearchResults([]);
      } finally {
        setLoading(false); // Stop loading
      }
    } else {
      setSearchResults([]);
      setLoading(false); // Stop loading when query is empty
    }
  };

  const handleClickPost = (postId) => {
    navigate(`/post/${postId}`);
    setIsSearchOpen(false); // Close search overlay
  };

  return (
    <>
      {/* Navbar */}
      <nav className="px-6 flex items-center justify-between md:px-[10%] w-full sticky top-0 border-b shadow-md bg-white z-50">
        <div className="flex justify-between items-center py-4 w-full">
          {/* Logo */}
          <Link to="/" className="underline-none">
            <h1 className="text-2xl font-bold text-blue-500">
              Poly<span className="text-violet-400">Techub</span>
            </h1>
          </Link>

          {/* Actions: Mobile Search & Menu Toggle */}
          <div className="flex items-center gap-4 md:hidden">
            {/* Search Button (Mobile Only) */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="text-gray-700 hover:text-blue-600 flex items-center gap-2"
            >
              <FiSearch size={20} />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              className="text-gray-700"
              onClick={() => setIsMenuOpen((prev) => !prev)}
            >
              {isMenuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center justify-between w-full">
          <ul className="flex items-center gap-10">
            {menuItems.map(({ icon, link, label }, idx) => (
              <li key={idx}>
                <Link
                  to={link}
                  className={`flex gap-2 items-center text-lg font-semibold ${
                    pathname === link
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-700"
                  } hover:text-blue-600`}
                >
                  {icon} {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="hidden md:flex items-center justify-center w-full">
          <div className="relative w-[420px]">
            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-gray-100 border-none outline-none text-gray-700 px-4 py-2 rounded-lg"
              value={searchQuery}
              onChange={handleSearch}
            />
            <FiSearch
              className="absolute top-2 right-3 text-gray-600"
              size={20}
            />

            {/* Show loading spinner when fetching data */}
            {loading && (
              <div className="absolute top-10 left-16 text-gray-600">
                <ClipLoader size={20} color="#666" />
              </div>
            )}

            {searchQuery && searchResults.length > 0 && !loading && (
              <div className="bg-white absolute shadow-md mt-2 p-2 rounded-lg max-h-60 overflow-y-auto">
                <ul>
                  {searchResults.map((post) => (
                    <Link to={`/blog-page/${post.slug}`}>
                      <li
                        key={post.id}
                        className="py-2 px-4 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          handleClickPost(post.id);
                          setSearchQuery("");
                        }}
                      >
                        {post.title.rendered}
                      </li>
                    </Link>
                  ))}
                </ul>
              </div>
            )}

            {/* If no results */}
            {searchQuery && !loading && searchResults.length === 0 && (
              <div className="bg-white absolute shadow-md mt-2 p-2 rounded-lg max-h-60 overflow-y-auto">
                <p className="text-gray-500 p-4">No results found.</p>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 bg-white z-40 p-6">
          <ul className="flex flex-col gap-6">
            {menuItems.map(({ icon, link, label }, idx) => (
              <li key={idx}>
                <Link
                  to={link}
                  onClick={() => setIsMenuOpen(false)} // Close menu on link click
                  className={`flex gap-2 items-center text-lg font-semibold ${
                    pathname === link
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-700"
                  } hover:text-blue-600`}
                >
                  {icon} {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Search Overlay (Mobile Only) */}
      {isSearchOpen && (
        <div className="fixed w-full md:hidden inset-0 top-0 bg-black bg-opacity-50 z-50 ">
          <div className="p-4 rounded-lg shadow-md w-full max-w-md relative">
            <button
              onClick={() => setIsSearchOpen(false)}
              className="absolute top-6 right-6 text-gray-600"
            >
              ✕
            </button>
            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-gray-100 border-none outline-none text-gray-700 p-2 rounded-lg"
              value={searchQuery}
              onChange={handleSearch}
            />
            {loading && (
              <div className="absolute top-2 left-16 text-gray-600">
                <ClipLoader size={20} color="#666" />
              </div>
            )}
            {searchQuery && searchResults.length > 0 && !loading && (
              <div className="bg-white shadow-md mt-2 p-2 rounded-lg max-h-60 overflow-y-auto">
                <ul>
                  {searchResults.map((post) => (
                    <Link to={`/blog-page/${post.slug}`}>
                      <li
                        key={post.id}
                        className="py-2 px-4 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleClickPost(post.id)}
                      >
                        {post.title.rendered}
                      </li>
                    </Link>
                  ))}
                </ul>
              </div>
            )}
            {searchQuery && !loading && searchResults.length === 0 && (
              <div className="bg-white shadow-md mt-2 p-2 rounded-lg max-h-60 overflow-y-auto">
                <p className="text-gray-500 p-4">No results found.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
