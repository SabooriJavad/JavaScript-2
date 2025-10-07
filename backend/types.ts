export interface EventData {
  _id?: string
  eventId?: string
  eventTitle: string
  eventDate: string
  eventDescription: string
  submitType?: "create" | "edit"
}
