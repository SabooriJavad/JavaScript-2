import { ObjectId } from "mongodb"

export interface EventData {
  _id: ObjectId
  eventTitle: string
  eventDate: string
  eventDescription: string
}

export interface EventInput {
  eventId?: string
  eventTitle: string
  eventDate: string
  eventDescription: string
  submitType?: "create" | "edit"
}
