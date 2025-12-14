import { useState } from "react";
import { MessageCircle, X } from "lucide-react";

const ChatbotButton = ({ onToggle, isOpen }) => {
  return (
    <button
      onClick={onToggle}
      aria-label="Toggle Chatbot"
      className="chatbot-floating-button fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition duration-300 z-40"
    >
      {isOpen ? <X size={20} /> : <MessageCircle size={20} />}
    </button>
  );
};

export default ChatbotButton;
