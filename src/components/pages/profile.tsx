"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Upload, Mail, Phone, MapPin, Download } from "lucide-react"

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
    <div className="p-8">
      <div className="mb-8">
        <p className="text-gray-600">Manage your professional information</p>
      </div>

      <div className="grid grid-cols-2 gap-8">
        {/* Left Side - Form */}
        <div className="bg-white p-8 rounded-lg card-shadow">
          <h2 className="text-xl font-bold text-blue-900 mb-6">Edit Profile</h2>

          <div className="space-y-6">
            <div>
              <label className="form-label">Full Name</label>
              <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className="form-input" />
            </div>

            <div>
              <label className="form-label">Title / Rank</label>
              <input type="text" name="title" value={formData.title} onChange={handleChange} className="form-input" />
            </div>

            <div>
              <label className="form-label">Department</label>
              <select name="department" value={formData.department} onChange={handleChange} className="form-input">
                <option>Electrical Engineering</option>
                <option>Computer Engineering</option>
                <option>Software Engineering</option>
              </select>
            </div>

            <div>
              <label className="form-label">Role</label>
              <input type="text" name="role" value={formData.role} onChange={handleChange} className="form-input" />
            </div>

            <div>
              <label className="form-label">Office Location</label>
              <input type="text" name="officeLocation" value={formData.officeLocation} onChange={handleChange} className="form-input" />
            </div>

            <div>
              <label className="form-label">Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-input" />
            </div>

            <div>
              <label className="form-label">Phone</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="form-input" />
            </div>

            <div>
              <label className="form-label">Profile Image</label>
              <div
                className="border-2 border-dashed border-blue-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-500 transition-colors"
                onClick={() => imageInputRef.current?.click()}
              >
                <Upload size={28} className="mx-auto text-blue-600 mb-2" />
                <p className="text-sm text-gray-600">Click to upload profile image</p>
                <input type="file" ref={imageInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />
              </div>
            </div>

            <div>
              <label className="form-label">CV (PDF)</label>
              <div
                className="border-2 border-dashed border-blue-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-500 transition-colors"
                onClick={() => cvInputRef.current?.click()}
              >
                <Upload size={28} className="mx-auto text-blue-600 mb-2" />
                <p className="text-sm text-gray-600">Click to upload CV</p>
                <input type="file" ref={cvInputRef} onChange={handleCVUpload} accept=".pdf" className="hidden" />
              </div>
            </div>

            <button className="btn-primary w-full">Save Changes</button>
          </div>
        </div>

        {/* Right Side - Preview */}
        <div className="bg-white p-8 rounded-lg card-shadow sticky top-8">
          <h2 className="text-xl font-bold text-blue-900 mb-6">Preview</h2>

          <div className="bg-gradient-to-b from-blue-700 to-blue-900 rounded-lg p-6 text-white">
            <div className="mb-6">
              {formData.profileImage ? (
                <img src={formData.profileImage || "/placeholder.svg"} alt="Profile" className="w-32 h-32 rounded-full object-cover mx-auto border-4 border-white" />
              ) : (
                <div className="w-32 h-32 rounded-full bg-blue-500 mx-auto flex items-center justify-center border-4 border-white">
                  <span className="text-4xl">👤</span>
                </div>
              )}
            </div>

            <h3 className="text-2xl font-bold text-center">{formData.fullName}</h3>
            <p className="text-blue-100 text-center text-lg font-semibold">{formData.title}</p>
          </div>

          <div className="mt-6 space-y-4">
            <div className="pb-4 border-b border-gray-200">
              <p className="text-sm text-gray-600 font-semibold">Department</p>
              <p className="text-gray-800 mt-1">{formData.department}</p>
            </div>

            <div className="pb-4 border-b border-gray-200">
              <p className="text-sm text-gray-600 font-semibold">Role</p>
              <p className="text-gray-800 mt-1">{formData.role}</p>
            </div>

            <div className="pb-4 border-b border-gray-200 flex items-start gap-3">
              <MapPin size={16} className="text-blue-700 mt-1 flex-shrink-0" />
              <div>
                <p className="text-sm text-gray-600 font-semibold">Office</p>
                <p className="text-gray-800">{formData.officeLocation}</p>
              </div>
            </div>

            <div className="pb-4 border-b border-gray-200 flex items-start gap-3">
              <Mail size={16} className="text-blue-700 mt-1 flex-shrink-0" />
              <div>
                <p className="text-sm text-gray-600 font-semibold">Email</p>
                <a href={`mailto:${formData.email}`} className="text-blue-600 hover:underline">
                  {formData.email}
                </a>
              </div>
            </div>

            <div className="pb-4 flex items-start gap-3">
              <Phone size={16} className="text-blue-700 mt-1 flex-shrink-0" />
              <div>
                <p className="text-sm text-gray-600 font-semibold">Phone</p>
                <a href={`tel:${formData.phone}`} className="text-blue-600 hover:underline">
                  {formData.phone}
                </a>
              </div>
            </div>
          </div>

          <div className="mt-6 space-y-2">
            {formData.cv && (
              <button className="btn-secondary w-full flex items-center justify-center gap-2">
                <Download size={18} />
                Download CV
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
