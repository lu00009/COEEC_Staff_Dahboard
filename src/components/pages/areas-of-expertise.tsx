"use client"

import type React from "react"

import { useState } from "react"
import { X, Plus } from "lucide-react"

const PRESET_EXPERTISE = [
  "Machine Learning",
  "Artificial Intelligence",
  "Deep Learning",
  "Computer Vision",
  "Software Engineering",
  "Cloud Computing",
  "Cybersecurity",
  "Data Science",
  "Embedded Systems",
  "IoT Systems",
  "Networking",
  "Distributed Systems",
  "Educational Technology",
  "Signal Processing",
  "Information Systems",
]

export default function AreasOfExpertise() {
  const [expertise, setExpertise] = useState<string[]>(["Machine Learning", "Cloud Computing", "Software Engineering"])
  const [inputValue, setInputValue] = useState("")
  const [filteredOptions, setFilteredOptions] = useState<string[]>([])
  const [showDropdown, setShowDropdown] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value)

    if (value.trim()) {
      const filtered = PRESET_EXPERTISE.filter(
        (item) => item.toLowerCase().includes(value.toLowerCase()) && !expertise.includes(item),
      )
      setFilteredOptions(filtered)
      setShowDropdown(true)
    } else {
      setFilteredOptions([])
      setShowDropdown(false)
    }
  }

  const addExpertise = (item: string) => {
    if (!expertise.includes(item)) {
      setExpertise([...expertise, item])
    }
    setInputValue("")
    setFilteredOptions([])
    setShowDropdown(false)
  }

  const handleCustomAdd = () => {
    if (inputValue.trim() && !expertise.includes(inputValue)) {
      setExpertise([...expertise, inputValue])
      setInputValue("")
      setFilteredOptions([])
      setShowDropdown(false)
    }
  }

  const removeExpertise = (item: string) => {
    setExpertise(expertise.filter((e) => e !== item))
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <p className="text-gray-600">Select or add your areas of specialization</p>
      </div>

      <div className="grid grid-cols-2 gap-8">
        {/* Left Side - Form */}
        <div className="bg-white p-8 rounded-lg card-shadow">
          <h2 className="text-xl font-bold text-blue-900 mb-6">Select Expertise</h2>

          <div>
            <label className="form-label">Areas of Expertise</label>
            <div className="relative">
              <div className="form-input p-3 cursor-text flex flex-wrap gap-2 items-center min-h-12">
                {expertise.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold"
                  >
                    {item}
                    <button onClick={() => removeExpertise(item)} className="hover:text-blue-900">
                      <X size={14} />
                    </button>
                  </span>
                ))}
                <input
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  onFocus={() => setShowDropdown(true)}
                  placeholder="Type to search or add..."
                  className="flex-1 outline-none bg-transparent text-sm min-w-32"
                />
              </div>

              {showDropdown && filteredOptions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                  {filteredOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => addExpertise(option)}
                      className="w-full text-left px-4 py-2 hover:bg-blue-50 border-b border-gray-100 last:border-0 text-sm"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-3 flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Add custom expertise..."
                className="form-input flex-1"
              />
              <button onClick={handleCustomAdd} className="btn-primary flex items-center gap-2">
                <Plus size={18} />
                Add
              </button>
            </div>
          </div>

          <button className="btn-primary w-full mt-8">Save Changes</button>
        </div>

        {/* Right Side - Preview */}
        <div className="bg-white p-8 rounded-lg card-shadow sticky top-8">
          <h2 className="text-xl font-bold text-blue-900 mb-6">Preview</h2>

          <div className="bg-gradient-to-b from-blue-700 to-blue-900 rounded-lg p-8">
            <h3 className="text-xl font-bold text-white mb-6">Expertise Areas</h3>
            <div className="flex flex-wrap gap-3">
              {expertise.length > 0 ? (
                expertise.map((item) => (
                  <span key={item} className="tag bg-orange-100 text-orange-700 border-orange-300">
                    {item}
                  </span>
                ))
              ) : (
                <p className="text-blue-100">No expertise areas added yet</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
