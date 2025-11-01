import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { X } from "lucide-react";

const ChatWindow = ({ onClose }) => {
  const messagesEndRef = useRef();
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hi! 👋 I'm your gaming assistant. How can I help you?",
    },
  ]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const userId = localStorage.getItem("userId");
      const res = await axios.post("http://localhost:5000/api/chat", {
        message: input,
        userId,
      });

      if (res.data.success) {
        const botReply = { sender: "bot", text: res.data.reply };
        setMessages((prev) => [...prev, botReply]);
      } else {
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: "⚠️ AI service unavailable right now." },
        ]);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "❌ Something went wrong. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div
      className="fixed bottom-20 right-4 sm:right-6 w-72 sm:w-80 md:w-96 
      bg-white dark:bg-[var(--bg-elevated)]
      shadow-2xl rounded-3xl overflow-hidden border 
      border-gray-200 dark:border-[var(--border-color)] 
      z-50 flex flex-col transition-all duration-300"
    >
      {/* Header */}
      <div
        className="flex justify-between items-center px-4 py-3 
      bg-white dark:bg-[var(--bg-section-dark)] 
      border-b border-gray-200 dark:border-[var(--border-color)]"
      >
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <span className="font-semibold text-gray-800 dark:text-[var(--text-primary)] text-sm">
            AI Assistant
          </span>
        </div>
        <button
          onClick={onClose}
          className="text-gray-500 dark:text-[var(--text-muted)] hover:text-red-500 transition"
        >
          <X size={18} />
        </button>
      </div>

      {/* Chat Section */}
      <div
        className="overflow-y-auto px-4 py-3 space-y-3 
        bg-gradient-to-b from-white to-gray-100 
        dark:from-[var(--bg-section-dark)] dark:to-[var(--bg-section-light)]
        scrollbar-thin scrollbar-thumb-gray-300 
        dark:scrollbar-thumb-[var(--border-color)] scrollbar-track-transparent"
        style={{ maxHeight: "18rem" }}
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm shadow-sm transition-all duration-200 ${
              msg.sender === "user"
                ? "ml-auto bg-[var(--accent-blue)] text-white rounded-br-none"
                : "bg-white dark:bg-[var(--bg-card)] border border-gray-200 dark:border-[var(--border-color)] text-gray-800 dark:text-[var(--text-primary)] rounded-bl-none"
            }`}
          >
            {msg.text}
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-2 text-xs text-gray-400 dark:text-[var(--text-muted)] italic">
            <div className="w-2 h-2 bg-gray-400 dark:bg-[var(--text-muted)] rounded-full animate-bounce"></div>
            Bot is typing...
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Section */}
      <div
        className="bg-white dark:bg-[var(--bg-section-dark)] 
      border-t border-gray-200 dark:border-[var(--border-color)] 
      px-3 py-2 flex items-center gap-2"
      >
        <input
          type="text"
          className="w-[70%] sm:flex-1 text-sm border border-gray-300 dark:border-[var(--border-color)] 
          rounded-full px-3 py-2 outline-none focus:ring-2 
          focus:ring-[var(--accent-blue)] bg-white dark:bg-[var(--bg-card)] 
          text-gray-900 dark:text-[var(--text-primary)] transition"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={handleSend}
          className="bg-[var(--accent-blue)] hover:bg-[var(--accent-hover)] 
          text-white px-4 py-2 rounded-full transition font-medium text-sm"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
