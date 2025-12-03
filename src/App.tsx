"use client"

import { useState } from "react"
import Sidebar, { MobileSidebar } from "./components/sidebar"
import LanguageSwitcher from "./components/language-switcher"
import Dashboard from "./components/pages/dashboard"
import Profile from "./components/pages/profile"
import About from "./components/pages/about"
import AreasOfExpertise from "./components/pages/areas-of-expertise"
import ExperienceEducation from "./components/pages/experience-education"
import Publications from "./components/pages/publications"
import Connect from "./components/pages/connect"
import Breadcrumbs from "./components/breadcrumbs"
import { useLanguage } from "./context/LanguageContext"

type PageType =
  | "dashboard"
  | "profile"
  | "about"
  | "expertise"
  | "experience"
  | "publications"
  | "connect"

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>("dashboard")
  const { t } = useLanguage()

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
      default:
        return <Dashboard />
    }
  }

  const pageHeader = () => {
    switch (currentPage) {
      case "dashboard":
        return { title: t("dashboard"), sub: t("Welcome to Staff Portal") || "Welcome to your staff portal" }
      case "profile":
        return { title: t("profile"), sub: "Manage your personal information" }
      case "about":
        return { title: t("about"), sub: "Manage your biography and professional summary" }
      case "expertise":
        return { title: t("areasOfExpertise"), sub: "Select and manage your expertise" }
      case "experience":
        return { title: t("experience"), sub: "Manage your professional background" }
      case "publications":
        return { title: t("publications"), sub: "Manage your research publications" }
      case "connect":
        return { title: t("connect"), sub: "Manage your social profiles and links" }
      default:
        return { title: "", sub: "" }
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile/Tablet top bar with menu */}
      <MobileSidebar currentPage={currentPage} onPageChange={setCurrentPage} />

      <div className="flex">
        {/* Desktop sidebar */}
        <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} />
        {/* Main content */}
        <main className="flex-1 flex flex-col overflow-auto">
          {/* Desktop top nav line with shadow and LanguageSwitcher top-right */}
          <div className="hidden md:flex sticky top-0 z-30 bg-white border-gray-400 shadow-sm px-4 py-3 justify-end">
            <LanguageSwitcher />
          </div>
          <Breadcrumbs currentPage={currentPage} onNavigate={setCurrentPage} />
          {/* Dynamic page header */}
          <div className="px-8 mb-2">
            {/* <h1 className="text-2xl font-bold text-blue-900">{pageHeader().title}</h1> */}
            <p className="text-gray-600">{pageHeader().sub}</p>
          </div>
          <div className="flex-1 overflow-auto">{renderPage()}</div>
        </main>
      </div>
    </div>
  )
}
