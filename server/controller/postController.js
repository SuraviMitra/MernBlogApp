//importing the postModel from the model that we have created
import postModel from "../model/postModel.js";

//creating a variable for create post operation
export const createPost = async (request, response) => {
  try {
    const post = await new postModel(request.body);
    post.save();

    response.status(200).json("Post saved successfully");
  } catch (error) {
    response.status(500).json(error);
  }
};

//creating a varible for update post
export const updatePost = async (request, response) => {
  try {
    const post = await postModel.findById(request.params.id);

    //if the post not found
    if (!post) {
      response.status(404).json({ msg: "Post not found" });
    }

    //if post found
    await postModel.findByIdAndUpdate(request.params.id, {
      $set: request.body,
    });

    response.status(200).json("post updated successfully");
    //if error occur
  } catch (error) {
    response.status(500).json(error);
  }
};

//creating a varible for delete post
export const deletePost = async (request, response) => {
  try {
    const post = await postModel.findById(request.params.id);
    //after the post found
    await post.delete();

    response.status(200).json("Post deleted successfully");
  } catch (error) {
    //if error will occur and post will not get deleted
    response.status(500).json(error);
  }
};

//creating a varible for get post
export const getPost = async (request, response) => {
  try {
    const post = await postModel.findById(request.params.id);
    //after the post found
    response.status(200).json(post);
  } catch (error) {
    //if error will occur
    response.status(500).json(error);
  }
};

//creating a varible for getting all post
export const getAllPosts = async (request, response) => {
  //creating variable to get the post by username,category & posts
  let username = request.query.username;
  let category = request.query.category;
  let posts;

  try {
    if (username) {
      posts = await postModel.find({ username: username });
    } else if (category) {
      posts = await postModel.find({ categories: category });
    } else {
      posts = await postModel.find({});
    }

    response.status(200).json(posts);
  } catch (error) {
    //if error will occur
    response.status(500).json(error);
  }
};
