"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = validate;
// Validera ett inkommande event-objekt
function validate(data) {
    if (!data)
        return false;
    // Grundläggande fältkontroll
    const requiredFields = ["eventTitle", "eventDate", "eventDescription"];
    for (const field of requiredFields) {
        if (typeof data[field] !== "string" || !data[field]) {
            return false;
        }
    }
    // Datumvalidering (enkel)
    const date = new Date(data.eventDate);
    if (isNaN(date.getTime()))
        return false;
    // submitType måste vara "create" eller "edit" (om det finns)
    if (data.submitType && !["create", "edit"].includes(data.submitType)) {
        return false;
    }
    return true;
}
