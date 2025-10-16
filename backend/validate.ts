import { EventData, EventInput } from "./types" // vi lägger typerna i en separat fil (se nedan)

// Validera ett inkommande event-objekt
export function validate(data: Partial<EventInput>): boolean {
  if (!data) return false

  // Grundläggande fältkontroll
  const requiredFields = ["eventTitle", "eventDate", "eventDescription"]
  for (const field of requiredFields) {
    if (typeof data[field as keyof EventInput] !== "string" || !data[field as keyof EventInput]) {
      return false
    }
  }

  // Datumvalidering (enkel)
   const date = new Date(data.eventDate!)
  if (isNaN(date.getTime())) return false


  // submitType måste vara "create" eller "edit" (om det finns)
   if (data.submitType && !["create", "edit"].includes(data.submitType)) {
    return false
  }


  return true
}
