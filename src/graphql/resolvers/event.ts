import { AuthenticationError } from "apollo-server-express";
import { constant } from "../../config/constant";

import { EventModel } from "../../models/events";
import { CreateEvent } from "../../typings"
import AuthMiddleware from "../../utils/auth"

export const eventResolvers = {
    
    Mutation: {
        createEvent: async(_: any, {event}: CreateEvent, ctx:any): Promise<{id: string} | undefined> => {
            try {
                const user = await AuthMiddleware(ctx)
                if(!user){
                    throw new AuthenticationError('Unauthenticated');
                }

                const userEvent = new EventModel({
                    title: event.title,
                    start: event.start,
                    end: event.end,
                    description: event.description,
                    isPrivate: event.isPrivate,
                    createdBy: user._id
                })
                await userEvent.save()
                userEvent.url = `${constant.URI}/sharedEvent/${userEvent._id}`
                userEvent.save({timestamps: false})
                return {
                    id: userEvent._id.toString()
                }
            } catch (err) {
                console.log(err)
            }
        },
        
    }
}