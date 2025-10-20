import { useState } from "react";
import { MessageCircle, X } from "lucide-react"; // lucide-react icons use kar rahe hain

const ChatbotButton = ({ onToggle, isOpen }) => {
  return (
    <button
      onClick={onToggle}
      className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition duration-300"
    >
      {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
    </button>
  );
};

export default ChatbotButton;
