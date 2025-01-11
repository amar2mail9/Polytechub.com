import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FiSearch, FiEdit, FiGlobe, FiLock } from "react-icons/fi";
import Layout from "../layout/Layout";
import { Helmet } from "react-helmet";

// Custom hook for debouncing search query
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default function CategoryPage() {
  const { category } = useParams(); // Get the category slug from URL params
  const [categoryData, setCategoryData] = useState(null);
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  // Debounced search query
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  // Function to fetch category and posts data
  const fetchCategoryData = async () => {
    setLoading(true);
    setError(null);
    try {
      const categoryRes = await fetch(
        `${import.meta.env.VITE_API_URL}/categories?slug=${category}`
      );
      const categoryJson = await categoryRes.json();

      if (categoryJson.length > 0) {
        const categoryInfo = categoryJson[0];
        setCategoryData(categoryInfo);

        // Fetch posts for the specific category
        const postsRes = await fetch(
          `${import.meta.env.VITE_API_URL}/posts?categories=${categoryInfo.id}`
        );
        const postsJson = await postsRes.json();
        setPosts(postsJson);
        setFilteredPosts(postsJson);
      } else {
        setError("Category not found.");
      }
    } catch (error) {
      setError("Error fetching category data.");
      console.error("Error fetching category or posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryData();
  }, [category]);

  useEffect(() => {
    // Filter posts based on the debounced search query
    const filtered = posts.filter((post) =>
      post.title.rendered
        .toLowerCase()
        .includes(debouncedSearchQuery.toLowerCase())
    );
    setFilteredPosts(filtered);
  }, [debouncedSearchQuery, posts]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (

    <>
      <Helmet>
        <title>{category}</title>
         <meta
          name="description"
          content={categoryData?.description || "No description available."}
        />
        {/*
        <meta name="keywords" content="home, website, content, hero sections" />
        <meta property="og:title" content="Home - My Website" />
        <meta
          property="og:description"
          content="Welcome to the homepage of My Website."
        />
        <meta property="og:type" content="website" /> */}
      </Helmet>
    <Layout>
      <section>
        <div className="mx-auto mt-6 lg:px-[10%] md:px-[7%] px-[3%] w-full">
          {loading ? (
            <div className="flex justify-center h-[70vh] items-center my-6">
              <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <div className="w-full ">
              {/* Category Info */}
              <div className="flex w-full md:flex-row flex-col  justify-between mb-16">
                <div>
                  <h1 className="text-2xl font-semibold">
                    {categoryData?.name}
                  </h1>
                  <p className="text-gray-700 mt-2">
                    {categoryData?.description || "No description available."}
                  </p>
                </div>

                {/* Search Bar */}
                <div className="flex items-center h-[2.3rem] gap-2 mt-4 border-[0.1rem] border-orange-500 rounded-md">
                  <FiSearch className="text-orange-500 border-r-[0.1rem] w-10 p-2 bg-orange-100 rounded-l-md border-orange-500 h-full" />
                  <input
                    type="text"
                    placeholder="Search posts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-grow outline-none py-2 px-2 text-orange-500 h-full lg:w-[400px] md:w-[300px] sm:w-[250px] w-[100%] text-sm bg-transparent"
                  />
                </div>
              </div>

              {/* Posts List */}
              <div className="md:grid lg:grid-cols-2 md:grid-cols-1 sm:block  md:gap-4 ">
                {currentPosts.length > 0 ? (
                  currentPosts.map((post) => (
                    <Link to={`/blog-page/${post.slug}`}>
                      <div
                        key={post.id}
                        className="bg-white sm:flex items-center mb-3 shadow-lg rounded-lg p-3 hidden gap-5"
                      >
                        {/* Post Thumbnail */}
                        <img
                          src={
                            post?.rttpg_featured_image_url?.full?.[0] ||
                            "https://via.placeholder.com/120"
                          }
                          alt={post.title?.rendered || "Untitled"}
                          className="w-40 rounded-full h-40 object-cover"
                        />
                        {/* Post Details */}
                        <div className="w-full">
                          <h3 className="md:text-[1.3rem] text-sky-700 font-semibold">
                            {post.title?.rendered?.length > 60
                              ? `${post.title?.rendered.slice(0, 60)}...`
                              : post.title?.rendered || "Untitled Post"}
                          </h3>
                          {/* Post Excerpt */}
                          <p
                            className="text-sm"
                            dangerouslySetInnerHTML={{
                              __html: post.excerpt?.rendered
                                ? post.excerpt?.rendered.length > 180
                                  ? `${post.excerpt?.rendered.slice(
                                      0,
                                      180
                                    )}[...]`
                                  : post.excerpt?.rendered
                                : "No excerpt available",
                            }}
                          />
                          <Link
                            to={`/blog-page/${post.slug}`}
                            className="text-violet-700"
                          >
                            Read More
                          </Link>
                        </div>
                      </div>

                      {/* small screen */}
                      <div
                        key={post.id}
                        className="bg-white items-center mb-3 sm:hidden block shadow-lg rounded-lg p-3  gap-5"
                      >
                        {/* Post Thumbnail */}
                        <img
                          src={
                            post?.rttpg_featured_image_url?.full?.[0] ||
                            "https://via.placeholder.com/120"
                          }
                          alt={post.title?.rendered || "Untitled"}
                          className=" w-full h-56 rounded-md  object-cover"
                        />
                        {/* Post Details */}
                      
                          <h3 className="text-[1rem] text-sky-700 font-semibold">
                            {post.title?.rendered?.length > 60
                              ? `${post.title?.rendered.slice(0, 60)}...`
                              : post.title?.rendered || "Untitled Post"}
                          </h3>
                          {/* Post Excerpt */}
                          <p
                            className="text-[0.8rem]"
                            dangerouslySetInnerHTML={{
                              __html: post.excerpt?.rendered
                                ? post.excerpt?.rendered.length > 180
                                  ? `${post.excerpt?.rendered.slice(
                                      0,
                                      180
                                    )}[...]`
                                  : post.excerpt?.rendered
                                : "No excerpt available",
                            }}
                          />
                          <Link
                            to={`/blog-page/${post.slug}`}
                            className="text-violet-700"
                          >
                            Read More
                          </Link>
                        </div>
                 
                    </Link>
                  ))
                ) : (
                  <div className="text-center text-rose-600">
                    No Post Available
                  </div>
                )}
              </div>

              {/* Pagination */}
              {/* Pagination */}
              <div className="flex justify-center mt-6">
                {Array.from(
                  { length: Math.ceil(filteredPosts.length / postsPerPage) },
                  (_, index) => (
                    <button
                      key={index}
                      onClick={() => paginate(index + 1)}
                      className={`px-4 py-2 mx-1  rounded-lg   ${
                        currentPage === index + 1
                          ? "bg-blue-600 text-white"
                          : "border border-blue-600"
                      }`}
                    >
                      {index + 1}
                    </button>
                  )
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout></>
  );
}
