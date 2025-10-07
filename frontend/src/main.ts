const API_URL = "http://localhost:3000" // Backend URL

// Typ för ett event
interface EventData {
  _id: string
  eventTitle: string
  eventDate: string
  eventDescription: string
}

// Hämta och rendera events
async function loadEvents(): Promise<void> {
  const res = await fetch(`${API_URL}/events`)
  const events: EventData[] = await res.json()

  const container = document.getElementById("events-list") as HTMLElement
  container.innerHTML = "" // töm gammalt

  events.forEach((ev) => {
    const div = document.createElement("div")
    div.innerHTML = `
      <h4>${ev.eventTitle}</h4>
      <p>${ev.eventDate}</p>
      <p>${ev.eventDescription}</p>
      <button data-edit="${ev._id}">Edit</button>
      <button data-delete="${ev._id}">Delete</button>
    `
    container.appendChild(div)
  })

  // Edit-knappar
  document.querySelectorAll<HTMLButtonElement>("[data-edit]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset["edit"]
      const ev = events.find((e) => e._id === id)
      if (!ev) return

      ;(document.getElementById("event-id") as HTMLInputElement).value = id ?? ""
      ;(document.getElementById("event-title") as HTMLInputElement).value = ev.eventTitle
      ;(document.getElementById("event-date") as HTMLInputElement).value = ev.eventDate
      ;(document.getElementById("event-description") as HTMLInputElement).value = ev.eventDescription

      const submitBtn = document.getElementById("submit-button") as HTMLButtonElement
      submitBtn.innerText = "Save Event"
      submitBtn.dataset.submitType = "edit"
    })
  })

  // Delete-knappar
  document.querySelectorAll<HTMLButtonElement>("[data-delete]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const id = btn.dataset["delete"]
      if (!id) return
      await fetch(`${API_URL}/event/${id}`, { method: "DELETE" })
      await loadEvents()
    })
  })
}

// Lyssna på formulär
document.getElementById("event-form")?.addEventListener("submit", async (e) => {
  e.preventDefault()

  const formData = {
    eventId: (document.getElementById("event-id") as HTMLInputElement).value,
    eventTitle: (document.getElementById("event-title") as HTMLInputElement).value,
    eventDate: (document.getElementById("event-date") as HTMLInputElement).value,
    eventDescription: (document.getElementById("event-description") as HTMLInputElement).value,
    submitType: (document.getElementById("submit-button") as HTMLButtonElement).dataset.submitType,
  }

  await fetch(`${API_URL}/event`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(formData),
  })

  // Nollställ formuläret
  ;(document.getElementById("event-id") as HTMLInputElement).value = ""
  ;(document.getElementById("event-title") as HTMLInputElement).value = ""
  ;(document.getElementById("event-date") as HTMLInputElement).value = ""
  ;(document.getElementById("event-description") as HTMLInputElement).value = ""

  const submitBtn = document.getElementById("submit-button") as HTMLButtonElement
  submitBtn.innerText = "Create Event"
  submitBtn.dataset.submitType = "create"

  await loadEvents()
})

// Ladda events vid start
loadEvents()
