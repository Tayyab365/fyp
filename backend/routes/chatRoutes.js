import express from "express";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();
const router = express.Router();
console.log("🔑 OpenAI Key Exists?", !!process.env.OPENAI_API_KEY);

// ✅ Chat Route
router.post("/", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res
        .status(400)
        .json({ success: false, error: "Message required" });
    }

    // ✅ DUMMY MODE for local testing
    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === "test") {
      console.log("💡 Dummy mode active");
      let dummyReply = "";

      if (message.toLowerCase().includes("hello"))
        dummyReply = "Hi there! How can I help you today?";
      else if (message.toLowerCase().includes("price"))
        dummyReply = "Our gaming products start from Rs. 5,000.";
      else if (message.toLowerCase().includes("controller"))
        dummyReply = "We have PS5, Xbox, and RGB controllers available!";
      else
        dummyReply =
          "I'm your virtual gaming assistant — ask me about any product!";

      return res.json({ success: true, reply: dummyReply });
    }

    // ✅ Call OpenAI API (or any AI model)
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are a helpful AI assistant for a gaming products website. Answer briefly and politely.",
          },
          { role: "user", content: message },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    const reply = response.data.choices[0].message.content;
    res.json({ success: true, reply });
  } catch (error) {
    console.error("Chatbot Error:", error.response?.data || error.message);
    res.status(500).json({
      success: false,
      error: error.response?.data || error.message,
    });
  }
});

export default router;
