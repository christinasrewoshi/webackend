import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },          
    email: { type: String, required: true, unique: true }, 
    age: { type: Number, required: true },            

    address: {
       street: String,
       city: String,
       country: String,
    },

    role: { type: String, enum: ["user", "admin"], default: "user" },

    isActive: { type: Boolean, default: true },

    hobbies: [{ type: String }],


  },
  {
    timestamps: true, 
  }
);

export default mongoose.model("User", userSchema);
