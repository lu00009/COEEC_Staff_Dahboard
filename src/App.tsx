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
import { useAuth } from "./context/AuthContext"
import Signup from "./components/pages/auth/Signup"
import Signin from "./components/pages/auth/Signin"
import Verification from "./components/pages/auth/Verification"
import SetPassword from "./components/pages/auth/SetPassword"

type PageType =
  | "dashboard"
  | "profile"
  | "about"
  | "expertise"
  | "experience"
  | "publications"
  | "connect"
  | "signup"
  | "signin"
  | "verification"
  | "set-password"

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>("signin")
  const { t } = useLanguage()
  const { isAuthenticated, logout } = useAuth()

  // Initialize page from URL hash and listen for hash changes
  useEffect(() => {
    const validPages: PageType[] = [
      "dashboard",
      "profile",
      "about",
      "expertise",
      "experience",
      "publications",
      "connect",
      "signup",
      "signin",
      "verification",
      "set-password",
    ]
    const applyHash = () => {
      const hash = window.location.hash.replace(/^#/, "")
      if (validPages.includes(hash as PageType)) {
        setCurrentPage(hash as PageType)
      } else if (!isAuthenticated) {
        // If not authenticated and no valid hash, go to signin
        setCurrentPage("signin")
      }
    }
    applyHash()
    window.addEventListener("hashchange", applyHash)
    return () => window.removeEventListener("hashchange", applyHash)
  }, [isAuthenticated])

  // Redirect to dashboard when user logs in
  useEffect(() => {
    if (isAuthenticated && (currentPage === "signin" || currentPage === "signup")) {
      handleNavigate("dashboard")
    }
  }, [isAuthenticated])

  // Navigation helper to also update URL hash
  const handleNavigate = (page: PageType) => {
    setCurrentPage(page)
    window.location.hash = page
  }

  const renderPage = () => {
    // Auth pages
    if (currentPage === "signup") {
      return <Signup onNavigate={handleNavigate} />
    }
    if (currentPage === "signin") {
      return <Signin onNavigate={handleNavigate} />
    }
    if (currentPage === "verification") {
      return <Verification onNavigate={handleNavigate} />
    }
    if (currentPage === "set-password") {
      return <SetPassword onNavigate={handleNavigate} />
    }

    // Protected dashboard pages - require authentication
    if (!isAuthenticated) {
      return <Signin onNavigate={handleNavigate} />
    }

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

  // For auth pages, render without sidebar
  const isAuthPage = ["signup", "signin", "verification", "set-password"].includes(currentPage)

  if (isAuthPage) {
    return <div className="min-h-screen bg-gray-50">{renderPage()}</div>
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
          <div className="hidden md:flex sticky top-0 z-30 bg-white border-gray-300 shadow-sm px-4 py-2 justify-end items-center gap-3">
            <LanguageSwitcher />
            <button
              onClick={() => {
                logout()
                handleNavigate("signin")
              }}
              className="flex items-center gap-2 px-1 py-2 text-sm rounded-lg hover:bg-gray-100 transition-colors"
              style={{ color: "var(--primary)" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              <span className="font-medium">Logout</span>
            </button>
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
