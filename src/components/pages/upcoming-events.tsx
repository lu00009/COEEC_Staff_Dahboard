"use client"

import { useState } from "react"
import { Trash2, Plus, Calendar, Clock, MapPin } from "lucide-react"

interface Event {
  id: string
  title: string
  date: string
  time: string
  location: string
  speaker: string
  description: string
  image: string | null
}

export default function UpcomingEvents() {
  const [events, setEvents] = useState<Event[]>([
    {
      id: "1",
      title: "AI & Machine Learning Workshop",
      date: "2024-12-15",
      time: "14:00",
      location: "Room 301",
      speaker: "Dr. Jane Doe",
      description: "A comprehensive workshop on AI applications in modern computing.",
      image: null,
    },
    {
      id: "2",
      title: "Research Presentation Day",
      date: "2024-12-20",
      time: "10:00",
      location: "Auditorium",
      speaker: "Faculty Members",
      description: "Annual research presentation showcasing ongoing projects.",
      image: null,
    },
  ])

  const [newEvent, setNewEvent] = useState<Omit<Event, "id">>({
    title: "",
    date: "",
    time: "",
    location: "",
    speaker: "",
    description: "",
    image: null,
  })

  const addEvent = () => {
    if (newEvent.title && newEvent.date) {
      setEvents([...events, { ...newEvent, id: Date.now().toString() }])
      setNewEvent({
        title: "",
        date: "",
        time: "",
        location: "",
        speaker: "",
        description: "",
        image: null,
      })
    }
  }

  const deleteEvent = (id: string) => {
    setEvents(events.filter((e) => e.id !== id))
  }

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "short", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <p className="text-gray-600">Manage and promote upcoming events</p>
      </div>

      <div className="grid grid-cols-2 gap-8">
        {/* Left Side - Form */}
        <div className="bg-white p-8 rounded-lg card-shadow max-h-screen overflow-y-auto">
          <h2 className="text-xl font-bold text-blue-900 mb-6">Add Event</h2>

          <div className="space-y-3 mb-6">
            {events.map((event) => (
              <div
                key={event.id}
                className="bg-gray-50 p-3 rounded-lg border border-gray-200 flex justify-between items-start"
              >
                <div className="flex-1">
                  <p className="font-semibold text-sm text-gray-800">{event.title}</p>
                  <p className="text-xs text-gray-600">
                    {formatDate(event.date)} • {event.time}
                  </p>
                </div>
                <button onClick={() => deleteEvent(event.id)} className="text-red-600 hover:bg-red-50 p-1 rounded">
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>

          <div className="space-y-3 p-4 bg-blue-50 rounded-lg">
            <input
              type="text"
              placeholder="Event Title"
              value={newEvent.title}
              onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
              className="form-input text-sm"
            />
            <input
              type="date"
              value={newEvent.date}
              onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
              className="form-input text-sm"
            />
            <input
              type="time"
              value={newEvent.time}
              onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
              className="form-input text-sm"
            />
            <input
              type="text"
              placeholder="Location"
              value={newEvent.location}
              onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
              className="form-input text-sm"
            />
            <input
              type="text"
              placeholder="Speaker / Host"
              value={newEvent.speaker}
              onChange={(e) => setNewEvent({ ...newEvent, speaker: e.target.value })}
              className="form-input text-sm"
            />
            <textarea
              placeholder="Description"
              value={newEvent.description}
              onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
              className="form-input text-sm resize-none"
              rows={3}
            />
            <button onClick={addEvent} className="btn-primary w-full flex items-center justify-center gap-2 text-sm">
              <Plus size={16} />
              Add Event
            </button>
          </div>

          <button className="btn-primary w-full mt-8">Save Changes</button>
        </div>

        {/* Right Side - Card Preview */}
        <div className="bg-white p-8 rounded-lg card-shadow sticky top-8 max-h-screen overflow-y-auto">
          <h2 className="text-xl font-bold text-blue-900 mb-6">Event Preview</h2>

          <div className="space-y-6">
            {events.length > 0 ? (
              events.map((event) => (
                <div
                  key={event.id}
                  className="bg-gradient-to-b from-blue-600 to-blue-700 rounded-lg overflow-hidden text-white shadow-lg"
                >
                  {event.image && (
                    <img
                      src={event.image || "/placeholder.svg"}
                      alt={event.title}
                      className="w-full h-40 object-cover"
                    />
                  )}
                  <div className="p-5">
                    <h3 className="text-lg font-bold mb-3">{event.title}</h3>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-blue-100">
                        <Calendar size={16} />
                        <span className="text-sm">{formatDate(event.date)}</span>
                      </div>
                      {event.time && (
                        <div className="flex items-center gap-2 text-blue-100">
                          <Clock size={16} />
                          <span className="text-sm">{event.time}</span>
                        </div>
                      )}
                      {event.location && (
                        <div className="flex items-center gap-2 text-blue-100">
                          <MapPin size={16} />
                          <span className="text-sm">{event.location}</span>
                        </div>
                      )}
                    </div>

                    {event.speaker && (
                      <p className="text-sm font-semibold text-blue-100 mb-3">Speaker: {event.speaker}</p>
                    )}

                    {event.description && <p className="text-sm leading-relaxed text-blue-50">{event.description}</p>}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-8">No events added yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
