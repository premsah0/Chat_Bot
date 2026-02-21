import ThemeToggle from "./ThemeToggle";

const Sidebar = ({ history, setHistory, setMessages, theme, setTheme }) => {
  const deleteChat = (id) => {
    const updated = history.filter((c) => c.id !== id);
    setHistory(updated);
  };

  const loadChat = (chat) => {
    setMessages([
      { role: "user", text: chat.question },
      { role: "bot", text: chat.answer },
    ]);
  };

  return (
    <div className="col-span-1 bg-[#181819] p-4 flex flex-col justify-between">
      <div className="space-y-2 overflow-y-auto">
        {history.map((chat) => (
          <div
            key={chat.id}
            className="flex justify-between items-center p-2 text-sm rounded hover:bg-zinc-700 cursor-pointer"
          >
            <span onClick={() => loadChat(chat)}>
              {chat.question.slice(0, 25)}
            </span>

            <button onClick={() => deleteChat(chat.id)} className="text-xs">
              ❌
            </button>
          </div>
        ))}
      </div>

      <ThemeToggle theme={theme} setTheme={setTheme} />
    </div>
  );
};

export default Sidebar;
