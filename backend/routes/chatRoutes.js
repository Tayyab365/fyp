import express from "express";
import dotenv from "dotenv";
import axios from "axios";
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import User from "../models/User.js";

dotenv.config();
const router = express.Router();

// ✅ Helper: call OpenAI only if key available
async function getAIResponse(message) {
  if (!process.env.OPENAI_API_KEY) {
    return `You said: ${message}`;
  }

  const response = await axios.post(
    "https://api.openai.com/v1/chat/completions",
    {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are an AI assistant for a gaming e-commerce store called ShopEasee.
          Only answer questions about products, orders, shipping, and support.
          If the user asks anything unrelated, reply: "I'm sorry, I can only assist with ShopEase store questions."`,
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

  return response.data.choices[0].message.content;
}

// ✅ Chat Route
router.post("/", async (req, res) => {
  try {
    const { message, userId } = req.body;

    if (!message) {
      return res
        .status(400)
        .json({ success: false, error: "Message required" });
    }

    const lowerMsg = message.toLowerCase();
    let reply = "";

    // 🧠 INTENT DETECTION
    if (lowerMsg.includes("order")) {
      if (!userId) {
        reply = "Please log in to check your orders.";
      } else {
        const orders = await Order.find({ userId });
        if (orders.length === 0) reply = "You have no orders yet.";
        else {
          reply = `You have ${orders.length} order(s). Latest: ${
            orders[orders.length - 1].status || "Processing"
          }.`;
        }
      }
    } else if (lowerMsg.includes("product") || lowerMsg.includes("items")) {
      const products = await Product.find().limit(3);
      const names = products.map((p) => p.name).join(", ");
      reply = `We currently have products like ${names}. Would you like to see more?`;
    } else if (lowerMsg.includes("user") || lowerMsg.includes("account")) {
      const users = await User.countDocuments();
      reply = `We currently have ${users} registered customers on ShopEase.`;
    } else {
      // 🧠 fallback to AI
      reply = await getAIResponse(message);
    }

    res.json({ success: true, reply });
  } catch (error) {
    console.error("Chatbot Error:", error.message);
    res
      .status(500)
      .json({ success: false, error: "Something went wrong with chatbot." });
  }
});

export default router;
