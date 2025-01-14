import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaCalendarWeek } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function HeroSection04() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false); // New loading state
  const postsPerPage = 6; // Number of posts per page
  const FALLBACK_IMAGE = "https://via.placeholder.com/120";

  const extractCategory = (htmlString) => {
    if (!htmlString) return "Uncategorized";
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlString;
    const anchorTag = tempDiv.querySelector("a");
    return anchorTag ? anchorTag.textContent.trim() : "Uncategorized";
  };

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true); // Set loading to true before fetching
      try {
        const response = await fetch(
          `${
            import.meta.env.VITE_API_URL
          }/posts?per_page=${postsPerPage}&page=${currentPage}`
        );
        const data = await response.json();
        const totalPosts = response.headers.get("X-WP-TotalPages") || 1;
        setPosts(data);
        setTotalPages(Number(totalPosts));
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchPosts();
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <section className="mt-16 px-4 lg:px-0">
      {/* Heading */}
      <motion.h2
        className="text-lg text-gray-700 flex gap-2 items-center mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, ease: "backOut" }}
          className="bg-sky-500 rounded-sm text-white px-3 py-1"
        >
          All Blogs
        </motion.span>
      </motion.h2>

      {/* Grid Layout */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {loading ? (
          <div className="flex justify-center h-[70vh] w-full items-center my-6">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : posts.length > 0 ? (
          posts.map((post, index) => {
            return (
              <Link
                to={`/category/${extractCategory(post?.rttpg_category)}/${
                  post.slug
                }`}
                key={index}
              >
                <motion.div
                  className="flex flex-col lg:flex-row items-center lg:items-start border p-2 bg-white shadow-md rounded-md justify-between gap-4 w-full"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.2, // Stagger animation for each post
                  }}
                  viewport={{ once: true }}
                >
                  {/* Image */}
                  <div className="lg:w-[266px] lg:h-[180px] w-full border rounded-lg h-48 bg-gray-300">
                    <img
                      src={
                        post?.rttpg_featured_image_url?.full?.[0] ||
                        FALLBACK_IMAGE
                      }
                      alt={post.title.rendered}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>

                  {/* Content */}
                  <div className="lg:w-[400px] w-full">
                    {/* Category */}
                    <p className="text-[0.6rem] bg-gray-50 px-3 py-1 w-fit rounded-lg">
                      {extractCategory(post?.rttpg_category)}
                    </p>
                    {/* Title */}
                    <h2 className="text-[1rem] text-gray-700 font-semibold my-2">
                      {post.title.rendered}
                    </h2>
                    {/* Publish Date */}
                    <div className="text-gray-500 text-xs flex gap-2 items-center mb-2">
                      <FaCalendarWeek />{" "}
                      {new Date(post.date).toLocaleDateString()}
                    </div>
                    {/* Excerpt */}
                    <p className="text-gray-600 text-[0.8rem]">
                      {post.excerpt.rendered.length > 180
                        ? `${post.excerpt.rendered.slice(0, 180)}...`
                        : post.excerpt.rendered}
                    </p>
                  </div>
                </motion.div>
              </Link>
            );
          })
        ) : (
          <div className="flex justify-center h-[70vh] items-center my-6">
            <div className="text-gray-600">No posts available</div>
          </div>
        )}
      </motion.div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-8 gap-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1 || loading}
          className={`px-4 py-2 bg-sky-500 text-white rounded-md ${
            currentPage === 1 || loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          aria-label="Previous Page"
        >
          Previous
        </button>
        <span className="text-gray-700 font-semibold">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages || loading}
          className={`px-4 py-2 bg-sky-500 text-white rounded-md ${
            currentPage === totalPages || loading
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
          aria-label="Next Page"
        >
          Next
        </button>
      </div>
    </section>
  );
}
