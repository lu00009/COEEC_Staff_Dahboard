"use client"

import { LayoutDashboard, User, FileText, Zap, BookOpen, FileJson, Link2, Calendar, Megaphone } from "lucide-react"
import { useLanguage } from "../context/LanguageContext"

interface SidebarProps {
  currentPage: string
  onPageChange: (page: any) => void
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
    { id: "events", label: t("events"), icon: Calendar },
    { id: "announcements", label: t("announcements"), icon: Megaphone },
  ]

  return (
    <aside className="w-64 bg-white border-r border-gray-200 overflow-y-auto">
      <div className="h-17 flex flex-col justify-center px-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <img
            src="https://kehulum.com/ups_asset/b/100/kehulumcom-1740387324e7a880e22a.png"
            alt="ASTU Logo"
            className="w-8 h-8 object-contain"
          />
          <div>
            <h1 className="text-xl font-bold text-blue-700">{t("coeec")}</h1>
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
              onClick={() => onPageChange(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all duration-200 ${
                isActive ? "bg-blue-50 text-blue-700 border-l-4 border-blue-700" : "text-gray-700 hover:bg-gray-50"
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
