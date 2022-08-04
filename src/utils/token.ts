import jwt from "jsonwebtoken";

import {IUser} from "../typings"
import { constant } from "../config/constant";

type Decoded = {
    _id: string
}

export const newToken = (user: IUser) => {
    return jwt.sign(
        {
          id: user._id,
          username: user.username,
        },
        constant.JWT_SECRET,
        { expiresIn: "1h" }
      );
}

export const verifyToken = (token: string) =>
  new Promise<Decoded>((resolve, reject) =>
    jwt.verify(token, constant.JWT_SECRET, (err, decodedToken) => {
      if (err) reject(err);
      resolve(decodedToken as Decoded);
    })
  );