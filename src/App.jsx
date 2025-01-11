import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import HomePage from "./components/Home/HomePage";
import ContactUs from "./components/contactUs/ContactUs";
import BlogPage from "./components/Blogpage/BlogPage";
import CategoryPage from "./components/CategoryWiseBlog/CategoryPage";
import BlogDetails from "./components/blogDetails/BlogDetails";
import Error from "./components/pagenot/Error";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/blog-page" element={<BlogPage />} />
        <Route path="/category/:category" element={<CategoryPage />} />
        <Route path="/blog-page/:slug" element={<BlogDetails />} />
        
       
        <Route path="*" element={<Error/>} />
      </Routes>
    </BrowserRouter>
  );
}
