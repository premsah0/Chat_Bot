const Message = ({ role, text }) => {
  return (
    <div className={role === "user" ? "text-right" : "text-left"}>
      <div
        className={
          role === "user"
            ? "inline-block bg-blue-500 text-white p-3 rounded-xl"
            : "inline-block bg-zinc-700 p-3 rounded-xl"
        }
      >
        {text}
      </div>
    </div>
  );
};

export default Message;
