// Detect if fully wrapped with **text**
export function isWrappedWithDoubleStar(str) {
  if (typeof str !== "string") return false;
  const s = str.trim();
  return /^\*\*.*\*\*$/.test(s);
}

// Remove wrapping ** from start and end only
export function removeWrappingDoubleStar(str) {
  if (typeof str !== "string") return str;
  return str
    .trim()
    .replace(/^\*\*|\*\*$/g, "")
    .trim();
}

// Remove inline ** anywhere in text
export function removeInlineDoubleStar(str) {
  if (typeof str !== "string") return str;
  return str.replace(/\*\*/g, "");
}

// Determine type of line
export function getLineType(str, index, totalResult) {
  if (!str) return "normal";

  if (index === 0 && totalResult > 1) {
    return "main";
  }

  if (isWrappedWithDoubleStar(str)) {
    return "sub";
  }

  return "normal";
}
