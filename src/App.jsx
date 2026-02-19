import { useState } from "react";
import { GEMINI_BASE_URL, GEMINI_API_KEY } from "./constants";
import "./App.css";
import Answer from "./components/Answer";

function App() {
  const [question, setQuestion] = useState("");
  const [result, setResult] = useState(undefined);
  const [loading, setLoading] = useState(false);

  const askQuestion = async () => {
    if (loading) return; // prevents spam clicking

    setLoading(true);

    try {
      const payload = {
        contents: [
          {
            parts: [
              {
                text: question,
              },
            ],
          },
        ],
      };

      let response = await fetch(GEMINI_BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": GEMINI_API_KEY,
        },
        body: JSON.stringify(payload),
      });

      response = await response.json();

      if (!response.candidates) {
        console.log("API Error:", response);
        alert("API limit reached or error occurred. Please try later.");
        setLoading(false);
        return;
      }

      let text = response.candidates[0].content.parts[0].text;

      text = text.replace(/^\s*[*\-•]\s+/gm, "");

      let dataString = text
        .split(/\r?\n+/)
        .map((s) => s.trim())
        .filter((s) => s.length > 0);

      setResult(dataString);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  return (
    <div className="grid grid-cols-5 h-screen w-screen text-center bg-[#212121] text-white">
      <div className="col-span-1 bg-zinc-800"></div>

      <div className="col-span-4 p-4 flex flex-col h-full overflow-hidden">
        <div className="flex-1 overflow-y-auto min-h-0">
          <div className="text-white">
            <ul>
              {result &&
                result.map((item, index) => (
                  <li key={index} className=" text-left p-1">
                    <Answer
                      ans={item}
                      totalResult={result.length}
                      index={index}
                    />
                  </li>
                ))}
            </ul>
          </div>
        </div>

        <div className="bg-zinc-800 w-full max-w-3xl p-2 pr-3 text-white mx-auto rounded-3xl border border-zinc-700 flex items-center">
          <input
            onChange={(e) => setQuestion(e.target.value)}
            value={question}
            type="text"
            className="w-full p-3 bg-transparent outline-none"
            placeholder="Ask me anything"
          />
          <button
            onClick={askQuestion}
            disabled={loading}
            className="px-5 py-2 rounded-2xl bg-white text-black font-medium hover:bg-zinc-200 transition disabled:opacity-50"
          >
            {loading ? "Thinking..." : "Ask"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
