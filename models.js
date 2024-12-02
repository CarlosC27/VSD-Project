import mongoose from "mongoose";

let models = {};

await mongoose.connect('mongodb+srv://INFO441CACS:INFO441A1@info441.hyqcc.mongodb.net/VSD?retryWrites=true&w=majority&appName=INFO441');

console.log("successfully connected to mongodb!");
const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    musicMinutes: {
        appleMusic: { type: Number, default: 0 },
        spotify: { type: Number, default: 0 },
        youtube: { type: Number, default: 0 },
      },
      queueSpot: { type: Number, default: 0 },
  });
  models.User = mongoose.model("User", userSchema);

export default models;