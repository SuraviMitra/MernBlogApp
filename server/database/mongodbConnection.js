import mongoose from "mongoose";

//creating a function
const mongodbConnection = async () => {
  const URL = process.env.DB_URI;

  try {
    mongoose.connect(URL, { useNewUrlParser: true });
    console.log(`Database connected successfully`);
  } catch (error) {
    console.log("Error while connecting to the database", error);
  }
};

//export
export default mongodbConnection;
