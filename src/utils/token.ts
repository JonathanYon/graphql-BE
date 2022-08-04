import jwt from "jsonwebtoken";

import {IUser} from "../typings"
import { constant } from "../config/constant";

type Decoded = {
    _id: string
}

export const newToken =  (user: IUser) => {
    return jwt.sign(
        {
          _id: user._id,
          username: user.username,
        },
        constant.JWT_SECRET,
        { expiresIn: "1h" }
      );
}

export const verifyToken = async (token: string) => {
  return new Promise<Decoded>((resolve, reject) =>
    jwt.verify(token, constant.JWT_SECRET, (err, decodedToken) => {
          // console.log("decodedToken---", decodedToken);
      if (err) {
        reject(err);
      } else {
        resolve(decodedToken as Decoded);
      }
    })
  );
};