import express from "express";
import dotenv from "dotenv";
import axios from "axios";
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import User from "../models/User.js";

dotenv.config();
const router = express.Router();

// ✅ AI Response Function (Works with ANY API)
async function getAIResponse(message) {
  const AI_API_KEY = process.env.AI_API_KEY;
  const AI_MODEL = process.env.AI_MODEL || "gpt-3.5-turbo";
  const AI_API_URL =
    process.env.AI_API_URL || "https://api.openai.com/v1/chat/completions";

  // If no API key, return fallback
  if (!AI_API_KEY) {
    return "⚠️ AI service is currently unavailable. Please contact support.";
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
            Only answer questions about products, orders, shipping, and support.
            If the user asks anything unrelated, reply: "I'm sorry, I can only assist with ShopEase store questions."
            Keep responses short and helpful.`,
          },
          { role: "user", content: message },
        ],
        temperature: 0.7,
        max_tokens: 150,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AI_API_KEY}`,
        },
        timeout: 10000, // 10 second timeout
      }
    );

    return response.data.choices[0].message.content.trim();
  } catch (error) {
    console.error("AI API Error:", error.response?.data || error.message);
    return "⚠️ AI is temporarily unavailable. Please try again later.";
  }
}

// ✅ Main Chat Route
router.post("/", async (req, res) => {
  try {
    const { message, userId } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        success: false,
        error: "Message is required",
      });
    }

    // ✅ Check if user is logged in (Simple check)
    if (!userId) {
      return res.status(401).json({
        success: false,
        error: "Please login to use the chatbot",
      });
    }

    const lowerMsg = message.toLowerCase();
    let reply = "";

    // ✅ Command: Check Orders
    if (lowerMsg.includes("order") || lowerMsg.includes("my order")) {
      const orders = await Order.find({ userId }).sort({ createdAt: -1 });

      if (orders.length === 0) {
        reply =
          "You haven't placed any orders yet. Browse our shop to find amazing games! 🎮";
      } else {
        const latestOrder = orders[0];
        const orderStatus = latestOrder.status || "Processing";
        reply = `You have ${orders.length} order(s). Latest order status: **${orderStatus}**. Need more details? Check your profile!`;
      }
    }
    // ✅ Command: Check Products
    else if (
      lowerMsg.includes("product") ||
      lowerMsg.includes("items") ||
      lowerMsg.includes("game")
    ) {
      const products = await Product.find().limit(5);

      if (products.length === 0) {
        reply = "No products available right now. Check back soon! 🎮";
      } else {
        const names = products.map((p) => p.name).join(", ");
        reply = `We have amazing games like: **${names}**. Want to see more? Visit our shop! 🛒`;
      }
    }
    // ✅ Command: User Count (Admin-like info)
    else if (
      lowerMsg.includes("user") ||
      lowerMsg.includes("customer") ||
      lowerMsg.includes("account")
    ) {
      const userCount = await User.countDocuments();
      reply = `We currently have **${userCount}** registered customers on ShopEase! 🎉`;
    }
    // ✅ Command: Help
    else if (
      lowerMsg.includes("help") ||
      lowerMsg === "hi" ||
      lowerMsg === "hello"
    ) {
      reply = `Hi! 👋 I can help you with:
      - Check your **orders** status
      - Browse our **products/games**
      - Get **customer count** info
      - Answer general questions about ShopEase
      
      Just ask me anything!`;
    }
    // ✅ Use AI for everything else
    else {
      reply = await getAIResponse(message);
    }

    res.json({ success: true, reply });
  } catch (error) {
    console.error("Chatbot Error:", error);
    res.status(500).json({
      success: false,
      error: "Something went wrong with the chatbot. Please try again.",
    });
  }
});

export default router;
