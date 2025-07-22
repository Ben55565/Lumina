import React, { useState, useEffect, useMemo } from "react";
import {
  Card,
  Typography,
  Chip,
  Stack,
  Divider,
  Box,
  Avatar,
} from "@mui/material";
import TagIcon from "@mui/icons-material/Tag";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useTranslation } from "react-i18next";
import { stringAvatar, isRTL } from "../../utils/helperFunctions.js";
import api from "../../api/api.js";

const PostCard = ({ post }) => {
  const [userInfo, setUserInfo] = useState({
    name: "Anonymous User",
    displayName: "",
  });

  const { t } = useTranslation();

  const isAnonymous = Boolean(post.visibility === "ANONYMOUS");

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (!isAnonymous && post.userId) {
        try {
          const res = await api.get(`/users/${post.userId}/public-info`);
          setUserInfo(res.data);
        } catch (error) {
          console.error("Error fetching user info:", error);
        }
      }
    };

    fetchUserInfo();
  }, [isAnonymous, post.userId]);

  const contentDirection = useMemo(
    () => (post.content ? (isRTL(post.content) ? "rtl" : "ltr") : "ltr"),
    [post.content]
  );

  const avatarProps = isAnonymous
    ? {
        sx: { bgcolor: "error.main" },
        children: "?",
      }
    : stringAvatar(userInfo.name);

  return (
    <Box>
      <Card
        variant="outlined"
        sx={{
          p: 2,
          mb: 10,
          borderRadius: 3,
          boxShadow: 3,
          backgroundColor: "background.paper",
          maxWidth: 1000,
          mx: "auto",
          display: "flex",
          flexDirection: "column",
          height: 500,
        }}
      >
        <Box sx={{ mb: 4, textAlign: "center" }}>
          <Typography variant="h5" fontWeight="bold" component="h5">
            {post.title}
          </Typography>
        </Box>

        <Box
          sx={{
            flexGrow: 1,
            overflowY: "auto",
            whiteSpace: "pre-wrap",
            mb: 2,
            direction: contentDirection,
            textAlign: contentDirection === "rtl" ? "right" : "left",
          }}
        >
          {post.content}
        </Box>

        {post.mediaUrl && (
          <Box
            component="img"
            src={post.mediaUrl}
            alt="Media"
            sx={{
              width: "100%",
              maxHeight: 250,
              borderRadius: 2,
              objectFit: "cover",
              mb: 2,
            }}
          />
        )}
        <Divider sx={{ mb: 2 }} />
        <Box
          sx={{
            mb: 2,
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <TagIcon color="primary" />
          {post.tags.length > 0 ? (
            <Stack direction="row" spacing={1} flexWrap="wrap">
              {post.tags.map((tag, i) => (
                <Chip
                  key={i}
                  label={tag}
                  size="small"
                  color="primary"
                  variant="outlined"
                />
              ))}
            </Stack>
          ) : (
            <Typography variant="body2" color="text.secondary">
              {t("postCard.noTags")}
            </Typography>
          )}
        </Box>
        <Divider sx={{ mb: 1 }} />

        {/* CardHeader at bottom with avatar, name, timestamp on left, visibility on right */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            pt: 1,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Avatar {...avatarProps} />
            <Box>
              <Typography fontWeight="bold" variant="body1">
                {userInfo.name}{" "}
                {userInfo.displayName ? `(${userInfo.displayName})` : ""}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {post.timeStamp
                  ? new Date(post.timeStamp)
                      .toLocaleString("he-IL", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                      })
                      .replace(",", " @ ")
                  : "Unknown date"}
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 1,
            }}
          >
            <VisibilityIcon color="primary" />
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontWeight: 600 }}
            >
              {t("newPostForm." + post.visibility.toLowerCase() + "Option")}
            </Typography>
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

export default PostCard;
