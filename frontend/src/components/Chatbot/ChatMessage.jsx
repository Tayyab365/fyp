const ChatMessage = ({ role, content }) => {
  const isUser = role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[75%] px-3 py-2 rounded-2xl text-sm ${
          isUser
            ? "bg-[var(--accent-blue)] hover:bg-[var(--accent-hover)] text-[var(--text-primary)] rounded-br-none"
            : "bg-[var(--bg-elevated)] text-[var(--text-secondary)] border border-[var(--border-color)] rounded-bl-none"
        }`}
      >
        {content}
      </div>
    </div>
  );
};

export default ChatMessage;
