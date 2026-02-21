import { useState, useEffect } from "react";
import Sidebar from "./components/SideBar";
import ChatArea from "./components/ChatArea";
import { getHistory, saveHistory, getTheme, saveTheme } from "./utils/storage";

function App() {
  const [history, setHistory] = useState([]);
  const [messages, setMessages] = useState([]);
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    setHistory(getHistory());
    setTheme(getTheme());
  }, []);

  useEffect(() => {
    saveHistory(history);
  }, [history]);

  useEffect(() => {
    saveTheme(theme);
  }, [theme]);

  return (
    <div className="h-screen grid grid-cols-5 bg-zinc-800 text-white">
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
