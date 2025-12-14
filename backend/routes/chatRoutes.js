import express from "express";
import dotenv from "dotenv";
import axios from "axios";
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import User from "../models/User.js";

dotenv.config();
const router = express.Router();

const isRecommendationQuery = (msg) => {
  return (
    msg.includes("best") ||
    msg.includes("recommend") ||
    msg.includes("suggest") ||
    msg.includes("which") ||
    msg.includes("compare") ||
    msg.includes("better") ||
    msg.includes("under")
  );
};

const isListingQuery = (msg) => {
  return (
    msg.includes("show") ||
    msg.includes("list") ||
    msg.includes("products") ||
    msg.includes("items") ||
    msg.includes("available")
  );
};

async function getAIResponse(message) {
  const AI_API_KEY = process.env.AI_API_KEY;
  const AI_MODEL = process.env.AI_MODEL || "gpt-3.5-turbo";
  const AI_API_URL =
    process.env.AI_API_URL || "https://api.openai.com/v1/chat/completions";

  if (!AI_API_KEY) {
    return "⚠️ AI is not configured. Please contact admin.";
  }

  try {
    const response = await axios.post(
      AI_API_URL,
      {
        model: AI_MODEL,
        messages: [
          {
            role: "system",
            content: `You are an AI assistant for a gaming e-commerce store called ShopEase.
You help users with gaming products like mouse, keyboard, headset, controller.
Give clear and specific answers. Do NOT repeat generic replies.`,
          },
          { role: "user", content: message },
        ],
        temperature: 0.8,
        max_tokens: 150,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AI_API_KEY}`,
        },
      }
    );

    return response.data.choices[0].message.content.trim();
  } catch (error) {
    console.error("AI API Error:", error.response?.data || error.message);
    return "⚠️ AI is temporarily unavailable. Please try again later.";
  }
}

router.post("/", async (req, res) => {
  try {
    const { message, userId } = req.body;

    if (!message || !message.trim()) {
      return res
        .status(400)
        .json({ success: false, error: "Message required" });
    }

    if (!userId) {
      return res.status(401).json({ success: false, error: "Login required" });
    }

    const lowerMsg = message.toLowerCase();
    let reply = "";

    if (lowerMsg.includes("order")) {
      const orders = await Order.find({ userId }).sort({ createdAt: -1 });
      reply =
        orders.length === 0
          ? "You haven't placed any orders yet."
          : `Your latest order status is **${
              orders[0].status || "Processing"
            }**.`;
    } else if (isRecommendationQuery(lowerMsg)) {
      reply = await getAIResponse(message);
    } else if (
      isListingQuery(lowerMsg) ||
      lowerMsg.includes("mouse") ||
      lowerMsg.includes("keyboard") ||
      lowerMsg.includes("headset") ||
      lowerMsg.includes("controller")
    ) {
      const products = await Product.find().limit(5);

      reply =
        products.length === 0
          ? "No products available right now."
          : `Available products: ${products.map((p) => p.name).join(", ")}.`;
    } else if (
      lowerMsg === "hi" ||
      lowerMsg === "hello" ||
      lowerMsg.includes("help")
    ) {
      reply =
        "Hi! 👋 Ask me for product recommendations, order status, or available items.";
    } else {
      reply = await getAIResponse(message);
    }

    res.json({ success: true, reply });
  } catch (error) {
    console.error("Chatbot Error:", error);
    res.status(500).json({
      success: false,
      error: "Chatbot error",
    });
  }
});

export default router;
