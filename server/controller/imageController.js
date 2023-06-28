import Grid from "gridfs-stream";
<<<<<<< HEAD
import { GridFSBucket } from "mongodb";
=======
>>>>>>> 311273ad192cef0a236e122aac3b184d80aaad8c
import mongoose from "mongoose";
import dotenv from "dotenv";

//configure the database
dotenv.config();

//create a variable url containing the base address stored in the .env file
const url = process.env.BASE_URL;

let gfs, gridfsBucket;
const conn = mongoose.connection;

conn.once("open", () => {
  gridfsBucket = new GridFSBucket(conn.db, {
    bucketName: "fs",
  });

  gfs = Grid(conn.db, mongoose.mongo);
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
    const file = await gridfsBucket
      .find({ filename: request.params.filename })
      .toArray();
    if (!file || file.length == 0) {
      return response.status(404).json({ msg: "File not found" });
    }
    const readStream = gridfsBucket.openDownloadStream(file[0]._id);
    readStream.pipe(response);
  } catch (error) {
    //if error will occur
    response.status(500).json({ msg: error.message });
  }
};
