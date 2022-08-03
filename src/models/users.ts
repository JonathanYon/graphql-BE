import mongoose from "mongoose";
import { IUser } from "../typings";

const { Schema, model } = mongoose

const userSchema = new Schema<IUser>({
    username: {type: String, required: true},
    password: {type: String, required: true},
    firstName: {type: String},
    lastName: {type: String},
    email: {type: String},
    phoneNumber: {type: String},
    bio: {type: String},
    createdEvent: [{type: Schema.Types.ObjectId, ref: 'Event'}]
},
{timestamps: true}
)

export const UserModel = model<IUser>('User', userSchema)