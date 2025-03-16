import React, { useState } from "react";

const UserGeneratedPosts = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: "", content: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    setPosts([...posts, newPost]);
    setNewPost({ title: "", content: "" });
  };

  return (
    <section className="user-generated-posts" data-aos="fade-up">
      <h2>Share Your Eco-Friendly Ideas</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Post Title"
          value={newPost.title}
          onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
          required
        />
        <textarea
          placeholder="Write your post here..."
          value={newPost.content}
          onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
          required
        />
        <button type="submit">Submit</button>
      </form>
      <div className="posts-grid">
        {posts.map((post, index) => (
          <div key={index} className="post-card">
            <h3>{post.title}</h3>
            <p>{post.content}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default UserGeneratedPosts;