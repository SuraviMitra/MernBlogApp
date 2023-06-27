import grid from "gridfs-stream";
import mongoose from "mongoose";
import dotenv from "dotenv";

//configure the database
dotenv.config();

//create a variable url containing the base address stored in the .env file
const url = process.env.BASE_URL;

let gfs, gridfsBucket;
const conn = mongoose.connection;

conn.once("open", () => {
  gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "fs",
  });

  gfs = grid(conn.db, mongoose.mongo);
  gfs.collection("fs");
});

//creating a variable to uploadimage
export const uploadImage = (request, response) => {
  //if the file does noe exist and not found
  if (!request.file) {
    return response.status(404).json("File not found");
  }

  const imageUrl = `${url}/file/${request.file.filename}`;

  response.status(200).json(imageUrl);
};

////creating a variable to get image
export const getImage = async (request, response) => {
  try {
    const file = await gfs.files.findOne({ filename: request.params.filename });
    const readStream = gridfsBucket.openDownloadStream(file._id);
    readStream.pipe(response);
  } catch (error) {
    //if error will occur
    response.status(500).json({ msg: error.message });
  }
};
