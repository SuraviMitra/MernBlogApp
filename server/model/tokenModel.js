import mongoose from "mongoose";

const TokenSchema = mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
});

//variable is made to export
const tokenModel = mongoose.model("token", TokenSchema);

//export
export default tokenModel;
