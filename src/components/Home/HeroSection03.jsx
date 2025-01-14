import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaCalendarWeek } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function HeroSection03() {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);

  // Extract the category name from the HTML string
  function extractCategory(htmlString) {
    if (!htmlString) return "Uncategorized";

    // Create a temporary DOM element to parse the HTML
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlString;

    // Find the <a> tag and extract its text content
    const anchorTag = tempDiv.querySelector("a");
    return anchorTag ? anchorTag.textContent.trim() : "Uncategorized";
  }

  useEffect(() => {
    // Fetch posts from WordPress REST API
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/posts?per_page=3`
        );
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    // Fetch categories from WordPress REST API
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

    fetchPosts();
    fetchCategories();
  }, []);

  return (
    <section className="lg:flex place-items-start mt-16 gap-8">
      {/* Left Section: Recent Posts */}
      <motion.div
        className="lg:w-[70%] w-full"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <h2 className="text-lg text-gray-700 flex gap-2 items-center mb-8">
          <motion.span
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5, ease: "backOut" }}
            viewport={{ once: true }}
            className="bg-sky-500 rounded-sm text-white px-3 py-1"
          >
            Recently
          </motion.span>
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Posted
          </motion.span>
        </h2>

        <div className="flex flex-col gap-8">
          {posts.length > 0 ? (
            posts.map((post, index) => {
              const category = extractCategory(post?.rttpg_category);

              return (
                <Link to={`/category/${category}/${post.slug}`} key={post.id}>
                  <motion.div
                    className="flex flex-col lg:flex-row items-center lg:items-start border p-2 bg-white shadow-md rounded-md justify-between gap-4 lg:w-[701px] w-full hover:scale-[1.02] hover:shadow-lg duration-300"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.2,
                    }}
                    viewport={{ once: true }}
                  >
                    {/* Image */}
                    <div className="lg:w-[266px] lg:h-[180px] w-full border rounded-lg h-48 bg-gray-300">
                      <img
                        src={
                          post?.rttpg_featured_image_url?.full?.[0] ||
                          "https://via.placeholder.com/120"
                        }
                        alt={post.title.rendered}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>

                    {/* Content */}
                    <div className="lg:w-[400px] w-full">
                      {/* Category */}
                      <p className="text-[0.6rem] bg-gray-50 px-3 py-1 w-fit rounded-lg">
                        {category}
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
                      <p
                        className="text-gray-600 text-[0.8rem]"
                        dangerouslySetInnerHTML={{
                          __html:
                            post.excerpt.rendered.length > 180
                              ? `${post.excerpt.rendered.slice(0, 180)}...`
                              : post.excerpt.rendered,
                        }}
                      />
                    </div>
                  </motion.div>
                </Link>
              );
            })
          ) : (
            <div className="flex justify-center h-[40vh] items-center my-6">
              <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Right Section: Categories */}
      <motion.div
        className="lg:w-[30%] w-full mt-8 lg:mt-0"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <h2 className="text-lg text-gray-700 flex gap-2 items-center mb-8">
          <motion.span
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5, ease: "backOut" }}
            viewport={{ once: true }}
            className="bg-sky-500 rounded-sm text-white px-3 py-1"
          >
            Categories ({categories.length})
          </motion.span>
        </h2>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
        >
          <div className="flex gap-6 flex-col">
            {categories.map((category) => (
              <Link to={`/category/${category.slug}`} key={category.id}>
                <motion.div
                  className="px-4 py-4 bg-white hover:scale-105 hover:shadow-lg text-blue-600 hover:bg-blue-500 hover:text-white duration-300 shadow-sm rounded-lg"
                  whileHover={{ scale: 1.05 }}
                >
                  <p className="font-semibold text-[1rem]">
                    {category.name} {`(${category.count})`}
                  </p>
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
