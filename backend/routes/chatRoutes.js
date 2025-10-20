import express from "express";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();
const router = express.Router();

// ✅ Chat Route
router.post("/", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res
        .status(400)
        .json({ success: false, error: "Message required" });
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
    console.error("Chatbot Error:", error.message);
    res.status(500).json({
      success: false,
      error: "AI service unavailable. Please try again later.",
    });
  }
});

export default router;
