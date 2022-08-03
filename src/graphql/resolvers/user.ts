import { Types } from "mongoose";
import { UserModel } from "../../models/users";

type UserInput = {
  input: {
    username: string;
    password: string;
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
    register: async (
      _: any,
      {input}: UserInput,
      ctx: any
    ) => {
      try {
        const user = new UserModel({ username: input.username, password: input.password });
        console.log("user--->", user);
        const savedUser = await user.save();
        console.log("parent--->", ctx);
        return {
          _id: savedUser._id,
          username: savedUser.username,
        };
      } catch (err) {
        console.log(err);
      }
    },
  },
};
