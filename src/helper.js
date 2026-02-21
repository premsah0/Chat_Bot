// Clean Gemini output and return line-by-line text
export const cleanGeminiText = (text) => {
  if (!text) return [];

  return text
    .replace(/^\s*[*\-•]\s+/gm, "")
    .replace(/\*\*/g, "")
    .split(/\r?\n+/)
    .map((line) => line.trim())
    .filter(Boolean);
};
