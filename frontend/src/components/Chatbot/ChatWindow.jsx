import React, { useState } from "react";
import axios from "axios";
import { X } from "lucide-react";
import { useEffect, useRef } from "react";

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
      const userId = localStorage.getItem("userId"); // ya token se decode kar lo
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
    <div className="fixed bottom-20 right-6 w-80 bg-white shadow-lg rounded-2xl border border-gray-200 overflow-hidden z-50">
      <div className="flex justify-between items-center p-3 bg-blue-600 text-white">
        <span className="font-semibold">AI Chatbot</span>
        <button onClick={onClose}>
          <X size={20} />
        </button>
      </div>

      <div className="h-72 overflow-y-auto p-3 space-y-2 bg-gray-50">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-2 rounded-xl max-w-[80%] ${
              msg.sender === "user"
                ? "bg-blue-500 text-white ml-auto"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            {msg.text}
          </div>
        ))}
        {loading && (
          <div className="text-sm text-gray-400 italic">Bot is typing...</div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-3 flex gap-2 border-t">
        <input
          type="text"
          className="flex-1 border rounded-lg px-3 py-1 text-sm outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
