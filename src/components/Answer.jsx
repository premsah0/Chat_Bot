import { useEffect, useState } from "react";
import { replaceHeadingStar } from "../helper";
import { checkHeading } from "../helper";

const Answer = ({ ans, key }) => {
  const [heading, setHeading] = useState(false);
  const [answer, setAnswer] = useState(ans);
  useEffect(() => {
    if (checkHeading(ans)) {
      setHeading(true);
      setAnswer(replaceHeadingStar(ans));
    }
  }, []);
  return (
    <>
      {heading ? (
        <span className=" py-5 block text-lg ">{answer}</span>
      ) : (
        <span className=" pl-5 ">{answer}</span>
      )}
    </>
  );
};

export default Answer;
