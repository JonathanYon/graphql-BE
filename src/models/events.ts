import mongoose from "mongoose";
import { IEvents } from "../typings";

const { Schema, model } = mongoose;

const eventSchema = new Schema<IEvents>(
  {
    title: { type: String, required: true },
    start: { type: String, required: true },
    end: { type: String, required: true },
    description: { type: String },
    url: { type: String },
    isPrivate: { type: Boolean },
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export const EventModel = model<IEvents>('Event', eventSchema)