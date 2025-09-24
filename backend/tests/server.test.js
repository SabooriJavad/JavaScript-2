import { describe, it, expect } from "vitest"
import request from "supertest"
import app from "../server.js"

describe("Event API", () => {
  it("GET /events returns an array", async () => {
    const res = await request(app).get("/events")
    expect(res.statusCode).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
  })

  it("POST /event creates a new event", async () => {
    const res = await request(app)
      .post("/event")
      .send({
        eventTitle: "Test Event",
        eventDate: "2025-09-24",
        eventDescription: "Testing",
        submitType: "create"
      })
    expect(res.statusCode).toBe(200)
    expect(res.text).toMatch(/Event created/)
  })
})
