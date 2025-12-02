"use client"

import { useState } from "react"
import { Linkedin, Globe, BookOpen, Mail } from "lucide-react"

interface ConnectData {
  linkedin: string
  googleScholar: string
  researchGate: string
  personalWebsite: string
}

export default function Connect() {
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
    <div className="p-8">
      <div className="mb-8">
        <p className="text-gray-600">Manage your social profiles and links</p>
      </div>

      <div className="grid grid-cols-2 gap-8">
        {/* Left Side - Form */}
        <div className="bg-white p-8 rounded-lg card-shadow">
          <h2 className="text-xl font-bold text-blue-900 mb-6">Edit Links</h2>

          <div className="space-y-6">
            <div>
              <label className="form-label">LinkedIn Profile</label>
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
              <label className="form-label">Google Scholar</label>
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
              <label className="form-label">ResearchGate</label>
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
              <label className="form-label">Personal Website</label>
              <input
                type="url"
                name="personalWebsite"
                value={formData.personalWebsite}
                onChange={handleChange}
                className="form-input"
                placeholder="https://example.com"
              />
            </div>

            <button className="btn-primary w-full">Save Changes</button>
          </div>
        </div>

        {/* Right Side - Preview */}
        <div className="bg-white p-8 rounded-lg card-shadow sticky top-8">
          <h2 className="text-xl font-bold text-blue-900 mb-6">Connect With Me</h2>

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
                  LinkedIn Profile
                </a>
              )}
              {formData.googleScholar && (
                <a
                  href={formData.googleScholar}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-white hover:text-blue-100 text-sm truncate"
                >
                  Google Scholar
                </a>
              )}
              {formData.researchGate && (
                <a
                  href={formData.researchGate}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-white hover:text-blue-100 text-sm truncate"
                >
                  ResearchGate Profile
                </a>
              )}
              {formData.personalWebsite && (
                <a
                  href={formData.personalWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-white hover:text-blue-100 text-sm truncate"
                >
                  Personal Website
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
