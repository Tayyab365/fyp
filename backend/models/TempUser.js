import mongoose from "mongoose";

const tempUserSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String,
    verificationCode: String,
    expiresAt: {
      type: Date,
      expires: 900, // 900 seconds = 15 minutes
    },
  },
  { timestamps: true }
);

const TempUser = mongoose.model("TempUser", tempUserSchema);
export default TempUser;
