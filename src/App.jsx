import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("https://www.reddit.com/r/reactjs.json")
      .then((res) => res.json())
      .then((data) => {
        const children = data.data.children.map((child) => child.data);
        setPosts(children);
      })
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  return (
    <div className="container">
      <h1>ReactJS Reddit Posts</h1>
      <div className="card-list">
        {posts.map((post) => (
          <div key={post.id} className="card">
            <h2>{post.title}</h2>
            <div
              className="selftext"
              dangerouslySetInnerHTML={{ __html: post.selftext_html || "<i>No content</i>" }}
            />
            <p><strong>Score:</strong> {post.score}</p>
            <a href={`https://reddit.com${post.permalink}`} target="_blank" rel="noopener noreferrer">
              Visit Post
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
