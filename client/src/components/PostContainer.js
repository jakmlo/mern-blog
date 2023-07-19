import { React, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../api/axios";

import PostCard from "./PostCard";

const PostContainer = () => {
  const [posts, setPosts] = useState([]);
  const controller = new AbortController();
  //Fetching data
  useEffect(() => {
    let isMounted = true;
    const fetchPosts = async () => {
      try {
        const response = await axios.get("/api/posts/", {
          signal: controller.signal,
        });
        isMounted && setPosts(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPosts();

    return () => {
      isMounted = false;
      isMounted && controller.abort();
    };
  }, []);

  return posts.length === 0 ? (
    <p>Brak postów.</p>
  ) : (
    <div className="post-list-container">
      <div className="post-list">
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default PostContainer;
