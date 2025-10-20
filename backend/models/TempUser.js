import mongoose from "mongoose";

const tempUserSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String, // temporarily hashed password
    verificationCode: String,
    expiresAt: Date,
  },
  { timestamps: true }
);

const TempUser = mongoose.model("TempUser", tempUserSchema);
export default TempUser;
