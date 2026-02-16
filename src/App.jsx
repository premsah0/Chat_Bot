import { use, useState } from "react";
import { GEMINI_BASE_URL } from "./constants";
import "./App.css";

function App() {
  const [question, setQuestion] = useState("");
  const [result, setResult] = useState(undefined)

  const askQuestion = async () => {
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
        "x-goog-api-key": import.meta.env.VITE_GEMINI_API_KEY,
      },
      body: JSON.stringify(payload),
    });

    response = await response.json();
    let dataString = response.candidates[0].content.parts[0].text;
    dataString = dataString.split("* ")
    dataString = dataString.map((item)=> item.trim())

      console.log(dataString);
      
    // console.log(data.candidates[0].content.parts[0].text);
    setResult(dataString);
    
    
  };

  return (
    <div className="grid grid-cols-5 h-screen  w-screen text-center bg-[#212121] text-white">
      <div className="col-span-1 bg-zinc-800"></div>

      <div className="col-span-4 p-4 flex flex-col">
        <div className=" container flex-1 mx-auto overflow-y-auto  ">
          {result}
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
            className="px-5 py-2 rounded-2xl bg-white text-black font-medium hover:bg-zinc-200 transition"
          >
            Ask
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
