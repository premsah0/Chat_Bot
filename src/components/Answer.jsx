import { useEffect, useState } from "react";
import {
  getLineType,
  isWrappedWithDoubleStar,
  removeWrappingDoubleStar,
  removeInlineDoubleStar,
} from "../helper";

const Answer = ({ ans, totalResult, index }) => {
  const [type, setType] = useState("normal");
  const [cleanText, setCleanText] = useState(ans);

  useEffect(() => {
    const detectedType = getLineType(ans, index, totalResult);
    setType(detectedType);

    if (isWrappedWithDoubleStar(ans)) {
      setCleanText(removeWrappingDoubleStar(ans));
    } else {
      setCleanText(removeInlineDoubleStar(ans));
    }
  }, [ans, index, totalResult]);

  return (
    <>
      {type === "main" ? (
        <span className="pt-3 block text-zinc-200 text-2xl font-bold">
          {cleanText}
        </span>
      ) : type === "sub" ? (
        <span className="pt-3 block text-white text-xl font-bold">
          {cleanText}
        </span>
      ) : (
        <span className="pl-6 block text-white text-base leading-6">
          {cleanText}
        </span>
      )}
    </>
  );
};

export default Answer;
