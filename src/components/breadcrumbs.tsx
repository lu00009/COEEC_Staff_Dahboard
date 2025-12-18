"use client"

import { Home as HomeIcon } from "lucide-react"
import { useLanguage } from "../context/LanguageContext"

export type PageType =
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
      default:
        return ""
    }
  }

  const isHome = currentPage === "dashboard"

  return (
    <div className="px-8 py-3">
      <nav className="text-sm">
        <button
          onClick={() => onNavigate && onNavigate("dashboard")}
          className="inline-flex items-center gap-2 transition-colors"
          style={{ color: "var(--primary)" }}
        >
          <HomeIcon className="w-4 h-4" />
          <span>{labelFor("dashboard")}</span>
        </button>

        {!isHome && <span className="mx-2 text-gray-400">/</span>}
        {!isHome && (
          <span className="font-semibold" style={{ color: "var(--primary)" }}>
            {labelFor(currentPage)}
          </span>
        )}
      </nav>
    </div>
  )
}
