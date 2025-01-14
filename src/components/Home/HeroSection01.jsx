import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// Import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Link } from "react-router-dom";

export default function HeroSection01() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch posts from the WordPress API
  const fetchPosts = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/posts?per_page=3`
      );
      if (!res.ok) throw new Error("Failed to fetch posts");
      const data = await res.json();
      setPosts(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <section className="py-8 ">
      {isLoading ? (
        <div className="flex justify-center h-[70vh] items-center my-6">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : error ? (
        <p className="text-center text-red-500">Error: {error}</p>
      ) : (
        <Swiper
          spaceBetween={20}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            color: "white",
          }}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper  rounded-lg h-[40vh] sm:h-[70vh] lg:w-[90%] w-full"
        >
          {posts.map((post, index) => {
            function extractCategory(htmlString) {
              if (!htmlString) return null;

              // Create a temporary DOM element to parse the HTML
              const tempDiv = document.createElement("div");
              tempDiv.innerHTML = htmlString;

              // Find the <a> tag and extract its text content
              const anchorTag = tempDiv.querySelector("a");
              return anchorTag ? anchorTag.textContent.trim() : null;
            }

            // Extract the category name
            const categoryName = extractCategory(post?.rttpg_category);

            console.log(categoryName);
            return (
              <SwiperSlide key={index} className="mb-8  ">
                <div
                  style={{
                    backgroundImage: `url(${post?.rttpg_featured_image_url?.full?.[0]})`,
                  }}
                  className="relative  mx-auto h-full  bg-cover bg-center "
                >
                  {/* Overlay and Bottom Content */}
                  <div className="absolute  inset-0  bg-[rgba(0,0,0,0.55)] p-4 sm:p-6 flex flex-col justify-end">
                    {/* Category - Disabled Link */}
                    <div className="absolute top-2 sm:top-4 left-2 sm:left-4">
                      <span
                        className="text-white text-xs sm:text-sm bg-[rgba(255,255,255,0.2)] px-2 sm:px-4 py-1 rounded-md backdrop-blur pointer-events-none"
                        dangerouslySetInnerHTML={{
                          __html: post?.rttpg_category || "Uncategorized",
                        }}
                      />
                    </div>

                    {/* Title and Content for desktop */}
                    <div className="w-full sm:w-9/12 mb-6 ml-4 md:block hidden">
                      <h2 className="text-white text-3xl mb-2">
                        {post.title.rendered}
                      </h2>

                      {/* Excerpt */}
                      <p
                        className="text-white text-xl  mb-4 "
                        dangerouslySetInnerHTML={{
                          __html: post.excerpt?.rendered
                            ? post.excerpt?.rendered.length > 300
                              ? `${post.excerpt?.rendered.slice(0, 300)}...`
                              : post.excerpt?.rendered
                            : "No excerpt available",
                        }}
                      />

                      {/* Read More Link */}
                      <Link
                        to={`/category/${categoryName}/${post.slug}`}
                        className="text-xs sm:text-sm rounded-lg hover:bg-blue-600 hover:text-white duration-300 text-blue-600 bg-white mb-5 w-fit px-6 py-2 shadow-md"
                      >
                        Read More
                      </Link>
                    </div>

                    {/* Title and Content for moible */}
                    <div className="w-full md:hidden block">
                      <h2 className="text-white text-sm mb-2">
                        {post.title.rendered.length > 50
                          ? `${post.title?.rendered.slice(0, 50)}...`
                          : null}
                      </h2>

                      {/* Excerpt */}
                      <p
                        className="custom-excerpt  text-xs text-white mb-2"
                        dangerouslySetInnerHTML={{
                          __html: post.excerpt?.rendered
                            ? post.excerpt?.rendered.length > 250
                              ? `${post.excerpt?.rendered.slice(0, 250)}...`
                              : post.excerpt?.rendered
                            : "No excerpt available",
                        }}
                      />

                      {/* Read More Link */}
                      <Link
                        to={`/category/${categoryName}/${post.slug}`}
                        className="text-xs py-2 cursor-pointer sm:text-sm text-blue-600 bg-white mb-4 sm:mb-5 w-fit px-4 sm:px-6   rounded-lg shadow-md"
                      >
                        Read More
                      </Link>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}
    </section>
  );
}
