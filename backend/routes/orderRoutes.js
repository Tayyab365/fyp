import express from "express";
import Order from "../models/Order.js";

const router = express.Router();

// ✅ Create Order
router.post("/", async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    const savedOrder = await newOrder.save();

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order: savedOrder,
    });
  } catch (error) {
    console.error("Error creating order:", error.message);
    res.status(500).json({
      success: false,
      message: "Error creating order",
      error: error.message,
    });
  }
});

// ✅ Get All Orders
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching orders:", error.message);
    res.status(500).json({
      success: false,
      message: "Error fetching orders",
      error: error.message,
    });
  }
});

// ✅ Delete Order
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Order.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });

    res.json({ success: true, message: "Order deleted successfully" });
  } catch (error) {
    console.error("Error deleting order:", error.message);
    res.status(500).json({
      success: false,
      message: "Error deleting order",
      error: error.message,
    });
  }
});

// ✅ Update Order Status (Mark Completed / Cancel)
router.put("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      message: `Order marked as ${status}`,
      order,
    });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({
      success: false,
      message: "Error updating order status",
      error: error.message,
    });
  }
});

router.get("/user-orders-count", async (req, res) => {
  try {
    const result = await Order.aggregate([
      { $group: { _id: "$userId", totalOrders: { $sum: 1 } } },
    ]);

    res.json({ success: true, data: result });
  } catch (error) {
    console.error("Error fetching user order count:", error.message);
    res.status(500).json({
      success: false,
      message: "Error fetching user order count",
      error: error.message,
    });
  }
});

export default router;
