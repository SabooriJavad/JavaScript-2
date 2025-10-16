
import React, { useEffect, useState } from "react"
import { API_URL } from "../api/config"

interface EventData {
  _id: string
  eventTitle: string
  eventDate: string
}

interface DeleteEventProps {
  onDeleted?: () => void
}

export default function DeleteEvent({ onDeleted }: DeleteEventProps) {
  const [events, setEvents] = useState<EventData[]>([])

  useEffect(() => {
    loadEvents()
  }, [])

  const loadEvents = async () => {
    const res = await fetch(`${API_URL}/events`)
    const data: EventData[] = await res.json()
    setEvents(data)
  }

  const handleDelete = async (id: string) => {
    await fetch(`${API_URL}/event/${id}`, { method: "DELETE" })
    loadEvents()
    onDeleted?.()
  }

  return (
    <div>
      <h3>Delete Events</h3>
      <ul>
        {events.map(ev => (
          <li key={ev._id}>
            {ev.eventTitle} - {ev.eventDate}
            <button onClick={() => handleDelete(ev._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
