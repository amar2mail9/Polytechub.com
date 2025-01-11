import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./components/Home/HomePage";
import PageNotFound from "./components/error/PagenotFound";
import ContactUs from "./components/contactUs/ContactUs";
import BlogPage from "./components/Blogpage/BlogPage";
import CategoryPage from "./components/CategoryWiseBlog/CategoryPage";
import BlogDetails from "./components/blogDetails/BlogDetails";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/blog-page" element={<BlogPage />} />
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route path="/blog-page/:slug" element={<BlogDetails />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
