"use client"

import { useState } from "react"
import Sidebar from "./components/sidebar"
import LanguageSwitcher from "./components/language-switcher"
import Dashboard from "./components/pages/dashboard"
import Profile from "./components/pages/profile"
import About from "./components/pages/about"
import AreasOfExpertise from "./components/pages/areas-of-expertise"
import ExperienceEducation from "./components/pages/experience-education"
import Publications from "./components/pages/publications"
import Connect from "./components/pages/connect"
import UpcomingEvents from "./components/pages/upcoming-events"
import Announcements from "./components/pages/announcements"
import Breadcrumbs from "./components/breadcrumbs"

type PageType =
  | "dashboard"
  | "profile"
  | "about"
  | "expertise"
  | "experience"
  | "publications"
  | "connect"
  | "events"
  | "announcements"

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>("dashboard")

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <Dashboard />
      case "profile":
        return <Profile />
      case "about":
        return <About />
      case "expertise":
        return <AreasOfExpertise />
      case "experience":
        return <ExperienceEducation />
      case "publications":
        return <Publications />
      case "connect":
        return <Connect />
      case "events":
        return <UpcomingEvents />
      case "announcements":
        return <Announcements />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} />
      <div className="flex-1 flex flex-col overflow-auto">
        <LanguageSwitcher />
        <Breadcrumbs currentPage={currentPage} onNavigate={setCurrentPage} />
        <div className="flex-1 overflow-auto">{renderPage()}</div>
      </div>
    </div>
  )
}
