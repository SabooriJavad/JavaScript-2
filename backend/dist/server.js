"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongodb_1 = require("mongodb");
const validate_1 = require("./validate");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const client = new mongodb_1.MongoClient("mongodb://localhost:27017");
let db;
let collection;
// Connect once at startup
async function connectDB() {
    await client.connect();
    db = client.db("eventdb");
    collection = db.collection("events");
    console.log(" Connected to MongoDB");
}
// GET /events → hämta alla events
app.get("/events", async (_req, res) => {
    try {
        const events = await collection.find({}).limit(20).toArray();
        res.json(events);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "DB error" });
    }
});
// POST /event → skapa eller redigera event
app.post("/event", async (req, res) => {
    const formData = req.body;
    if (!(0, validate_1.validate)(formData)) {
        return res.status(400).json({ error: "Invalid data" });
    }
    try {
        if (formData.submitType === "edit" && formData.eventId) {
            const filter = { _id: new mongodb_1.ObjectId(formData.eventId) };
            const updateDoc = {
                $set: {
                    eventTitle: formData.eventTitle,
                    eventDate: formData.eventDate,
                    eventDescription: formData.eventDescription,
                },
            };
            await collection.updateOne(filter, updateDoc);
            res.json({ message: "Event updated" });
        }
        else {
            await collection.insertOne({
                eventTitle: formData.eventTitle,
                eventDate: formData.eventDate,
                eventDescription: formData.eventDescription,
            });
            res.json({ message: "Event created" });
        }
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Database error" });
    }
});
// DELETE /event/:id
app.delete("/event/:id", async (req, res) => {
    const id = req.params.id;
    try {
        await collection.deleteOne({ _id: new mongodb_1.ObjectId(id) });
        res.json({ message: "Event deleted" });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to delete event" });
    }
});
if (process.env.NODE_ENV !== "test") {
    connectDB().then(() => {
        app.listen(3000, () => console.log(" Backend running on http://localhost:3000"));
    });
}
exports.default = app;
