export function validate(formData) {
  const { eventTitle, eventDate, eventDescription } = formData
  return (
    typeof eventTitle === "string" &&
    typeof eventDate === "string" &&
    typeof eventDescription === "string"
  )
}
