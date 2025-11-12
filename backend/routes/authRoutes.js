import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import crypto from "crypto";
import nodemailer from "nodemailer";
import TempUser from "../models/TempUser.js";

const router = express.Router();

// ✅ 1. SIGNUP - Send Verification Code
router.post("/signup", async (req, res) => {
  console.log("✅ Signup route hit");
  try {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Check if user already exists in real users
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists. Please login.",
      });
    }

    // Delete any old temp user with same email
    await TempUser.deleteOne({ email });

    // Generate 6-digit verification code
    const verificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save to TempUser
    const tempUser = new TempUser({
      name,
      email,
      password: hashedPassword,
      verificationCode,
      expiresAt: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes
    });
    await tempUser.save();

    // Setup email transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Send verification email
    await transporter.sendMail({
      from: `"GameStore Support" <${process.env.SMTP_FROM}>`,
      to: email,
      subject: "🎮 Verify Your GameStore Account",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f4f4f4;">
          <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #333; text-align: center;">Welcome to GameStore! 🎮</h2>
            <p style="color: #666; font-size: 16px;">Hi <strong>${name}</strong>,</p>
            <p style="color: #666; font-size: 16px;">Thank you for signing up! Please use the verification code below to complete your registration:</p>
            
            <div style="background-color: #4CAF50; color: white; font-size: 32px; font-weight: bold; text-align: center; padding: 20px; border-radius: 8px; margin: 20px 0; letter-spacing: 5px;">
              ${verificationCode}
            </div>
            
            <p style="color: #999; font-size: 14px; text-align: center;">This code will expire in <strong>15 minutes</strong>.</p>
            <p style="color: #999; font-size: 14px; text-align: center;">If you didn't request this, please ignore this email.</p>
          </div>
        </div>
      `,
    });

    res.status(200).json({
      success: true,
      message: "Verification code sent to your email!",
      email,
    });
  } catch (error) {
    console.error("❌ Signup Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again.",
    });
  }
});

// ✅ 2. VERIFY EMAIL - Confirm Code
router.post("/verify-email", async (req, res) => {
  try {
    const { email, code } = req.body;

    if (!email || !code) {
      return res.status(400).json({
        success: false,
        message: "Email and code are required",
      });
    }

    // Find temp user
    const tempUser = await TempUser.findOne({ email });
    if (!tempUser) {
      return res.status(400).json({
        success: false,
        message: "No signup request found. Please signup again.",
      });
    }

    // Check if code expired
    if (tempUser.expiresAt < Date.now()) {
      await TempUser.deleteOne({ email });
      return res.status(400).json({
        success: false,
        message: "Verification code expired. Please signup again.",
      });
    }

    // Check if code matches
    if (tempUser.verificationCode !== code) {
      return res.status(400).json({
        success: false,
        message: "Invalid verification code",
      });
    }

    // Create real user
    const newUser = new User({
      name: tempUser.name,
      email: tempUser.email,
      password: tempUser.password,
      role: "Customer",
      status: "Active",
      emailVerified: true,
    });
    await newUser.save();

    // Delete temp user
    await TempUser.deleteOne({ email });

    res.status(200).json({
      success: true,
      message: "Email verified successfully! You can now login.",
    });
  } catch (error) {
    console.error("❌ Verification Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during verification",
    });
  }
});

// ✅ 3. LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check if email is verified
    if (!user.emailVerified) {
      return res.status(403).json({
        success: false,
        message: "Please verify your email first",
      });
    }

    // Check if account is blocked
    if (user.status === "Blocked") {
      return res.status(403).json({
        success: false,
        message: "Your account has been blocked. Contact support.",
      });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      success: true,
      message: "Login successful!",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("❌ Login Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during login",
    });
  }
});

// ✅ 4. FORGOT PASSWORD - Send Reset Link
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const user = await User.findOne({ email });

    // Always return success (security best practice)
    if (!user) {
      return res.status(200).json({
        success: true,
        message: "If that email exists, a reset link has been sent.",
      });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    // Create reset link
    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}&email=${email}`;

    // Setup email transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Send reset email
    await transporter.sendMail({
      from: `"GameStore Support" <${process.env.SMTP_FROM}>`,
      to: email,
      subject: "🔐 Reset Your Password",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f4f4f4;">
          <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #333; text-align: center;">Password Reset Request</h2>
            <p style="color: #666; font-size: 16px;">Hi <strong>${user.name}</strong>,</p>
            <p style="color: #666; font-size: 16px;">You requested to reset your password. Click the button below to proceed:</p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetLink}" style="background-color: #2196F3; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
                Reset Password
              </a>
            </div>
            
            <p style="color: #999; font-size: 14px; text-align: center;">Or copy this link:</p>
            <p style="color: #2196F3; font-size: 12px; word-break: break-all; text-align: center;">${resetLink}</p>
            
            <p style="color: #999; font-size: 14px; text-align: center; margin-top: 20px;">This link will expire in <strong>1 hour</strong>.</p>
            <p style="color: #999; font-size: 14px; text-align: center;">If you didn't request this, please ignore this email.</p>
          </div>
        </div>
      `,
    });

    res.status(200).json({
      success: true,
      message: "If that email exists, a reset link has been sent.",
    });
  } catch (error) {
    console.error("❌ Forgot Password Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again.",
    });
  }
});

// ✅ 5. RESET PASSWORD - Verify Token & Update
router.post("/reset-password", async (req, res) => {
  try {
    const { email, token, password } = req.body;

    if (!email || !token || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Find user with valid token
    const user = await User.findOne({
      email,
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired reset link",
      });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;

    // Clear reset token
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password reset successful! You can now login.",
    });
  } catch (error) {
    console.error("❌ Reset Password Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again.",
    });
  }
});

export default router;
