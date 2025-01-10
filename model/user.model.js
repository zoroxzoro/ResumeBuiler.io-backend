import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  clerkId: { type: String, required: true, unique: true },
  email: { type: String },
  name: { type: String },
  resumes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Resume" }],
});

const User = mongoose.model("User", UserSchema);
export default User;
