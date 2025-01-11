import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./SingleBlogPage.module.css"; // Import the CSS module
import { FaArrowCircleLeft } from "react-icons/fa";
import Layout from "../layout/Layout";
import { Helmet } from "react-helmet";

export default function BlogDetails() {
  const { slug } = useParams(); // Get slug from URL params
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchBlog = async () => {
    setLoading(true);
    try {
      const encodedSlug = encodeURIComponent(slug);
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/posts?slug=${encodedSlug}`
      );
      const data = await res.json();

      if (data && data.length > 0) {
        setBlog(data[0]);
      } else {
        setBlog(null);
      }
    } catch (error) {
      console.error("Error fetching individual blog:", error);
      setBlog(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, [slug]);

  return (
    <>
      <Helmet>
        <title>{slug}</title>

        <meta
          name="description"
          content={blog?.description || "No description available."}
        />
      </Helmet>
      <Layout>
        <div className="mx-auto mt-6 lg:w-8/12 sm:w-10/12 px-1">
          {loading ? (
            <div className="flex justify-center items-center">
              <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : blog ? (
            <div className="border p-4 bg-white rounded-lg">
              <h1 className="text-2xl font-semibold text-gray-800 mb-4">
                {blog.title?.rendered || "Untitled Blog"}
              </h1>
              <div
                className={styles.blogContent}
                dangerouslySetInnerHTML={{ __html: blog.content?.rendered }}
              />
            </div>
          ) : (
            <p className="text-center text-red-500">Blog not found</p>
          )}

          {/* Back Link */}
          <div className="mt-4">
            <Link
              to={"/blog-page"}
              className="flex items-center gap-2 text-blue-500 hover:underline"
            >
              <FaArrowCircleLeft /> Previous
            </Link>
          </div>
        </div>
      </Layout>
    </>
  );
}
