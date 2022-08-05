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
        updateEvent: async(_:any, {event}: CreateEvent, ctx: any) => {
            try {
                console.log("event--", event)
                const user = await AuthMiddleware(ctx)
                if(!user){
                    throw new AuthenticationError('Unauthenticated');
                }
                const userEvent = await EventModel.findOne({_id: event.id, createdBy: user._id})
                if(!userEvent){
                    throw new AuthenticationError(`${event.id} not Found`);
                }else {
                    const updatedEvent = await EventModel.findOneAndUpdate({_id: event.id, createdBy: user._id}, {
                        title: event.title,
                        start: event.start,
                        end: event.end,
                        description: event.description,
                        isPrivate: event.isPrivate,
                    },{new: true}
                    )

                    return {
                        _id: updatedEvent?._id,
                        title: updatedEvent?.title,
                        start: updatedEvent?.start,
                        end:updatedEvent?.end,
                        description: updatedEvent?.description,
                        isPrivate: updatedEvent?.isPrivate,
                        url: updatedEvent?.url,
                        createdBy: updatedEvent?.createdBy
                    }
                }

            } catch (err) {
                console.log(err)
            }
        }
    }
}