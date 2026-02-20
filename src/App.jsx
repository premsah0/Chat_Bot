import { useState, useEffect } from "react";
import Sidebar from "./components/SideBar";
import ChatArea from "./components/ChatArea";
import { getHistory, saveHistory, getTheme, saveTheme } from "./utils/storage";

function App() {
  const [history, setHistory] = useState([]);
  const [messages, setMessages] = useState([]);
  const [theme, setTheme] = useState("dark");

  // Load history & theme on first render
  useEffect(() => {
    setHistory(getHistory());
    setTheme(getTheme());
  }, []);

  // Save history when updated
  useEffect(() => {
    saveHistory(history);
  }, [history]);

  // Save theme when changed
  useEffect(() => {
    saveTheme(theme);
  }, [theme]);

  return (
    <div
      className={
        theme === "dark"
          ? "h-screen grid grid-cols-5 bg-[#212121] text-white"
          : "h-screen grid grid-cols-5 bg-white text-black"
      }
    >
      <Sidebar
        history={history}
        setHistory={setHistory}
        setMessages={setMessages}
        theme={theme}
        setTheme={setTheme}
      />

      <ChatArea
        messages={messages}
        setMessages={setMessages}
        history={history}
        setHistory={setHistory}
      />
    </div>
  );
}

export default App;
