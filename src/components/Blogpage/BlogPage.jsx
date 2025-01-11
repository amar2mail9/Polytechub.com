import React, { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import { motion } from "framer-motion"; // Import Framer Motion
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [latestPosts, setLatestPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); // Total number of pages for pagination
  const [loading, setLoading] = useState(false);

  const postsPerPage = 6; // Number of posts per page

  useEffect(() => {
    fetchBlogs(currentPage);
    fetchCategories();
    fetchLatestPosts();
  }, [currentPage]);

  const fetchBlogs = async (page) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/posts?per_page=${postsPerPage}&page=${page}`
      );
      const totalPosts = response.headers.get("X-WP-TotalPages"); // Get total pages
      if (response.ok) {
        const data = await response.json();
        setBlogs(data);
        setTotalPages(Number(totalPosts));
      } else {
        console.error("Error fetching posts");
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
    setLoading(false);
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/categories`
      );
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchLatestPosts = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/posts?per_page=3`
      );
      const data = await response.json();
      setLatestPosts(data);
    } catch (error) {
      console.error("Error fetching latest posts:", error);
    }
  };

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <>
      <Helmet>
        <title>Blog</title>
      </Helmet>{" "}
      <Layout>
        <div className="px-[10%] mx-auto  py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {/* Left Section: All Blogs */}
            <div className="md:col-span-2">
              <h1 className="text-3xl font-bold mb-6">All Blogs</h1>
              {loading ? (
                <div className="flex justify-center h-[70vh] items-center my-6">
                  <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : (
                <motion.div
                  className="grid grid-cols-1  gap-6 "
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: { opacity: 0, scale: 0.8 },
                    visible: {
                      opacity: 1,
                      scale: 1,
                      transition: { duration: 0.5, staggerChildren: 0.1 },
                    },
                  }}
                >
                  {blogs.map((blog, id) => (
                    <div key={id} className="px-6">
                      <Link to={`/blog-page/${blog.slug}`}>
                        <motion.div
                          className="bg-white shadow-md block md:hidden rounded-lg overflow-hidden hover:shadow-lg transition"
                          whileHover={{ scale: 1.05 }}
                        >
                          <img
                            src={blog?.rttpg_featured_image_url?.full?.[0]}
                            alt={blog.title.rendered}
                            className="w-full h-48 object-cover"
                          />
                          <div className="p-4">
                            <Link to={`/blog-page/${blog.slug}`}>
                              <h3 className="text-[1rem] font-semibold">
                                {blog.title?.rendered?.length > 60
                                  ? `${blog.title?.rendered.slice(0, 60)}...`
                                  : blog.title?.rendered || "Untitled Post"}
                              </h3>
                            </Link>
                            <div
                              dangerouslySetInnerHTML={{
                                __html: blog.excerpt?.rendered
                                  ? blog.excerpt?.rendered.length > 180
                                    ? `${blog.excerpt?.rendered.slice(
                                        0,
                                        180
                                      )}[...]`
                                    : blog.excerpt?.rendered
                                  : "No excerpt available",
                              }}
                            />
                            <Link
                              to={`/blog-page/${blog.slug}`}
                              className="text-blue-500 mt-2 inline-block hover:text-orange-400"
                            >
                              Read More
                            </Link>
                          </div>
                        </motion.div>
                      </Link>

                      {/* large Screen */}
                      <Link to={`/blog-page/${blog.slug}`}>
                        <motion.div
                          className="bg-white shadow-md hidden md:grid  rounded-lg overflow-hidden hover:shadow-lg transition"
                          whileHover={{ scale: 1.05 }}
                        >
                          <div className="flex  items-center gap-2 rounded-md p-4 ">
                            <img
                              src={blog?.rttpg_featured_image_url?.full?.[0]}
                              alt={blog.title.rendered}
                              className="w-48 h-48 object-cover rounded-full"
                            />

                            <div className="">
                              <div className="px-4">
                                <Link to={`/blog-page/${blog.slug}`}>
                                  <h3 className="text-[1.5rem] font-semibold">
                                    {blog.title?.rendered?.length > 60
                                      ? `${blog.title?.rendered.slice(
                                          0,
                                          60
                                        )}...`
                                      : blog.title?.rendered || "Untitled Post"}
                                  </h3>
                                </Link>
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html: blog.excerpt?.rendered
                                      ? blog.excerpt?.rendered.length > 180
                                        ? `${blog.excerpt?.rendered.slice(
                                            0,
                                            180
                                          )}[...]`
                                        : blog.excerpt?.rendered
                                      : "No excerpt available",
                                  }}
                                />
                                <Link
                                  to={`/blog-page/${blog.slug}`}
                                  className="text-blue-500 mt-2 inline-block "
                                >
                                  Read More
                                </Link>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      </Link>
                    </div>
                  ))}
                </motion.div>
              )}

              {/* Pagination */}
              <div className="flex justify-center mt-8">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  className={`px-4 py-2 mx-1 rounded bg-gray-200 hover:bg-gray-300 ${
                    currentPage === 1 ? "cursor-not-allowed opacity-50" : ""
                  }`}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => handlePageChange(index + 1)}
                    className={`px-4 py-2 mx-1 rounded ${
                      currentPage === index + 1
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 hover:bg-gray-300"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  className={`px-4 py-2 mx-1 rounded bg-gray-200 hover:bg-gray-300 ${
                    currentPage === totalPages
                      ? "cursor-not-allowed opacity-50"
                      : ""
                  }`}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            </div>

            {/* Right Section: Latest Posts and Categories */}
            <div>
              {/* Latest Posts */}

              <motion.div
                className="mb-8 "
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0, transition: { duration: 0.5 } }}
              >
                <h2 className="text-2xl font-bold mb-4">Latest Posts</h2>
                <div className="space-y-4">
                  {latestPosts.map((post) => (
                    <Link to={`/blog-page/${post.slug}`}>
                      <motion.div
                        key={post.id}
                        className="p-3 bg-white mb-4 shadow-md rounded-lg hover:shadow-lg transition"
                        whileHover={{ scale: 1.05 }}
                      >
                        <img
                          src={post.rttpg_featured_image_url?.full?.[0]}
                          alt={post.title.rendered}
                          className="w-48 h-48 mx-auto object-center object-cover rounded-lg mb-2"
                        />
                        <Link>
                          <h3 className="text-lg font-semibold text-blue-600 ">
                            {post.title.rendered}
                          </h3>
                        </Link>
                        <Link
                          to={`/blog-page/${post.slug}`}
                          className="text-blue-500 mt-1 inline-block cursor-pointer"
                        >
                          Read More
                        </Link>
                      </motion.div>
                    </Link>
                  ))}
                </div>
              </motion.div>

              {/* Categories */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
              >
                <h2 className="text-2xl font-bold mb-4">
                  Categories ({categories.length})
                </h2>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <motion.div
                      key={category.id}
                      className="px-4 py-4 cursor-pointer bg-white shadow-sm rounded-lg hover:shadow-md transition"
                      whileHover={{ scale: 1.05 }}
                    >
                      <Link
                        to={`/category/${category.slug}`}
                        className="text-sky-600 font-semibold  text-[1rem] "
                      >
                        {category.name} {`(${category.count})`}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
