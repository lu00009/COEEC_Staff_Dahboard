"use client"

import { useLanguage } from "../context/LanguageContext"
import { Globe } from "lucide-react"
import { useState } from "react"

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()
  const [open, setOpen] = useState(false)

  const languages = [
    { code: "en", label: "English" },
    { code: "am", label: "አማርኛ" },
    { code: "om", label: "Afaan Oromoo" },
  ]

  return (
    <div className="relative">
      <button
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 px-3 py-2 rounded border bg-gray-50 hover:bg-gray-100 text-sm text-gray-700"
      >
        <Globe className="w-4 h-4 text-gray-600" />
        <span>{languages.find((l) => l.code === language)?.label ?? "Language"}</span>
      </button>
      {open && (
        <ul className="absolute right-0 mt-2 w-44 rounded-md border border-gray-200 bg-white shadow-md py-1 z-50">
          {languages.map((l) => (
            <li key={l.code}>
              <button
                onClick={() => {
                  setLanguage(l.code as any)
                  setOpen(false)
                }}
                className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-100 ${
                  language === l.code ? "font-semibold" : ""
                }`}
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
