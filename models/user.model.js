import mongoose from "mongoose";
import bcrypt from "bcrypt"; 

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },          
    email: { type: String, required: true, unique: true }, 
    age: { type: Number },            

    password: {
    type: String,
    required: true,
    minlength: 6
  },
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

userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model('User', userSchema);
