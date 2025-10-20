"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const supertest_1 = __importDefault(require("supertest"));
const server_js_1 = __importDefault(require("../server.js"));
(0, vitest_1.describe)("Event API", () => {
    (0, vitest_1.it)("GET /events returns an array", async () => {
        const res = await (0, supertest_1.default)(server_js_1.default).get("/events");
        (0, vitest_1.expect)(res.statusCode).toBe(200);
        (0, vitest_1.expect)(Array.isArray(res.body)).toBe(true);
    });
    (0, vitest_1.it)("POST /event creates a new event", async () => {
        const res = await (0, supertest_1.default)(server_js_1.default)
            .post("/event")
            .send({
            eventTitle: "Test Event",
            eventDate: "2025-09-24",
            eventDescription: "Testing",
            submitType: "create"
        });
        (0, vitest_1.expect)(res.statusCode).toBe(200);
        (0, vitest_1.expect)(res.text).toMatch(/Event created/);
    });
});
