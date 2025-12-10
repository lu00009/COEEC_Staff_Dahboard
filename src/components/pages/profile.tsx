"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Upload, Mail, Phone, MapPin, Download } from "lucide-react"
import { useLanguage } from "../../context/LanguageContext"

interface ProfileFormData {
  fullName: string
  title: string
  department: string
  role: string
  officeLocation: string
  email: string
  phone: string
  profileImage: string | null
  cv: string | null
}

export default function Profile() {
  const { t } = useLanguage()

  const [formData, setFormData] = useState<ProfileFormData>({
    fullName: "Dr. Samuel Tadesse",
    title: "Associate Professor",
    department: "Electrical Engineering",
    role: "Faculty Member",
    officeLocation: "Room 401, Building A",
    email: "s.tadesse@astu.edu.et",
    phone: "+251-911-123-456",
    profileImage: null,
    cv: null,
  })

  const imageInputRef = useRef<HTMLInputElement>(null)
  const cvInputRef = useRef<HTMLInputElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, profileImage: reader.result as string }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCVUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData((prev) => ({ ...prev, cv: file.name }))
    }
  }

  return (
    <div className="p-4 lg:p-8 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {/* Left Side - Form */}
        <div className="bg-white p-8 rounded-lg shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
          <h2 className="text-xl font-bold mb-6" style={{ color: 'var(--primary-dark)' }}>{t("Edit Profile")}</h2>

          <div className="space-y-6">
            <div>
              <label className="form-label">{t("fullName")}</label>
              <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className="form-input" />
            </div>

            <div>
              <label className="form-label">{t("Title Rank")}</label>
              <input type="text" name="title" value={formData.title} onChange={handleChange} className="form-input" />
            </div>

            <div>
              <label className="form-label">{t("department")}</label>
              <select name="department" value={formData.department} onChange={handleChange} className="form-input">
                <option>Electrical Engineering</option>
                <option>Computer Engineering</option>
                <option>Software Engineering</option>
              </select>
            </div>

            <div>
              <label className="form-label">{t("role")}</label>
              <input type="text" name="role" value={formData.role} onChange={handleChange} className="form-input" />
            </div>

            <div>
              <label className="form-label">{t("officeLocation")}</label>
              <input type="text" name="officeLocation" value={formData.officeLocation} onChange={handleChange} className="form-input" />
            </div>

            <div>
              <label className="form-label">{t("email")}</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-input" />
            </div>

            <div>
              <label className="form-label">{t("phone")}</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="form-input" />
            </div>

            <div>
              <label className="form-label">{t("profileImage")}</label>
              <div
                className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors"
                style={{ borderColor: 'color-mix(in oklab, var(--primary) 40%, white)' }}
                onClick={() => imageInputRef.current?.click()}
              >
                <Upload size={28} className="mx-auto mb-2" style={{ color: 'var(--primary)' }} />
                <p className="text-sm" style={{ color: 'color-mix(in oklab, var(--primary) 50%, black)' }}>{t("clickToUploadProfileImage")}</p>
                <input type="file" ref={imageInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />
              </div>
            </div>

            <div>
              <label className="form-label">{t("cvPdf")}</label>
              <div
                className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors"
                style={{ borderColor: 'color-mix(in oklab, var(--primary) 40%, white)' }}
                onClick={() => cvInputRef.current?.click()}
              >
                <Upload size={28} className="mx-auto mb-2" style={{ color: 'var(--primary)' }} />
                <p className="text-sm" style={{ color: 'color-mix(in oklab, var(--primary) 50%, black)' }}>{t("clickToUploadCv")}</p>
                <input type="file" ref={cvInputRef} onChange={handleCVUpload} accept=".pdf" className="hidden" />
              </div>
            </div>

            <button className="btn-primary w-full">{t("Save Changes")}</button>
          </div>
        </div>

        {/* Right Side - Preview */}
        <div className="bg-white p-8 rounded-lg shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
          <h2 className="text-xl font-bold mb-6" style={{ color: 'var(--primary-dark)' }}>{t("Preview")}</h2>

          <div className="rounded-lg p-6 text-white" style={{background: '#ECF6F8', color: 'color-mix(in oklab, var(--primary) 55%, black)'}}>
            <div className="mb-6">
              {formData.profileImage ? (
                <img src={formData.profileImage || "/placeholder.svg"} alt="Profile" className="w-32 h-32 rounded-full object-cover mx-auto border-4" style={{ borderColor: 'var(--white)' }} />
              ) : (
                <div className="w-32 h-32 rounded-full mx-auto flex items-center justify-center border-4" style={{ backgroundColor: 'var(--primary)', borderColor: 'var(--white)' }}>
                  <span className="text-4xl" style={{ color: 'var(--white)' }}>👤</span>
                </div>
              )}
            </div>

            <h3 className="text-2xl font-bold text-center">{formData.fullName}</h3>
            <p className="text-center text-lg font-semibold" style={{ color: 'color-mix(in oklab, var(--primary) 25%, white)' }}>{formData.title}</p>
          </div>

          <div className="mt-6 space-y-4">
            <div className="pb-4 border-gray-200">
              <p className="text-sm font-semibold" style={{ color: 'var(--primary-dark)' }}>{t("department")}</p>
              <p className="text-gray-800 mt-1">{formData.department}</p>
            </div>

            <div className="pb-4 border-gray-200">
              <p className="text-sm font-semibold" style={{ color: 'var(--primary-dark)' }}>{t("role")}</p>
              <p className="text-gray-800 mt-1">{formData.role}</p>
            </div>

            <div className="pb-4 border-gray-200 flex items-start gap-3">
              <MapPin size={16} style={{ color: 'var(--primary)' }} className="mt-1 flex-shrink-0" />
              <div>
                <p className="text-sm text-gray-600 font-semibold">{t("office")}</p>
                <p className="text-gray-800">{formData.officeLocation}</p>
              </div>
            </div>

            <div className="pb-4 border-gray-200 flex items-start gap-3">
              <Mail size={16} style={{ color: 'var(--primary)' }} className="mt-1 flex-shrink-0" />
              <div>
                <p className="text-sm text-gray-600 font-semibold">{t("email")}</p>
                <a href={`mailto:${formData.email}`} className="hover:underline" style={{ color: 'var(--primary)' }}>
                  {formData.email}
                </a>
              </div>
            </div>

            <div className="pb-4 flex items-start gap-3">
              <Phone size={16} style={{ color: 'var(--primary)' }} className="mt-1 flex-shrink-0" />
              <div>
                <p className="text-sm text-gray-600 font-semibold">{t("phone")}</p>
                <a href={`tel:${formData.phone}`} className="hover:underline" style={{ color: 'var(--primary)' }}>
                  {formData.phone}
                </a>
              </div>
            </div>
          </div>

          <div className="mt-6 space-y-2">
            {formData.cv && (
              <button className="btn-secondary w-full flex items-center justify-center gap-2">
                <Download size={18} />
                {t("downloadCv")}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
