//importing the mongoose
import mongoose from "mongoose";

//creating model
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

//making a variable for exporting the schema
const userModel = mongoose.model("user", userSchema);

//now export the userModel
export default userModel;
