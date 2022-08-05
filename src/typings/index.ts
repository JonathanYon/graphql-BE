import { Types } from "mongoose";

export interface IUser {
  _id?: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  bio: string;
  createdEvent: Types.ObjectId[];
}
export interface FullUserInput {
    user: Omit<IUser, 'username' | 'password' | 'createdEvent'>
}

export interface IEvents {
  id?: string;
  title: string;
  start: string;
  end: string;
  description: string;
  url: string;
  isPrivate: boolean;
  createdBy: Types.ObjectId;
}

export interface CreateEvent {
  event: Omit<IEvents, 'url' | 'createdBy'>
}

export type UserInput = {
  userSignUpInput: {
    username: string;
    password: string;
    confirmPassword?: string;
  };
};

