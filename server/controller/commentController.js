//importing the commentmodel from the model folder
import commentModel from "../model/commentModel.js";

//creating a variable for new comment
export const newComment = async (request, response) => {
  try {
    //requesting for a new comment
    const comment = new commentModel(request.body);
    //save the comment
    await comment.save();

    //giving resonse for successfully saving comment
    response.status(200).json("Comment saved successfully");
  } catch (error) {
    //if any error occure
    response.status(500).json(error);
  }
};

//creating a variable for get comment
export const getComments = async (request, response) => {
  try {
    //requestion to find comment
    const comments = await commentModel.find({ postId: request.params.id });

    //giving response to the user
    response.status(200).json(comments);
  } catch (error) {
    //if any error will occur
    response.status(500).json(error);
  }
};

//creating a variable for deleting comment
export const deleteComment = async (request, response) => {
  try {
    //requesting to find the comment
    const comment = await commentModel.findById(request.params.id);
    await comment.delete();

    //giving response
    response.status(200).json("Comment deleted successfully");
  } catch (error) {
    //if error will occur
    response.status(500).json(error);
  }
};
