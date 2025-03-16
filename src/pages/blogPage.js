import React from "react";
import BlogContent from "../components/blogContent";
import Sidebar from "../components/sidebar";
import CallToAction from "../components/callToAction";
import ArticlesCaseStudies from "../components/ArticlesCaseStudies";
import EcoFriendlyIdeas from "../components/EcoFriendlyIdeas";
import VideoTutorials from "../components/VideoTutorials";
import "../css/blog.css";
import Navbar from "../components/Navbar";

const BlogPage = () => {
  return (
    <>
    <Navbar/>
      <div className="blog-page">
        <div className="main-content">
          <BlogContent />
          <Sidebar />
        </div>
        <div className="two-column-layout">
          <ArticlesCaseStudies />
          <EcoFriendlyIdeas />
        </div>
        <VideoTutorials />
        <CallToAction />
      </div>
    </>
  );
};

export default BlogPage;
