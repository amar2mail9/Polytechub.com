import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout"; // Assuming you have a layout component
import HomePage from "./components/Home/HomePage";
import ContactUs from "./components/contactUs/ContactUs";
import BlogPage from "./components/Blogpage/BlogPage";
import CategoryPage from "./components/CategoryWiseBlog/CategoryPage";
import BlogDetails from "./components/blogDetails/BlogDetails";
import Error from "./components/error/Error";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/blog-page" element={<BlogPage />} />
        <Route path="/category/:category" element={<CategoryPage />} />
        <Route path="/blog-page/:slug" element={<BlogDetails />} />
        
        {/* Catch-all for error pages */}
        <Route path="*" element={<Error/>} />
      </Routes>
    </BrowserRouter>
  );
}
