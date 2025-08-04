import React, { useEffect, useState } from "react";
import api from "../../api/api.js";
import RestrictedAccess from "../../components/RestrictedAccess/RestrictedAccess.jsx";
import PostCard from "../../components/PostCard/PostCard.jsx";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";

import PostForm from "../../components/PostForm/PostForm.jsx";

export default function FeedPage({ userId, setAlertInfo }) {
  const [posts, setPosts] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    visibility: "",
    content: "",
    mediaUrl: "",
    tags: [],
    tagInput: "",
  });

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
      setAlertInfo({
        show: true,
        type: res.data.result,
        message: res.data.info,
      });
      setTimeout(() => {
        setAlertInfo({ show: false });
        window.location.reload();
      }, 3000);
    } catch (error) {
      console.error("Error creating post:", error);
      setAlertInfo({
        show: true,
        type: error.data.result,
        message: error.data.info,
      });
      setTimeout(() => {
        setAlertInfo({ show: false });
      }, 3000);
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      const res = await api.delete(`/feed/delete-post/${postId}`);
      console.log("Post deleted successfully:", res.data);
      setAlertInfo({
        show: true,
        type: res.data.result,
        message: res.data.info,
      });
      setTimeout(() => {
        setAlertInfo({ show: false });
        window.location.reload();
      }, 3000);
    } catch (error) {
      console.error("Error deleting post:", error);
      setAlertInfo({
        show: true,
        type: error.data.result,
        message: error.data.info,
      });
      setTimeout(() => {
        setAlertInfo({ show: false });
      }, 3000);
    }
  };

  return (
    <Box>
      {posts.length > 0 ? (
        <Box sx={{ my: 15 }}>
          {posts.map((post, i) => (
            <PostCard
              key={i}
              post={post}
              userId={userId}
              setFormOpen={setFormOpen}
              setFormData={setFormData}
              handleDeletePost={handleDeletePost}
            />
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
            formData={formData}
            setFormData={setFormData}
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
            formData={formData}
            setFormData={setFormData}
          />
        </Box>
      )}
    </Box>
  );
}
