import { AuthenticationError } from "apollo-server-express";
import { UserModel } from "../models/users";
import { verifyToken } from "./token";


const AuthMiddleware = async (context: any) => {
    try {
      const authHeaders = context.req.headers.authorization;
      if (authHeaders) {
          const token = authHeaders.split("Bearer ")[1];
          const decode = await verifyToken(token);
          console.log("decode---", decode._id);
          // const decode: Decoded = jwt.verify(token, constant.JWT_SECRET)
          const user = await UserModel.findById(decode._id);
          

        if (user) {
          // console.log("decode--->", user);
          return user;
        } else {
          throw new AuthenticationError("Invalid/Expired Token");
        }
      } else {
        throw new Error("Unauthorized User/Register first");
      }
    } catch (err: any) {
      throw new Error(err);
    }
  };
  export default AuthMiddleware;