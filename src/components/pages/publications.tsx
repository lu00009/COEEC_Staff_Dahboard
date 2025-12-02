"use client"

import { useState } from "react"
import { Trash2, Plus } from "lucide-react"

interface Publication {
  id: string
  title: string
  journal: string
  year: number
  description: string
}

export default function Publications() {
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
    <div className="p-8">
      <div className="mb-8">
        <p className="text-gray-600">Manage your research publications</p>
      </div>

      <div className="grid grid-cols-2 gap-8">
        {/* Left Side - Form */}
        <div className="bg-white p-8 rounded-lg card-shadow max-h-screen overflow-y-auto">
          <h2 className="text-xl font-bold text-blue-900 mb-6">Add Publication</h2>

          <div className="space-y-4 mb-6">
            {publications.map((pub) => (
              <div key={pub.id} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
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

          <div className="space-y-3 p-4 bg-blue-50 rounded-lg">
            <input
              type="text"
              placeholder="Publication Title"
              value={newPublication.title}
              onChange={(e) => setNewPublication({ ...newPublication, title: e.target.value })}
              className="form-input"
            />
            <input
              type="text"
              placeholder="Journal / Conference / Publisher"
              value={newPublication.journal}
              onChange={(e) => setNewPublication({ ...newPublication, journal: e.target.value })}
              className="form-input"
            />
            <input
              type="number"
              placeholder="Year"
              value={newPublication.year}
              onChange={(e) => setNewPublication({ ...newPublication, year: Number.parseInt(e.target.value) })}
              className="form-input"
            />
            <textarea
              placeholder="Description"
              value={newPublication.description}
              onChange={(e) => setNewPublication({ ...newPublication, description: e.target.value })}
              className="form-input resize-none"
              rows={3}
            />
            <button onClick={addPublication} className="btn-primary w-full flex items-center justify-center gap-2">
              <Plus size={18} />
              Add Publication
            </button>
          </div>

          <button className="btn-primary w-full mt-8">Save Changes</button>
        </div>

        {/* Right Side - List Preview */}
        <div className="bg-white p-8 rounded-lg card-shadow sticky top-8 max-h-screen overflow-y-auto">
          <h2 className="text-xl font-bold text-blue-900 mb-6">Publications List</h2>

          <div className="space-y-4">
            {publications.length > 0 ? (
              publications.map((pub, idx) => (
                <div
                  key={pub.id}
                  className="bg-gradient-to-r from-blue-50 to-transparent p-4 rounded-lg border border-blue-200"
                >
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-700 text-white flex items-center justify-center flex-shrink-0 font-bold text-sm">
                      {idx + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-800">{pub.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{pub.journal}</p>
                      <p className="text-xs text-blue-700 font-semibold mt-2">{pub.year}</p>
                      {pub.description && (
                        <p className="text-sm text-gray-700 mt-2 leading-relaxed">{pub.description}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-8">No publications added yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
