


import React, { useState, useEffect } from "react"
import { API_URL } from "../api/config"
import  './create.css'

interface EventData {
  _id: string
  eventTitle: string
  eventDate: string
  eventDescription: string
}

interface EditEventProps {
  onUpdated?: () => void
}

export default function EditEvent({ onUpdated }: EditEventProps) {
  const [events, setEvents] = useState<EventData[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [title, setTitle] = useState("")
  const [date, setDate] = useState("")
  const [description, setDescription] = useState("")

  useEffect(() => {
    loadEvents()
  }, [])

  const loadEvents = async () => {
    const res = await fetch(`${API_URL}/events`)
    const data: EventData[] = await res.json()
    setEvents(data)
  }

  const handleEdit = (ev: EventData) => {
    setEditingId(ev._id)
    setTitle(ev.eventTitle)
    setDate(ev.eventDate)
    setDescription(ev.eventDescription)
  }

  const handleSave = async () => {
    if (!editingId) return
    await fetch(`${API_URL}/event`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        eventId: editingId,
        eventTitle: title,
        eventDate: date,
        eventDescription: description,
        submitType: "edit"
      })
    })
    setEditingId(null)
    setTitle("")
    setDate("")
    setDescription("")
    loadEvents()
    onUpdated?.()
    alert('Edited successful')
  }

  return (
    <div>
      <h3>Edit Events</h3>
      {editingId && (
         <label >
        <div className='container'>
         
          <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" />
          <input value={date} onChange={e => setDate(e.target.value)} type="date" />
          <textarea value={description} onChange={e => setDescription(e.target.value)} />
            <button onClick={handleSave}>Save</button>
           
          </div>
           </label>
      )}

      <ul>
        {events.map(ev => (
          <li key={ev._id}>
            {ev.eventTitle} - {ev.eventDate}
            <button onClick={() => handleEdit(ev)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
