import React, { useState, useEffect } from "react";
import { db } from "../firebaseConfig"; 
import { ref, push, onValue } from "firebase/database"; 
import "../css/Community.css"; 
import Navbar from "../components/Navbar";

const Community = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({
    type: "experience", 
    content: "",
  });

  const postsRef = ref(db, "posts");

  useEffect(() => {
    onValue(postsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const postList = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setPosts(postList);
      } else {
        setPosts([]);
      }
    });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost({
      ...newPost,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPost.content.trim()) {
      // Push the new post to Firebase
      push(postsRef, newPost)
        .then(() => {
          console.log("Post saved successfully!");
          setNewPost({
            type: "experience",
            content: "",
          });
        })
        .catch((error) => {
          console.error("Error saving post: ", error);
        });
    }
  };

  return (
    <>
      <Navbar />
      <div className="community-container">
        <h1 className="community-title">Community Engagement and Support</h1>
        <p className="community-description">
          EcoGifts will create a community platform where users can share their
          experiences, sustainable wedding ideas, and DIY projects. This feature
          encourages user interaction and collaboration, fostering a sense of
          belonging among eco-conscious couples.
        </p>

        <section className="community-share">
          <h2 className="community-share-title">Share Your Post</h2>
          <form onSubmit={handleSubmit} className="community-form">
            <div className="form-group">
              <label>
                Post Type:
                <select
                  name="type"
                  value={newPost.type}
                  onChange={handleInputChange}
                  className="form-control"
                >
                  <option value="experience">Experience</option>
                  <option value="idea">Sustainable Wedding Idea</option>
                  <option value="diy">DIY Project</option>
                </select>
              </label>
            </div>
            <div className="form-group">
              <label>
                Content:
                <textarea
                  name="content"
                  value={newPost.content}
                  onChange={handleInputChange}
                  required
                  className="form-control"
                />
              </label>
            </div>
            <button type="submit" className="submit-button">
              Submit
            </button>
          </form>
        </section>

        <section className="community-posts">
          <h2 className="community-posts-title">Community Posts</h2>
          {posts.length > 0 ? (
            <ul className="posts-list">
              {posts.map((post) => (
                <li key={post.id} className="post-item">
                  <h3 className="post-type">{post.type.toUpperCase()}</h3>
                  <p className="post-content">{post.content}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="no-posts-message">
              No posts yet. Be the first to share!
            </p>
          )}
        </section>
      </div>
    </>
  );
};

export default Community;
