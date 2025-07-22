import React, { useEffect, useState } from "react";
import api from "../../api/api.js";
import RestrictedAccess from "../../components/RestrictedAccess/RestrictedAccess.jsx";
import PostCard from "../../components/PostCard/PostCard.jsx";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";

import PostForm from "../../components/PostForm/PostForm.jsx";

// TODO: need to handle that if the user uploaded a post, it should be visible to him with his details only
// (and not anonymous, and indicate that it is his post and showing as anonymous)

export default function FeedPage({ userId }) {
  const [posts, setPosts] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [formOpen, setFormOpen] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get("/feed/get-all-posts");
        setIsAuthenticated(true);
        setPosts(response.data);
      } catch (error) {
        console.error(error);
        setIsAuthenticated(false);
      }
    };

    fetchPosts();

    const intervalId = setInterval(fetchPosts, 60000); // 60,000 ms = 60 sec

    return () => clearInterval(intervalId);
  }, []);

  const handleCreatePost = async (postData) => {
    const newPostData = {
      ...postData,
      visibility: postData.visibility.toUpperCase(),
      userId: userId.toString(),
    };
    console.log("Submitting post:", newPostData);

    try {
      const res = await api.post("/feed/new-post", newPostData);
      console.log("Post created successfully:", res.data);
      // TODO: use alert to notify the user of success, reload the feed, or update the state to include the new post
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <Box>
      {posts.length > 0 ? (
        <Box sx={{ my: 15 }}>
          {posts.map((post, i) => (
            <PostCard key={i} post={post} />
          ))}
          <SpeedDial
            ariaLabel="Add Post"
            sx={{ position: "fixed", bottom: 150, right: 50 }}
            icon={<SpeedDialIcon />}
            onClick={() => setFormOpen(true)}
          />
          <PostForm
            open={formOpen}
            onClose={() => setFormOpen(false)}
            onSubmit={handleCreatePost}
          />
        </Box>
      ) : !isAuthenticated ? (
        <RestrictedAccess
          title="FeedRestrictedAccess.title"
          message="FeedRestrictedAccess.message"
        />
      ) : (
        <Box sx={{ my: 15 }}>
          <RestrictedAccess
            title="FeedIssueAccess.title"
            message="FeedIssueAccess.message"
          />
          <SpeedDial
            ariaLabel="Add Post"
            sx={{ position: "fixed", bottom: 150, right: 50 }}
            icon={<SpeedDialIcon />}
            onClick={() => setFormOpen(true)}
          />
          <PostForm
            open={formOpen}
            onClose={() => setFormOpen(false)}
            onSubmit={handleCreatePost}
          />
        </Box>
      )}
    </Box>
  );
}
