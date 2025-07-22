import React from "react";
import { Box, Container, Typography, Grid, Button, Paper } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import PublicIcon from "@mui/icons-material/Public";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BoyIcon from "@mui/icons-material/Boy";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const AboutPage = () => {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        backgroundColor: "background.paper",
        py: 15,
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Container maxWidth="lg">
        <Paper elevation={3} sx={{ borderRadius: 4 }}>
          {/* Header Section */}
          <Box textAlign="center" mb={10}>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              textAlign="center"
              sx={{ mb: 2 }}
            >
              <InfoOutlinedIcon color="primary" sx={{ fontSize: 60 }} />
            </Box>
            <Typography variant="h3" fontWeight="bold" gutterBottom>
              {t("aboutPage.title")}
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              maxWidth="md"
              mx="auto"
            >
              {t("aboutPage.subtitle")}
            </Typography>
          </Box>

          {/* Feature Section */}
          <Box mb={6}>
            <Grid container spacing={6} justifyContent="center">
              <Grid>
                <Box textAlign="center">
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    textAlign="center"
                    sx={{ mb: 2 }}
                  >
                    <PublicIcon color="primary" sx={{ fontSize: 60 }} />
                  </Box>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {t("aboutPage.whyLumina")}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ whiteSpace: "pre-line", mt: 2 }}
                  >
                    {t("aboutPage.whyLuminaDescription")}
                  </Typography>
                </Box>
              </Grid>

              <Grid>
                <Box textAlign="center">
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    textAlign="center"
                    sx={{ mb: 2 }}
                  >
                    <FavoriteIcon color="error" sx={{ fontSize: 60 }} />
                  </Box>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {t("aboutPage.emotionalSafety")}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ whiteSpace: "pre-line", mt: 2 }}
                  >
                    {t("aboutPage.emotionalSafetyDescription")}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>

          {/* About Me Section */}
          <Box textAlign="center">
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              textAlign="center"
              sx={{ mb: 2 }}
            >
              <BoyIcon color="primary" sx={{ fontSize: 60 }} />
            </Box>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              {t("aboutPage.aboutMe")}
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              maxWidth="lg"
              mx="auto"
              sx={{ whiteSpace: "pre-line", mt: 2 }}
            >
              {t("aboutPage.aboutMeDescription")}
            </Typography>
          </Box>
          <Box
            mt={10}
            mb={5}
            alignItems="center"
            display="flex"
            justifyContent="center"
          >
            <Button
              variant="contained"
              size="large"
              color="primary"
              component={Link}
              to={"/register"}
              sx={{ py: 2, fontWeight: "bold", width: 200 }}
            >
              {t("aboutPage.buttonText")}
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default AboutPage;
