// Save chat history
export const saveHistory = (history) => {
  localStorage.setItem("chatHistory", JSON.stringify(history));
};

// Load chat history
export const getHistory = () => {
  const data = localStorage.getItem("chatHistory");
  return data ? JSON.parse(data) : [];
};

// Save theme
export const saveTheme = (theme) => {
  localStorage.setItem("theme", theme);
};

// Load theme
export const getTheme = () => {
  return localStorage.getItem("theme") || "dark";
};
