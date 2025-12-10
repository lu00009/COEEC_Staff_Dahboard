"use client"

import { useState } from "react"
import { Trash2, Plus } from "lucide-react"
import { useLanguage } from "../../context/LanguageContext"

interface Publication {
  id: string
  title: string
  journal: string
  year: number
  description: string
}

export default function Publications() {
  const { t } = useLanguage()

  const [publications, setPublications] = useState<Publication[]>([
    {
      id: "1",
      title: "Machine Learning in Cloud Infrastructure",
      journal: "IEEE Transactions on Cloud Computing",
      year: 2023,
      description: "A comprehensive study on machine learning applications in cloud infrastructure.",
    },
    {
      id: "2",
      title: "Advanced Network Optimization Techniques",
      journal: "Journal of Network Systems",
      year: 2022,
      description: "Exploring novel network optimization techniques for enhanced performance.",
    },
  ])

  const [newPublication, setNewPublication] = useState<Omit<Publication, "id">>({
    title: "",
    journal: "",
    year: new Date().getFullYear(),
    description: "",
  })

  const addPublication = () => {
    if (newPublication.title && newPublication.journal) {
      setPublications([...publications, { ...newPublication, id: Date.now().toString() }])
      setNewPublication({
        title: "",
        journal: "",
        year: new Date().getFullYear(),
        description: "",
      })
    }
  }

  const deletePublication = (id: string) => {
    setPublications(publications.filter((p) => p.id !== id))
  }

  return (
    <div className="p-4 lg:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
        {/* Left Side - Form */}
        <div className="bg-white p-4 lg:p-8 rounded-lg shadow-[0_2px_12px_rgba(0,0,0,0.02)] max-h-screen overflow-y-auto">
          <h2 className="text-xl font-bold mb-6" style={{ color: 'var(--primary-dark)' }}>{t("Add Publication")}</h2>

          <div className="space-y-4 mb-6">
            {publications.map((pub) => (
              <div key={pub.id} className="bg-gray-50 p-4 rounded-lg border-gray-200">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800">{pub.title}</p>
                    <p className="text-sm text-gray-600">{pub.journal}</p>
                    <p className="text-xs text-gray-500 mt-1">{pub.year}</p>
                  </div>
                  <button
                    onClick={() => deletePublication(pub.id)}
                    className="text-red-600 hover:bg-red-50 p-2 rounded"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4 p-4 rounded-lg bg-white">
            <div>
              <label className="form-label">{t("Publication Title")}</label>
              <input
                type="text"
                value={newPublication.title}
                onChange={(e) => setNewPublication({ ...newPublication, title: e.target.value })}
                className="form-input"
              />
            </div>
            <div>
              <label className="form-label">{t("Journal / Conference / Publisher")}</label>
              <input
                type="text"
                value={newPublication.journal}
                onChange={(e) => setNewPublication({ ...newPublication, journal: e.target.value })}
                className="form-input"
              />
            </div>
            <div>
              <label className="form-label">{t("Year")}</label>
              <input
                type="number"
                value={newPublication.year}
                onChange={(e) => setNewPublication({ ...newPublication, year: Number.parseInt(e.target.value) })}
                className="form-input"
              />
            </div>
            <div>
              <label className="form-label">{t("Description")}</label>
              <textarea
                value={newPublication.description}
                onChange={(e) => setNewPublication({ ...newPublication, description: e.target.value })}
                className="form-input resize-none"
                rows={3}
              />
            </div>
            <button onClick={addPublication} className="btn-primary w-full flex items-center justify-center gap-2">
              <Plus size={18} />
              {t("Add Publication")}
            </button>
          </div>

          <button className="btn-primary w-full mt-8">{t("Save Changes")}</button>
        </div>

        {/* Right Side - List Preview */}
        <div className="bg-white p-4 lg:p-8 rounded-lg shadow-[0_2px_12px_rgba(0,0,0,0.02)] lg:sticky lg:top-8 max-h-screen overflow-y-auto">
          <h2 className="text-xl font-bold mb-6" style={{ color: 'var(--primary-dark)' }}>{t("Publications List")}</h2>

          <div className="space-y-4">
            {publications.length > 0 ? (
              publications.map((pub, idx) => (
                <div key={pub.id} className="p-4 rounded-lg border" style={{ background: 'linear-gradient(90deg, color-mix(in oklab, var(--primary) 10%, white), transparent)', borderColor: 'color-mix(in oklab, var(--primary) 30%, white)' }}>
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full text-white flex items-center justify-center flex-shrink-0 font-bold text-sm" style={{ backgroundColor: 'var(--primary)' }}>
                      {idx + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-800">{pub.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{pub.journal}</p>
                      <p className="text-xs font-semibold mt-2" style={{ color: 'var(--primary)' }}>{pub.year}</p>
                      {pub.description && <p className="text-sm text-gray-700 mt-2 leading-relaxed">{pub.description}</p>}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center py-8" style={{ color: 'color-mix(in oklab, var(--primary) 50%, black)' }}>{t("No publications added yet")}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
