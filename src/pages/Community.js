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
  const [answers, setAnswers] = useState({}); // State to manage answers for posts

  const postsRef = ref(db, "posts");

  useEffect(() => {
    // Fetch posts and their answers from Firebase
    onValue(postsRef, (snapshot) => {
      const data = snapshot.val();
      console.log("Fetched data:", data); // Log the fetched data
      if (data) {
        const postList = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
          answers: data[key].answers
            ? Object.keys(data[key].answers).map((answerKey) => ({
                id: answerKey,
                ...data[key].answers[answerKey],
              }))
            : [], // Map answers to an array
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

  const handleAnswerChange = (postId, value) => {
    setAnswers({
      ...answers,
      [postId]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPost.content.trim()) {
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

  const handleAnswerSubmit = (e, postId) => {
    e.preventDefault();
    const answerContent = answers[postId]?.trim();
    if (answerContent) {
      const answersRef = ref(db, `posts/${postId}/answers`);
      push(answersRef, { content: answerContent })
        .then(() => {
          console.log("Answer saved successfully!");
          setAnswers({
            ...answers,
            [postId]: "",
          });
        })
        .catch((error) => {
          console.error("Error saving answer: ", error);
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

                  {/* Display answers */}
                  {post.answers && post.answers.length > 0 && (
                    <div className="answers-section">
                      <h4>Answers:</h4>
                      <ul className="answers-list">
                        {post.answers.map((answer, index) => (
                          <li key={index} className="answer-item">
                            {answer.content}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Answer form */}
                  <form
                    onSubmit={(e) => handleAnswerSubmit(e, post.id)}
                    className="answer-form"
                  >
                    <textarea
                      value={answers[post.id] || ""}
                      onChange={(e) =>
                        handleAnswerChange(post.id, e.target.value)
                      }
                      placeholder="Write your answer..."
                      className="form-control"
                    />
                    <button type="submit" className="submit-button">
                      Submit Answer
                    </button>
                  </form>
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
