"use client"

import { LayoutDashboard, User, FileText, Zap, BookOpen, FileJson, Link2 } from "lucide-react"
import { useLanguage } from "../context/LanguageContext"
import { useState } from "react"
import LanguageSwitcher from "./language-switcher"
import { PageType } from "./breadcrumbs"
import { useAuth } from "../context/AuthContext"

interface SidebarProps {
  currentPage: string
  onPageChange: (page: PageType) => void
}

export default function Sidebar({ currentPage, onPageChange }: SidebarProps) {
  const { t } = useLanguage()

  const menuItems = [
    { id: "dashboard", label: t("dashboard"), icon: LayoutDashboard },
    { id: "profile", label: t("profile"), icon: User },
    { id: "about", label: t("about"), icon: FileText },
    { id: "expertise", label: t("expertise"), icon: Zap },
    { id: "experience", label: t("experience"), icon: BookOpen },
    { id: "publications", label: t("publications"), icon: FileJson },
    { id: "connect", label: t("connect"), icon: Link2 },
  ]

  return (
    <aside className="bg-white border-gray-400 overflow-y-auto w-64 hidden md:block shadow-sm">
      {/* Desktop sidebar */}
      <div className="h-15 flex flex-col justify-center px-6 border-gray-400 shadow-sm">
        <div className="flex items-center gap-3">
          <img
            src="https://kehulum.com/ups_asset/b/100/kehulumcom-1740387324e7a880e22a.png"
            alt="ASTU Logo"
            className="w-8 h-8 object-contain"
          />
          <div>
            <h1 className="text-xl font-bold" style={{ color: 'var(--primary)' }}>{t("coeec")}</h1>
            <p className="text-sm text-gray-600">{t("staffDashboard")}</p>
          </div>
        </div>
      </div>
      <nav className="p-4">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = currentPage === item.id

          return (
            <button
              key={item.id}
              onClick={() => onPageChange(item.id as PageType)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all duration-200 ${isActive ? "sidebar-item-active" : "text-gray-700 hover:bg-gray-50"
                }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          )
        })}
      </nav>
    </aside>
  )
}

// Mobile top bar
export function MobileSidebar({ currentPage, onPageChange }: SidebarProps) {
  const { t } = useLanguage()
  const { logout } = useAuth()
  const [open, setOpen] = useState(false)
  const menuItems = [
    { id: "dashboard", label: t("dashboard"), icon: LayoutDashboard },
    { id: "profile", label: t("profile"), icon: User },
    { id: "about", label: t("about"), icon: FileText },
    { id: "expertise", label: t("expertise"), icon: Zap },
    { id: "experience", label: t("experience"), icon: BookOpen },
    { id: "publications", label: t("publications"), icon: FileJson },
    { id: "connect", label: t("connect"), icon: Link2 },
  ]
  return (
    <div className="md:hidden bg-white border-b border-gray-400 shadow-sm">
      <div className="h-14 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <button
            aria-label="Toggle menu"
            onClick={() => setOpen(!open)}
            className="px-3 py-2 text-sm rounded border flex items-center justify-center hover:bg-gray-50"
            style={{ borderColor: 'var(--border-gray)' }}
          >
            <span className="flex flex-col gap-[3px]">
              <span className="block w-5 h-[2px]" style={{ backgroundColor: 'var(--primary)' }}></span>
              <span className="block w-5 h-[2px]" style={{ backgroundColor: 'var(--primary)' }}></span>
              <span className="block w-5 h-[2px]" style={{ backgroundColor: 'var(--primary)' }}></span>
            </span>
          </button>
          <img
            src="https://kehulum.com/ups_asset/b/100/kehulumcom-1740387324e7a880e22a.png"
            alt="ASTU Logo"
            className="w-6 h-6 object-contain"
          />
          <div className="flex items-center gap-1">
            <span className="font-bold" style={{ color: 'var(--primary)' }}>{t("coeec")}</span>
            <span className="text-sm text-gray-700">{t("Staff")}</span>
          </div>
        </div>
        {/* Right side: language switcher and logout inline with menu/logo */}
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <button
            onClick={() => {
              logout()
              onPageChange("signin")
            }}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            style={{ color: "var(--primary)" }}
            aria-label="Logout"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
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
          </button>
        </div>
      </div>
      {open && (
        <nav className="p-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onPageChange(item.id as PageType)
                setOpen(false)
              }}
              className={`w-full text-left px-3 py-2 rounded mb-1 hover:bg-gray-50`}
              style={{
                backgroundColor: currentPage === item.id ? 'color-mix(in oklab, var(--primary) 12%, white)' : 'transparent',
                color: currentPage === item.id ? 'var(--primary)' : 'inherit',
                borderLeft: currentPage === item.id ? '4px solid var(--primary)' : 'none'
              }}
            >
              {item.label}
            </button>
          ))}
        </nav>
      )}
    </div>
  )
}
