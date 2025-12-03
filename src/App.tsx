"use client"

import { useState, useEffect } from "react"
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

  // Initialize page from URL hash and listen for hash changes
  useEffect(() => {
    const validPages: PageType[] = ["dashboard", "profile", "about", "expertise", "experience", "publications", "connect"]
    const applyHash = () => {
      const hash = window.location.hash.replace(/^#/, "")
      if (validPages.includes(hash as PageType)) {
        setCurrentPage(hash as PageType)
      }
    }
    applyHash()
    window.addEventListener("hashchange", applyHash)
    return () => window.removeEventListener("hashchange", applyHash)
  }, [])

  // Navigation helper to also update URL hash
  const handleNavigate = (page: PageType) => {
    setCurrentPage(page)
    window.location.hash = page
  }

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
        return { title: t("dashboard"), sub: t("welcomeStaffPortal") || "Welcome to your staff portal" }
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
      <MobileSidebar currentPage={currentPage} onPageChange={handleNavigate} />

      <div className="flex">
        {/* Desktop sidebar */}
        <Sidebar currentPage={currentPage} onPageChange={handleNavigate} />
        {/* Main content */}
        <main className="flex-1 flex flex-col overflow-auto">
          {/* Desktop top nav line with shadow and LanguageSwitcher top-right */}
          <div className="hidden md:flex sticky top-0 z-30 bg-white border-gray-300 shadow-sm px-4 py-2 justify-end">
            <LanguageSwitcher />
          </div>
          <Breadcrumbs currentPage={currentPage} onNavigate={handleNavigate} />
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
