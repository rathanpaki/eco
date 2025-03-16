import React from "react";

const ArticlesCaseStudies = () => {
  return (
    <section className="articles-case-studies" data-aos="fade-up">
      <h2>Articles & Case Studies</h2>
      <div className="articles-grid">
        <div className="article-card">
          <h3>Top 5 Sustainable Gift Wrapping Ideas</h3>
          <p>Learn how to wrap gifts without harming the environment.</p>
          <a href="/article/1">Read More</a>
        </div>
        <div className="article-card">
          <h3>Case Study: How Brands Are Going Green</h3>
          <p>Explore how companies are adopting eco-friendly practices.</p>
          <a href="/article/2">Read More</a>
        </div>
        <div className="article-card">
          <h3>The Rise of Eco-Friendly Packaging</h3>
          <p>Discover the latest trends in sustainable packaging.</p>
          <a href="/article/3">Read More</a>
        </div>
      </div>
    </section>
  );
};

export default ArticlesCaseStudies;