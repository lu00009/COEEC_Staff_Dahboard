"use client"

import { useState } from "react"
import { Linkedin, Globe, BookOpen, Mail } from "lucide-react"
import { useLanguage } from "../../context/LanguageContext"

interface ConnectData {
  linkedin: string
  googleScholar: string
  researchGate: string
  personalWebsite: string
}

export default function Connect() {
  const { t } = useLanguage()

  const [formData, setFormData] = useState<ConnectData>({
    linkedin: "https://linkedin.com/in/dr-samuel-tadesse",
    googleScholar: "https://scholar.google.com/citations?user=example",
    researchGate: "https://researchgate.net/profile/samuel-tadesse",
    personalWebsite: "https://example.com",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <div className="p-4 lg:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
        {/* Left Side - Form */}
        <div className="bg-white p-4 lg:p-8 rounded-lg card-shadow">
          <h2 className="text-xl font-bold text-blue-900 mb-6">{t("Edit Links")}</h2>

          <div className="space-y-6">
            <div>
              <label className="form-label">{t("Linkedin Profile")}</label>
              <input
                type="url"
                name="linkedin"
                value={formData.linkedin}
                onChange={handleChange}
                className="form-input"
                placeholder="https://linkedin.com/in/..."
              />
            </div>

            <div>
              <label className="form-label">{t("googleScholar")}</label>
              <input
                type="url"
                name="googleScholar"
                value={formData.googleScholar}
                onChange={handleChange}
                className="form-input"
                placeholder="https://scholar.google.com/..."
              />
            </div>

            <div>
              <label className="form-label">{t("researchGate")}</label>
              <input
                type="url"
                name="researchGate"
                value={formData.researchGate}
                onChange={handleChange}
                className="form-input"
                placeholder="https://researchgate.net/..."
              />
            </div>

            <div>
              <label className="form-label">{t("personalWebsite")}</label>
              <input
                type="url"
                name="personalWebsite"
                value={formData.personalWebsite}
                onChange={handleChange}
                className="form-input"
                placeholder="https://example.com"
              />
            </div>

            <button className="btn-primary w-full">{t("Save Changes")}</button>
          </div>
        </div>

        {/* Right Side - Preview */}
        <div className="bg-white p-4 lg:p-8 rounded-lg card-shadow lg:sticky lg:top-8">
          <h2 className="text-xl font-bold text-blue-900 mb-6">{t("Connect With Me")}</h2>

          <div className="bg-gradient-to-b from-blue-700 to-blue-900 rounded-lg p-8">
            <div className="grid grid-cols-2 gap-4">
              {formData.linkedin && (
                <a
                  href={formData.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-12 h-12 rounded-full bg-white text-blue-700 hover:bg-blue-100 transition-colors shadow-lg"
                  title="LinkedIn"
                >
                  <Linkedin size={24} />
                </a>
              )}

              {formData.googleScholar && (
                <a
                  href={formData.googleScholar}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-12 h-12 rounded-full bg-white text-blue-700 hover:bg-blue-100 transition-colors shadow-lg"
                  title="Google Scholar"
                >
                  <BookOpen size={24} />
                </a>
              )}

              {formData.researchGate && (
                <a
                  href={formData.researchGate}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-12 h-12 rounded-full bg-white text-blue-700 hover:bg-blue-100 transition-colors shadow-lg"
                  title="ResearchGate"
                >
                  <Globe size={24} />
                </a>
              )}

              {formData.personalWebsite && (
                <a
                  href={formData.personalWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-12 h-12 rounded-full bg-white text-blue-700 hover:bg-blue-100 transition-colors shadow-lg"
                  title="Personal Website"
                >
                  <Mail size={24} />
                </a>
              )}
            </div>

            <div className="mt-8 pt-8 border-t border-blue-600 space-y-3">
              {formData.linkedin && (
                <a
                  href={formData.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-white hover:text-blue-100 text-sm truncate"
                >
                  {t("linkedinProfile")}
                </a>
              )}
              {formData.googleScholar && (
                <a
                  href={formData.googleScholar}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-white hover:text-blue-100 text-sm truncate"
                >
                  {t("googleScholar")}
                </a>
              )}
              {formData.researchGate && (
                <a
                  href={formData.researchGate}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-white hover:text-blue-100 text-sm truncate"
                >
                  {t("researchGateProfile")}
                </a>
              )}
              {formData.personalWebsite && (
                <a
                  href={formData.personalWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-white hover:text-blue-100 text-sm truncate"
                >
                  {t("personalWebsite")}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
