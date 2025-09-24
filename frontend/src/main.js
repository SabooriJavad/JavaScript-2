const API_URL = "http://localhost:3000"  // Backend URL

// Hämta och rendera events
async function loadEvents() {
  const res = await fetch(`${API_URL}/events`)
  const events = await res.json()

  const container = document.getElementById("events-list")
  container.innerHTML = "" // töm gammalt

  events.forEach(ev => {
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

  // Lägg till event listeners för Edit
  document.querySelectorAll("[data-edit]").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.dataset["edit"]
      const ev = events.find(e => e._id === id)
      document.getElementById("event-id").value = id
      document.getElementById("event-title").value = ev.eventTitle
      document.getElementById("event-date").value = ev.eventDate
      document.getElementById("event-description").value = ev.eventDescription
      const submitBtn = document.getElementById("submit-button")
      submitBtn.innerText = "Save Event"
      submitBtn.dataset.submitType = "edit"
    })
  })

  // Lägg till event listeners för Delete
  document.querySelectorAll("[data-delete]").forEach(btn => {
    btn.addEventListener("click", async () => {
      const id = btn.dataset["delete"]
      await fetch(`${API_URL}/event/${id}`, { method: "DELETE" })
      await loadEvents()
    })
  })
}

// Lyssna på formulär-submits
document.getElementById("event-form").addEventListener("submit", async (e) => {
  e.preventDefault()
  const formData = {
    eventId: document.getElementById("event-id").value,
    eventTitle: document.getElementById("event-title").value,
    eventDate: document.getElementById("event-date").value,
    eventDescription: document.getElementById("event-description").value,
    submitType: document.getElementById("submit-button").dataset.submitType
  }

  await fetch(`${API_URL}/event`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(formData)
  })

  // Nollställ formuläret
  document.getElementById("event-id").value = ""
  document.getElementById("event-title").value = ""
  document.getElementById("event-date").value = ""
  document.getElementById("event-description").value = ""
  const submitBtn = document.getElementById("submit-button")
  submitBtn.innerText = "Create Event"
  submitBtn.dataset.submitType = "create"

  await loadEvents()
})

// Ladda events vid start
loadEvents()
