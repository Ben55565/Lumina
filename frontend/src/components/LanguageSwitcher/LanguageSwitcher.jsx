import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import { useTranslation } from "react-i18next";
import { useTheme } from "@mui/material/styles";
import TranslateIcon from "@mui/icons-material/Translate";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const theme = useTheme();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const styling = {
    color: theme.palette.buttons.background,
    fontWeight: 800,
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.buttons.background,
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.buttons.background,
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.buttons.background,
    },
    "& .MuiSvgIcon-root": {
      color: theme.palette.buttons.background,
    },
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        mr: 2,
      }}
    >
      <TranslateIcon sx={{ mr: 2, color: theme.palette.buttons.background }} />
      <FormControl fullWidth variant="outlined">
        <Select
          value={i18n.language}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
          onChange={(e) => changeLanguage(e.target.value)}
          sx={styling}
        >
          <MenuItem value={"en"}>English</MenuItem>
          <MenuItem value={"he"}>עברית</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default LanguageSwitcher;
