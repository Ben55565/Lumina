export const stringToColor = (string) => {
  let hash = 0;
  let i;
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
};

export const stringAvatar = (name) => {
  const words = name?.split(" ");
  const initials =
    words?.length >= 2
      ? `${words[0][0]}${words[1][0]}`
      : words?.length === 1
      ? `${words[0][0]}`
      : "?";

  return {
    sx: {
      bgcolor: stringToColor(name || "Anonymous"),
    },
    children: initials.toUpperCase(),
  };
};

export const isRTL = (text) => {
  const rtlChars = /[\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC]/;
  return rtlChars.test(text);
};
