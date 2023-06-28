//importing all the required files
import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";
import dotenv from "dotenv";

//Now configuring the database
dotenv.config();

//Now creating a variable storage
const storage = new GridFsStorage({
  url: process.env.DB_URI,
  options: { useNewUrlParser: true },
  file: (_request, file) => {
    const match = ["image/png", "image/jpg", "image/jpeg"];
    if (match.indexOf(file.memetype) === -1) {
      return `${Date.now()}-blog-${file.originalname}`;
    }

    return {
      bucketName: "photos",
      filename: `${Date.now()}-blog-${file.originalname}`,
    };
  },
});

//exporting
export default multer({ storage });
