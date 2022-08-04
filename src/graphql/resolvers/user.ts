import bcrypt from 'bcrypt'

import { UserModel } from "../../models/users";
import passwordValidate from "../../utils/passwordValidate";
import { newToken } from '../../utils/token';

type UserInput = {
  userSignUpInput: {
    username: string;
    password: string;
    confirmPassword?: string
  };
};

export const userResolvers = {
  Query: {
    getUser: async (parent: unknown) => {
      try {
        console.log("parent--->", parent);

        const user = await UserModel.find();
        console.log("user--->", user);

        return await UserModel.find()
      } catch (err) {
        console.log(err);
      }
    },
  },
  Mutation: {
    // register: async(_: unknown, {username, password}: UserInput) => {
      signUp: async (
      _: any,
      {userSignUpInput}: UserInput
    ) => {
      try {
        const user = await UserModel.findOne({username: userSignUpInput.username})
        if(user){
          throw new Error('username is taken choose unique one')
        }
        if(!passwordValidate(userSignUpInput.password)){
          throw new Error("Password doesn't meet password requirements.")
        }
        if(userSignUpInput.password !== userSignUpInput.confirmPassword){
          throw new Error("Password and confirm password don't match.")
        }
        const hashedPassword = await bcrypt.hash(userSignUpInput.password, 12)
        const newUser = new UserModel({ username: userSignUpInput.username, password: hashedPassword });
        // console.log("user--->", newUser);
        const savedUser = await newUser.save();
        const token = newToken(savedUser)
        return {
          //this keys should match to the output keys in the signup mutation Auth
          id: savedUser._id,
          username: savedUser.username,
          tokenExpire: 60,
          token
        };
      

      } catch (err) {
        console.log(err);
      }
    },
  },
};
