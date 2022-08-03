import { Types } from "mongoose"


export interface IUser {
    username: string
    password: string
    firstName: string
    lastName: string
    email: string
    phoneNumber: string
    bio: string
    createdEvent: Types.ObjectId[]
}

export interface IEvents {
    id? : string
    title: string
    start: string
    end: string
    description: string
    url: string
    isPrivate: boolean
    createdBy: Types.ObjectId
}