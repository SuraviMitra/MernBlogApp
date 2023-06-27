import express from "express";
import {
  createPost,
  updatePost,
  deletePost,
  getPost,
  getAllPosts,
} from "../controller/postController.js";
import { uploadImage, getImage } from "../controller/imageController.js";
import {
  newComment,
  getComments,
  deleteComment,
} from "../controller/commentController.js";
import {
  loginUser,
  signupUser,
  logoutUser,
} from "../controller/userController.js";
import {
  authenticateToken,
  createNewToken,
} from "../controller/tokenController.js";
import upload from "../controller/fileUpload.js";

//make a variable for router
const router = express.Router();

//now creating Routes

//for user-->userController.js
router.post("/login", loginUser);
router.post("/signup", signupUser);
router.post("/logout", logoutUser);

//for creatingtoken--->tokenController.js
router.post("/token", createNewToken);

//for create update and delete post--->postController.js
router.post("/create", authenticateToken, createPost);
router.put("/update/:id", authenticateToken, updatePost);
router.delete("/delete/:id", authenticateToken, deletePost);

//for image-->imageController.js
router.get("/post/:id", authenticateToken, getPost);
router.get("/posts", getAllPosts);

//for file---->file upload.js
router.post("/file/upload", upload.single("file"), uploadImage);
router.get("/file/:filename", getImage);

//for comment--->commentController.js
router.post("/comment/new", authenticateToken, newComment);
router.get("/comments/:id", authenticateToken, getComments);
router.delete("/comment/delete/:id", authenticateToken, deleteComment);

//now export the routes
export default router;
