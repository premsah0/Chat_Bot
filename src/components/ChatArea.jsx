import { useState, useRef, useEffect } from "react";
import { GEMINI_BASE_URL, GEMINI_API_KEY } from "../constants";
import { cleanGeminiText } from "../helper";
import Message from "./Message";

const ChatArea = ({ messages, setMessages, history, setHistory }) => {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef(null);

  // Auto scroll when messages update
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const askQuestion = async () => {
    if (!question.trim() || loading) return;

    setLoading(true);

    const userMessage = { role: "user", text: question };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await fetch(GEMINI_BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": GEMINI_API_KEY,
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: question }] }],
        }),
      });

      const data = await response.json();

      if (!data.candidates) {
        alert("API error or limit reached");
        setLoading(false);
        return;
      }

      const rawText = data.candidates[0].content.parts[0].text;

      const answer = cleanGeminiText(rawText);

      const botMessage = { role: "bot", text: answer };

      setMessages((prev) => [...prev, botMessage]);

      const newChat = {
        id: Date.now(),
        question,
        answer,
      };

      setHistory([...history, newChat]);

      setQuestion("");
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  return (
    <div className="col-span-4 flex flex-col h-screen">
      {/* Scrollable chat messages */}
      <div className="flex-1 overflow-y-auto p-4 pb-28 space-y-4">
        {messages.map((msg, index) => (
          <Message key={index} role={msg.role} text={msg.text} />
        ))}
        <div ref={bottomRef}></div>
      </div>

      {/* ChatGPT centered input */}
      <div className=" bottom-0 left-0 right-0 flex justify-center pb-6 pointer-events-none">
        <div className="w-full max-w-3xl px-4 pointer-events-auto">
          <div className="flex items-center bg-[#303030] border border-zinc-700 rounded-full px-5 py-3 shadow-lg">

            <input
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && askQuestion()}
              placeholder="Ask anything"
              className="flex-1 bg-transparent outline-none text-zinc-200 placeholder:text-zinc-400"
            />

            <button
              onClick={askQuestion}
              disabled={loading}
              className="flex items-center justify-center w-9 h-9 rounded-full bg-white text-black disabled:opacity-50"
            >
              ↑
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatArea;
