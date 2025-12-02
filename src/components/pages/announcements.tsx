"use client"

import { useState } from "react"
import { Trash2, Plus, AlertCircle } from "lucide-react"

interface Announcement {
  id: string
  title: string
  body: string
  category: "General" | "Research" | "Academic" | "Admin"
  date: string
  attachment: string | null
}

export default function Announcements() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([
    {
      id: "1",
      title: "New Research Funding Available",
      body: "The college has received new funding for research projects. Interested faculty members should submit proposals by the end of the month.",
      category: "Research",
      date: "2024-12-01",
      attachment: null,
    },
    {
      id: "2",
      title: "Spring 2025 Registration Opens",
      body: "Student registration for Spring 2025 semester is now open. Students can register through the student portal.",
      category: "Academic",
      date: "2024-11-25",
      attachment: null,
    },
  ])

  const [newAnnouncement, setNewAnnouncement] = useState<Omit<Announcement, "id">>({
    title: "",
    body: "",
    category: "General",
    date: new Date().toISOString().split("T")[0],
    attachment: null,
  })

  const addAnnouncement = () => {
    if (newAnnouncement.title && newAnnouncement.body) {
      setAnnouncements([...announcements, { ...newAnnouncement, id: Date.now().toString() }])
      setNewAnnouncement({
        title: "",
        body: "",
        category: "General",
        date: new Date().toISOString().split("T")[0],
        attachment: null,
      })
    }
  }

  const deleteAnnouncement = (id: string) => {
    setAnnouncements(announcements.filter((a) => a.id !== id))
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Research":
        return "bg-purple-50 border-purple-200 text-purple-700"
      case "Academic":
        return "bg-blue-50 border-blue-200 text-blue-700"
      case "Admin":
        return "bg-red-50 border-red-200 text-red-700"
      default:
        return "bg-gray-50 border-gray-200 text-gray-700"
    }
  }

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "short", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <p className="text-gray-600">Post and manage announcements</p>
      </div>

      <div className="grid grid-cols-2 gap-8">
        {/* Left Side - Form */}
        <div className="bg-white p-8 rounded-lg card-shadow max-h-screen overflow-y-auto">
          <h2 className="text-xl font-bold text-blue-900 mb-6">Create Announcement</h2>

          <div className="space-y-3 mb-6">
            {announcements.map((ann) => (
              <div key={ann.id} className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <p className="font-semibold text-sm text-gray-800">{ann.title}</p>
                    <span
                      className={`inline-block mt-1 px-2 py-1 text-xs rounded font-semibold border ${getCategoryColor(ann.category)}`}
                    >
                      {ann.category}
                    </span>
                  </div>
                  <button
                    onClick={() => deleteAnnouncement(ann.id)}
                    className="text-red-600 hover:bg-red-50 p-1 rounded"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <p className="text-xs text-gray-500">{formatDate(ann.date)}</p>
              </div>
            ))}
          </div>

          <div className="space-y-3 p-4 bg-blue-50 rounded-lg">
            <input
              type="text"
              placeholder="Announcement Title"
              value={newAnnouncement.title}
              onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
              className="form-input text-sm"
            />
            <textarea
              placeholder="Message Body"
              value={newAnnouncement.body}
              onChange={(e) => setNewAnnouncement({ ...newAnnouncement, body: e.target.value })}
              className="form-input text-sm resize-none"
              rows={4}
            />
            <select
              value={newAnnouncement.category}
              onChange={(e) => setNewAnnouncement({ ...newAnnouncement, category: e.target.value as any })}
              className="form-input text-sm"
            >
              <option value="General">General</option>
              <option value="Research">Research</option>
              <option value="Academic">Academic</option>
              <option value="Admin">Admin</option>
            </select>
            <input
              type="date"
              value={newAnnouncement.date}
              onChange={(e) => setNewAnnouncement({ ...newAnnouncement, date: e.target.value })}
              className="form-input text-sm"
            />
            <button
              onClick={addAnnouncement}
              className="btn-primary w-full flex items-center justify-center gap-2 text-sm"
            >
              <Plus size={16} />
              Add Announcement
            </button>
          </div>

          <button className="btn-primary w-full mt-8">Save Changes</button>
        </div>

        {/* Right Side - List Preview */}
        <div className="bg-white p-8 rounded-lg card-shadow sticky top-8 max-h-screen overflow-y-auto">
          <h2 className="text-xl font-bold text-blue-900 mb-6">Announcements Feed</h2>

          <div className="space-y-4">
            {announcements.length > 0 ? (
              announcements.map((ann) => (
                <div key={ann.id} className={`rounded-lg p-4 border ${getCategoryColor(ann.category)}`}>
                  <div className="flex items-start gap-3">
                    <AlertCircle size={20} className="flex-shrink-0 mt-1" />
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-800">{ann.title}</h3>
                      <p className="text-sm mt-2 text-gray-700 leading-relaxed">{ann.body}</p>
                      <div className="flex items-center justify-between mt-3 text-xs">
                        <span className={`px-2 py-1 rounded font-semibold border ${getCategoryColor(ann.category)}`}>
                          {ann.category}
                        </span>
                        <span className="text-gray-500">{formatDate(ann.date)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-8">No announcements yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
