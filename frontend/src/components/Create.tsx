

import React, { useState } from "react"
import { API_URL } from "../api/config"
import './create.css'

interface CreateEventProps {
  onCreated?: () => void
}

export default function CreateEvent({ onCreated }: CreateEventProps) {
  const [title, setTitle] = useState("")
  const [date, setDate] = useState("")
  const [description, setDescription] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await fetch(`${API_URL}/event`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        eventTitle: title,
        eventDate: date,
        eventDescription: description,
        submitType: "create"
      })
    })
    setTitle("")
    setDate("")
    setDescription("")
    onCreated?.()
    alert('Event created successfully')
  }

  return (
       <label >
    <form onSubmit={handleSubmit}>
        <h3>Create Event</h3>
             <div className='container'>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" required />
   
        <input value={date} onChange={e => setDate(e.target.value)} type="date" required />
      
      <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" required />
          <button type="submit">Create</button>
          </div>
      </form>
        </label>
  )
}
