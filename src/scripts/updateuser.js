const mongoose = require("mongoose");
require("dotenv").config();
const bcrypt = require("bcryptjs");



const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    createdAt: Date,
    updatedAt: Date,
  });
  
const User = mongoose.models.User || mongoose.model("User", UserSchema, "users");
(async function run() {
  try {
    console.log("Connecting to DB:", process.env.MONGODB_URI);
    await mongoose.connect(process.env.MONGODB_URI);

    const userId = new mongoose.Types.ObjectId("67ae59b48b24598b6bafaa29");
    const hashedPassword = await bcrypt.hash("password123", 10);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        password: hashedPassword,
        updatedAt: new Date(),
      },
      { new: true }
    );

    if (!updatedUser) {
      console.log("User not found");
    } else {
      console.log("User password updated:", updatedUser);
    }
  } catch (error) {
    console.error(" Error updating instruction:", error);
  } finally {
    await mongoose.disconnect();
  }
})();