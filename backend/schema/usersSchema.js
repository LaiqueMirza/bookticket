import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    }
  });

const User = new mongoose.model("User", usersSchema);

export default User;
