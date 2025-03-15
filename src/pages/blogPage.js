import React from "react";
import BlogContent from "../components/blogContent";
import Sidebar from "../components/sidebar";
import CallToAction from "../components/callToAction";
import "../css/blog.css";
import Navbar from "../components/Navbar";

const BlogPage = () => {
  return (
    <>
    <Navbar />
    <div className="blog-page">
      <div className="main-content">
        <BlogContent />
        <Sidebar />
      </div>
      <CallToAction />
    </div>
    </>
  );
};

export default BlogPage;