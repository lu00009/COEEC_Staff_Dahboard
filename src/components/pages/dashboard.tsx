"use client"

import { Calendar, AlertCircle, TrendingUp } from "lucide-react"
import { useLanguage } from "../../context/LanguageContext"

export default function Dashboard() {
  const { t } = useLanguage()

  const upcomingEvents = [
    {
      id: 1,
      title: "AI & Machine Learning Workshop",
      date: "Dec 15, 2024",
      time: "2:00 PM",
      location: "Room 301",
    },
    {
      id: 2,
      title: "Research Presentation Day",
      date: "Dec 20, 2024",
      time: "10:00 AM",
      location: "Auditorium",
    },
    {
      id: 3,
      title: "Faculty Networking Event",
      date: "Dec 28, 2024",
      time: "4:00 PM",
      location: "Cafeteria",
    },
  ]

  const announcements = [
    {
      id: 1,
      title: "New Research Funding Available",
      category: "Research",
      date: "Dec 1, 2024",
    },
    {
      id: 2,
      title: "Campus Maintenance Schedule",
      category: "Admin",
      date: "Nov 28, 2024",
    },
    {
      id: 3,
      title: "Spring 2025 Registration Opens",
      category: "Academic",
      date: "Nov 25, 2024",
    },
  ]

  return (
    <div className="p-8">
      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg card-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-semibold">Years of Experience</p>
              <p className="text-3xl font-bold text-blue-700 mt-2">12</p>
            </div>
            <TrendingUp size={32} className="text-blue-200" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg card-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-semibold">Publications</p>
              <p className="text-3xl font-bold text-blue-700 mt-2">24</p>
            </div>
            <TrendingUp size={32} className="text-blue-200" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg card-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-semibold">Projects Completed</p>
              <p className="text-3xl font-bold text-blue-700 mt-2">48</p>
            </div>
            <TrendingUp size={32} className="text-blue-200" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg card-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-semibold">Contact Methods</p>
              <p className="text-3xl font-bold text-blue-700 mt-2">3</p>
            </div>
            <TrendingUp size={32} className="text-blue-200" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Upcoming Events */}
        <div className="bg-white p-6 rounded-lg card-shadow">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-blue-900">{t("upcomingEvents")}</h2>
            <Calendar size={24} className="text-blue-700" />
          </div>
          <div className="space-y-4">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="pb-4 border-b border-gray-200 last:border-0">
                <h3 className="font-semibold text-gray-800">{event.title}</h3>
                <p className="text-sm text-gray-600 mt-1">
                  {event.date} • {event.time}
                </p>
                <p className="text-sm text-gray-500">{event.location}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Announcements */}
        <div className="bg-white p-6 rounded-lg card-shadow">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-blue-900">{t("announcements")}</h2>
            <AlertCircle size={24} className="text-blue-700" />
          </div>
          <div className="space-y-4">
            {announcements.map((announcement) => (
              <div key={announcement.id} className="pb-4 border-b border-gray-200 last:border-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">{announcement.title}</h3>
                    <span className="inline-block mt-2 px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded font-semibold">
                      {announcement.category}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">{announcement.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Download CV Button */}
      <div className="mt-8">
        {/* <button className="btn-primary flex items-center gap-2">
          <Download size={20} />
          Download CV
        </button> */}
      </div>
    </div>
  )
}
