import { useState, useRef, useEffect } from "react";
import ChatMessage from "./ChatMessage";
import { Send } from "lucide-react";

const ChatWindow = ({ onClose }) => {
  const [messages, setMessages] = useState([
    {
      role: "bot",
      content: "Hello! 👋 I'm your gaming assistant. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  // Scroll automatically to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage = { role: "user", content: input };
    setMessages([...messages, newMessage]);
    setInput("");

    // Later we’ll replace this fake response with backend call
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          content: "Got it! (AI reply will come here after backend setup 🔄)",
        },
      ]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-20 right-6 w-80 bg-white shadow-lg rounded-2xl overflow-hidden flex flex-col border border-gray-200">
      {/* Header */}
      <div className="bg-blue-600 text-white p-3 flex justify-between items-center">
        <h3 className="text-sm font-semibold">AI Chatbot</h3>
        <button onClick={onClose} className="text-white hover:text-gray-200">
          ✖
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {messages.map((msg, index) => (
          <ChatMessage key={index} role={msg.role} content={msg.content} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-2 border-t flex items-center">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 border rounded-full px-3 py-2 text-sm outline-none"
        />
        <button
          onClick={handleSend}
          className="ml-2 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
