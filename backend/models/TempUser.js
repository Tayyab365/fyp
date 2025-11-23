import mongoose from "mongoose";

const tempUserSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String,
    verificationCode: String,
    expiresAt: {
      type: Date,
      expires: 900,
    },
  },
  { timestamps: true }
);

const TempUser = mongoose.model("TempUser", tempUserSchema);
export default TempUser;
