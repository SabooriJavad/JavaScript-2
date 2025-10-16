import express, { Request, Response } from "express"
import cors from "cors"
import { MongoClient, ObjectId, Db, Collection } from "mongodb"
import { validate } from "./validate"
import { EventData } from "./types"
import { EventInput } from "./types"



const app = express()
app.use(cors())
app.use(express.json())

const client = new MongoClient("mongodb://localhost:27017")
let db: Db
let collection: Collection<EventData>

// Connect once at startup
async function connectDB() {
  await client.connect()
  db = client.db("eventdb")
  collection = db.collection<EventData>("events")
  console.log(" Connected to MongoDB")
}

// GET /events → hämta alla events
app.get("/events", async (_req: Request, res: Response) => {
  try {
    const events = await collection.find({}).limit(20).toArray()
    res.json(events)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "DB error" })
  }
})

// POST /event → skapa eller redigera event
app.post("/event", async (req: Request, res: Response) => {
  const formData: EventInput = req.body

  if (!validate(formData)) {
    return res.status(400).json({ error: "Invalid data" })
  }

  try {
    if (formData.submitType === "edit" && formData.eventId) {
      const filter = { _id: new ObjectId(formData.eventId) }
      const updateDoc = {
        $set: {
          eventTitle: formData.eventTitle,
          eventDate: formData.eventDate,
          eventDescription: formData.eventDescription,
        },
      }
      await collection.updateOne(filter, updateDoc)
      res.json({ message: "Event updated" })
    } else {
      await collection.insertOne({
        eventTitle: formData.eventTitle,
        eventDate: formData.eventDate,
        eventDescription: formData.eventDescription,
      } as EventData)
      res.json({ message: "Event created" })
    }
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Database error" })
  }
})


// DELETE /event/:id
app.delete("/event/:id", async (req: Request, res: Response) => {
  const id = req.params.id
  try {
    await collection.deleteOne({ _id: new ObjectId(id) })
    res.json({ message: "Event deleted" })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Failed to delete event" })
  }
})

if (process.env.NODE_ENV !== "test") {
  connectDB().then(() => {
    app.listen(3000, () => console.log(" Backend running on http://localhost:3000"))
  })
}

export default app
