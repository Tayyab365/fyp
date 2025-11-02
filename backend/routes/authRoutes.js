import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import crypto from "crypto";
import nodemailer from "nodemailer";
import TempUser from "../models/TempUser.js";

const router = express.Router();

// ✅ Signup Route (FINAL) with verification email
// router.post("/signup", async (req, res) => {
//   console.log("✅ Signup route hit");
//   console.log("Body received:", req.body);
//   try {
//     const { name, email, password } = req.body;

//     // 1️⃣ Check if user already exists in real users
//     const existingUser = await User.findOne({ email });
//     if (existingUser)
//       return res
//         .status(400)
//         .json({ success: false, message: "User already exists" });

//     // 2️⃣ Delete any old temp user
//     await TempUser.deleteOne({ email });

//     // 3️⃣ Generate 6-digit verification code
//     const verificationCode = Math.floor(
//       100000 + Math.random() * 900000
//     ).toString();

//     // 4️⃣ Hash password temporarily
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // 5️⃣ Save temp user
//     const tempUser = new TempUser({
//       name,
//       email,
//       password: hashedPassword,
//       verificationCode,
//       expiresAt: new Date(Date.now() + 15 * 60 * 1000),
//     });
//     await tempUser.save();

//     // 6️⃣ Send verification email
//     const transporter = nodemailer.createTransport({
//       host: process.env.SMTP_HOST,
//       port: process.env.SMTP_PORT,
//       auth: {
//         user: process.env.SMTP_USER,
//         pass: process.env.SMTP_PASS,
//       },
//     });

//     await transporter.sendMail({
//       from: `"GameStore Support" <${process.env.SMTP_FROM}>`,
//       to: email,
//       subject: "Verify your GameStore Account",
//       html: `
//         <h3>Hi ${name},</h3>
//         <p>Your verification code is:</p>
//         <h2>${verificationCode}</h2>
//         <p>This code will expire in 15 minutes.</p>
//       `,
//     });

//     res.status(200).json({
//       success: true,
//       message: "Verification code sent to your email.",
//       email,
//     });
//   } catch (error) {
//     console.error("Signup Error:", error);
//     res
//       .status(500)
//       .json({ success: false, message: "Server error during signup" });
//   }
// });

router.post("/signup", async (req, res) => {
  console.log("✅ TEMP Signup route hit");
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: "Customer",
    });

    await newUser.save();

    res.status(200).json({
      success: true,
      message: "Signup successful. You can now login.",
    });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during signup",
    });
  }
});

router.post("/verify-email", async (req, res) => {
  try {
    const { email, code } = req.body;

    // 1️⃣ Find temp user
    const tempUser = await TempUser.findOne({ email });
    if (!tempUser)
      return res
        .status(400)
        .json({ success: false, message: "No signup request found" });

    // 2️⃣ Check if code matches and not expired
    if (tempUser.verificationCode !== code)
      return res
        .status(400)
        .json({ success: false, message: "Invalid verification code" });

    if (tempUser.expiresAt < Date.now())
      return res
        .status(400)
        .json({ success: false, message: "Verification code expired" });

    // 3️⃣ Move temp user → real user
    const newUser = new User({
      name: tempUser.name,
      email: tempUser.email,
      password: tempUser.password,
      role: "Customer",
    });
    await newUser.save();

    // 4️⃣ Delete temp user
    await TempUser.deleteOne({ email });

    res.status(200).json({
      success: true,
      message: "Email verified successfully! You can now log in.",
    });
  } catch (error) {
    console.error("Verification Error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error during verification" });
  }
});

// ✅ Login Route
// ✅ Login Route (DEBUG MODE)
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("🟢 Login attempt for:", email);
    console.log("Entered Password:", password);

    const user = await User.findOne({ email });

    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    console.log("Stored Hashed Password:", user.password);

    if (user.status === "Blocked") {
      return res.status(403).json({
        success: false,
        message: "Your account has been blocked. Please contact admin.",
      });
    }
    // if (!user.emailVerified) {
    //   return res
    //     .status(403)
    //     .json({ success: false, message: "Please verify your email first." });
    // }
    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password Match Result:", isMatch);

    if (!isMatch)
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });

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
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error during login",
    });
  }
});

// ✅ Forgot Password
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(200).json({
        success: true,
        message: "If that email exists, a reset link has been sent.",
      });
    }

    const token = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600 * 1000; // 1 hour
    await user.save();

    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}&email=${email}`;

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"GameStore Support" <${process.env.SMTP_FROM}>`,
      to: email,
      subject: "Password Reset Request",
      html: `
        <p>You requested a password reset.</p>
        <p>Click <a href="${resetLink}">here</a> to reset your password.</p>
        <p>This link will expire in 1 hour.</p>
      `,
    });

    res.status(200).json({
      success: true,
      message: "If that email exists, a reset link has been sent.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ✅ FIXED Reset Password Route
router.post("/reset-password", async (req, res) => {
  const { email, token, password } = req.body;
  try {
    // 🔹 Fix: Match both email & token properly and check expiry
    const user = await User.findOne({
      email,
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired token." });

    // 🔹 Fix: Always hash the new password manually
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;

    // 🔹 Clear reset token fields
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Password reset successful. You can now login.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ✅ Test Mail Route
// router.get("/test-mail", async (req, res) => {
//   try {
//     const transporter = nodemailer.createTransport({
//       host: process.env.SMTP_HOST,
//       port: process.env.SMTP_PORT,
//       secure: false,
//       auth: {
//         user: process.env.SMTP_USER,
//         pass: process.env.SMTP_PASS,
//       },
//     });

//     await transporter.sendMail({
//       from: process.env.SMTP_FROM,
//       to: process.env.SMTP_USER,
//       subject: "Test Email from FYP",
//       text: "This is a test email from your FYP backend",
//     });

//     res.status(200).json({
//       success: true,
//       message: "Test email sent successfully!",
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to send email",
//       error: error.message,
//     });
//   }
// });

export default router;
