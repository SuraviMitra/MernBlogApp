import mongoose from "mongoose";

const PostSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: false,
  },
  picture: {
    type: String,
    requires: false,
  },
  username: {
    type: String,
    required: true,
  },
  categories: {
    type: Array,
    required: false,
  },
  createdDate: {
    type: Date,
  },
});

//creating variable to export
const postModel = mongoose.model("post", PostSchema);

//export
export default postModel;
