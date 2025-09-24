import express from "express"
import cors from "cors"
import { MongoClient, ObjectId } from "mongodb"
import { validate } from "./validate.js"

const app = express()
app.use(cors())
app.use(express.json())

const client = new MongoClient("mongodb://localhost:27017")

// GET /events → hämta alla events
app.get("/events", async (req, res) => {
  try {
    await client.connect()
    const db = client.db("eventdb")
    const collection = db.collection("events")
    const events = await collection.find({}).limit(20).toArray()
    res.json(events)
  } catch (err) {
    console.log(err)
    res.status(500).send("DB error")
  } finally {
    await client.close()
  }
})

// POST /event → skapa eller redigera event
app.post("/event", async (req, res) => {
  const formData = req.body

  if (!validate(formData)) return res.status(400).send("Invalid data")

  try {
    await client.connect()
    const db = client.db("eventdb")
    const collection = db.collection("events")

    if (formData.submitType === "edit") {
      const filter = { _id: new ObjectId(formData.eventId) }
      const updateDoc = {
        $set: {
          eventTitle: formData.eventTitle,
          eventDate: formData.eventDate,
          eventDescription: formData.eventDescription
        }
      }
      await collection.updateOne(filter, updateDoc)
      res.send("Event updated")
    } else if (formData.submitType === "create") {
      await collection.insertOne(formData)
      res.send("Event created")
    }
  } catch (err) {
    console.log(err)
    res.status(500).send("Database error")
  } finally {
    await client.close()
  }
})

if (process.env.NODE_ENV !== "test") {
  app.listen(3000, () => console.log("Backend running on http://localhost:3000"))
}
// DELETE /event/:id
app.delete("/event/:id", async (req, res) => {
  const id = req.params.id
  try {
    await client.connect()
    const db = client.db("eventdb")
    const collection = db.collection("events")
    await collection.deleteOne({ _id: new ObjectId(id) })
    res.send("Event deleted")
  } catch (err) {
    console.log(err)
    res.status(500).send("Failed to delete event")
  } finally {
    await client.close()
  }
})

export default app
