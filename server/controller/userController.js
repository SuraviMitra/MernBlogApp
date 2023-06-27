//import all the packages
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import userModel from "../model/userModel.js"; //importing the userModel

//configing the dotnet
dotenv.config();

//now creating a variable for signup
export const signupUser = async (request, response) => {
  try {
    //first creating a variable for the password recieved
    //then we will use hash function to pass the password recieved
    const hashedPassword = await bcrypt.hash(request.body.password, 10);

    //requesting username name password from the user
    const user = {
      username: request.body.username,
      name: request.body.name,
      password: hashedPassword,
    };

    //if there is a new user
    const newUser = new userModel(user);
    await newUser.save();

    //after that reponse will be returned
    return response.status(200).json({ msg: "Signup successfull" });
    //if error will occur
  } catch (error) {
    return response.status(500).json({ msg: "Error while signing up user" });
  }
};

//now creating a variable for login
export const loginUser = async (request, response) => {
  let user = await userModel.findOne({ username: request.body.username });

  //if user nor valid
  if (!user) {
    return response.status(400).json({ msg: "Username does not match" });
  }

  //Now using try and catch to catch the error if occur
  try {
    let match = await bcrypt.compare(request.body.password, user.password);
    //if the password matches
    if (match) {
      const accessToken = jwt.sign(
        user.toJSON(),
        process.env.ACCESS_SECRET_KEY,
        { expiresIn: "7d" }
      );
      const refereshToken = jwt.sign(
        user.toJSON(),
        process.env.REFRESH_SECRET_KEY
      );

      const newToken = new tokenModel({ token: refereshToken });
      await newToken.save();

      response.status(200).json({
        accessToken: accessToken,
        refreshToken: refereshToken,
        name: user.username,
      });
    } else {
      response.status(400).json({ msg: "Password does not match" });
    }
  } catch (error) {
    response.status(500).json({ msg: "error while login the user" });
  }
};

//now creating logout
export const logoutUser = async (request, response) => {
  try {
    const token = request.body.token;
    await tokenModel.deleteOne({ token: token });

    response.status(204).json({ msg: "logout successfull" });
  } catch (error) {
    response.status(500).json({ msg: "error while logging out" });
  }
};
