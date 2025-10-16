import React from "react"
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import CreateEvent from "./components/Create"
import EditEvent from "./components/Edit"
import DeleteEvent from "./components/Delete"

export default function App() {
  return (
    <Router>
      <nav>
        <Link to="/create">Create</Link> |{" "}
        <Link to="/edit">Edit</Link> |{" "}
        <Link to="/delete">Delete</Link>
      </nav>

      <Routes >
        <Route path="/create" element={<CreateEvent />} />
        <Route path="/edit" element={<EditEvent />} />
        <Route path="/delete" element={<DeleteEvent />} />
        <Route path="*" element={<CreateEvent />} />
      </Routes>
    </Router>
  )
}
