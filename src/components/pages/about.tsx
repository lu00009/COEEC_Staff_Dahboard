"use client"

import { useState } from "react"
import { useLanguage } from "../../context/LanguageContext"

interface AboutFormData {
  description: string
}

export default function About() {
  const { t } = useLanguage()

  const [formData, setFormData] = useState<AboutFormData>({
    description: `I am a dedicated academic professional with extensive experience in electrical engineering and computing. With a passion for education and research, I strive to foster innovation and excellence in my field. My work focuses on bridging the gap between theoretical knowledge and practical applications, preparing students for successful careers in the digital age.

Over the years, I have been involved in numerous research projects, mentored countless students, and contributed to the advancement of technology in our institution and beyond.`,
  })

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <div className="p-4 lg:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
        {/* Left Side - Form */}
        <div className="bg-white p-4 lg:p-8 rounded-lg card-shadow">
          <h2 className="text-xl font-bold text-blue-900 mb-6">{t("about")}</h2>

          <div>
            <label className="form-label">{t("about_description")}</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={12}
              className="form-input resize-none"
              placeholder={t("write_your_professional_biography")}
            />
          </div>

          <button className="btn-primary w-full mt-6">{t("Save Changes")}</button>
        </div>

        {/* Right Side - Preview */}
        <div className="bg-white p-4 lg:p-8 rounded-lg card-shadow lg:sticky lg:top-8">
          <h2 className="text-xl font-bold text-blue-900 mb-6">{t("Preview")}</h2>

          <div className="bg-gradient-to-b from-blue-700 to-blue-900 rounded-lg p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">{t("about_me")}</h3>
            <div className="text-blue-100 leading-relaxed whitespace-pre-wrap break-words">{formData.description}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
