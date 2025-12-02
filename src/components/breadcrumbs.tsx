"use client"

import { ChevronRight, Home as HomeIcon } from "lucide-react"
import { useLanguage } from "../context/LanguageContext"

export type PageType =
  | "dashboard"
  | "profile"
  | "about"
  | "expertise"
  | "experience"
  | "publications"
  | "connect"
  | "events"
  | "announcements"

export default function Breadcrumbs({
  currentPage,
  onNavigate,
}: {
  currentPage: PageType
  onNavigate?: (page: PageType) => void
}) {
  const { t } = useLanguage()

  const labelFor = (page: PageType) => {
    switch (page) {
      case "dashboard":
        return t("dashboard")
      case "profile":
        return t("profile")
      case "about":
        return t("about")
      case "expertise":
        return t("areasOfExpertise")
      case "experience":
        return t("experience")
      case "publications":
        return t("publications")
      case "connect":
        return t("connect")
      case "events":
        return t("upcomingEvents")
      case "announcements":
        return t("announcements")
      default:
        return ""
    }
  }

  const isHome = currentPage === "dashboard"

  return (
    <nav aria-label="Breadcrumb" className="w-full px-8 py-2">
      <ol className="flex items-center text-sm text-gray-600">
        <li className="flex items-center gap-2">
          <button
            className={`inline-flex items-center gap-2 hover:text-blue-700 transition-colors ${
              isHome ? "text-blue-700 font-semibold" : ""
            }`}
            onClick={() => onNavigate?.("dashboard")}
            aria-current={isHome ? "page" : undefined}
          >
            <HomeIcon className="w-4 h-4" />
            <span>{labelFor("dashboard")}</span>
          </button>
        </li>

        {!isHome && (
          <>
            <li className="px-2 text-gray-400" aria-hidden>
              <ChevronRight className="w-4 h-4" />
            </li>
            <li className="text-orange-600 font-semibold" aria-current="page">
              {labelFor(currentPage)}
            </li>
          </>
        )}
      </ol>
    </nav>
  )
}
