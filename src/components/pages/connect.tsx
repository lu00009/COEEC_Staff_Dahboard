"use client"

import { useState } from "react"
import { Linkedin, Globe, BookOpen, Mail, Instagram, Twitter, Facebook, Youtube } from "lucide-react"
import { useLanguage } from "../../context/LanguageContext"
import type React from "react"

type PlatformKey = "linkedin" | "googleScholar" | "researchGate" | "personalWebsite" | "instagram" | "twitter" | "facebook" | "youtube"

const PLATFORM_OPTIONS: { key: PlatformKey; label: string }[] = [
  { key: "linkedin", label: "LinkedIn" },
  { key: "googleScholar", label: "Google Scholar" },
  { key: "researchGate", label: "ResearchGate" },
  { key: "personalWebsite", label: "Website" },
  { key: "instagram", label: "Instagram" },
  { key: "twitter", label: "Twitter" },
  { key: "facebook", label: "Facebook" },
  { key: "youtube", label: "YouTube" },
]

const PLATFORM_ICON: Record<PlatformKey, (props: any) => React.ReactNode> = {
  linkedin: (p) => <Linkedin {...p} />,
  googleScholar: (p) => <BookOpen {...p} />,
  researchGate: (p) => <Globe {...p} />,
  personalWebsite: (p) => <Mail {...p} />,
  instagram: (p) => <Instagram {...p} />,
  twitter: (p) => <Twitter {...p} />,
  facebook: (p) => <Facebook {...p} />,
  youtube: (p) => <Youtube {...p} />,
}

interface SocialLink { platform: PlatformKey; url: string }

export default function Connect() {
  const { t } = useLanguage()
  const [links, setLinks] = useState<SocialLink[]>([
    { platform: "linkedin", url: "https://linkedin.com/in/dr-samuel-tadesse" },
    { platform: "googleScholar", url: "https://scholar.google.com/citations?user=example" },
  ])
  const [newPlatform, setNewPlatform] = useState<PlatformKey>("instagram")
  const [newUrl, setNewUrl] = useState("")

  const addLink = () => {
    if (!newUrl) return
    setLinks((prev) => [...prev, { platform: newPlatform, url: newUrl }])
    setNewUrl("")
  }
  const deleteLink = (idx: number) => setLinks((prev) => prev.filter((_, i) => i !== idx))

  return (
    <div className="p-4 lg:p-8 min-h-screen">
      {/* Two-column side-by-side layout on small screens and up */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
        {/* Left Side - Form */}
        <div className="bg-white p-4 lg:p-8 rounded-lg shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
          <h2 className="text-xl font-bold mb-6" style={{ color: 'var(--primary-dark)' }}>{t("Edit Links")}</h2>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <select className="form-input" value={newPlatform} onChange={(e) => setNewPlatform(e.target.value as PlatformKey)}>
                {PLATFORM_OPTIONS.map((opt) => (
                  <option key={opt.key} value={opt.key}>{opt.label}</option>
                ))}
              </select>
              <input type="url" value={newUrl} onChange={(e) => setNewUrl(e.target.value)} className="form-input md:col-span-2" placeholder="https://..." />
              <button className="btn-primary w-full md:w-auto" onClick={addLink}>Add</button>
            </div>

            <div className="space-y-3">
              {links.map((l, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded border" style={{ borderColor: 'var(--border-gray)' }}>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center" style={{ color: 'var(--primary)' }}>
                      {PLATFORM_ICON[l.platform]({ size: 18 })}
                    </div>
                    <a href={l.url} target="_blank" rel="noopener noreferrer" className="text-sm hover:underline" style={{ color: 'var(--primary-dark)' }}>
                      {l.url}
                    </a>
                  </div>
                  <button onClick={() => deleteLink(idx)} className="btn-secondary">Remove</button>
                </div>
              ))}
            </div>

            <button className="btn-primary w-full">{t("Save Changes")}</button>
          </div>
        </div>

        {/* Right Side - Preview */}
        <div className="bg-white p-4 lg:p-8 rounded-lg shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
          <h2 className="text-xl font-bold mb-6" style={{ color: 'var(--primary-dark)' }}>{t("Connect With Me")}</h2>
          <div className="rounded-lg p-8" style={{ background: '#ECF6F8' }}>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
              {links.map((l, idx) => (
                <a key={idx} href={l.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-12 h-12 rounded-full bg-white transition-colors shadow-lg" style={{ color: 'var(--primary)' }}>
                  {PLATFORM_ICON[l.platform]({ size: 24 })}
                </a>
              ))}
            </div>

            <div className="mt-8 pt-8 space-y-2" style={{ borderTop: '1px solid color-mix(in oklab, var(--primary) 35%, white)' }}>
              {links.map((l, idx) => (
                <a key={idx} href={l.url} target="_blank" rel="noopener noreferrer" className="block text-sm truncate" style={{ color: 'var(--primary-dark)' }}>
                  {l.url}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
