"use client"

import { useState } from "react"
import { Trash2, Plus } from "lucide-react"

interface ExperienceEntry {
  id: string
  position: string
  organization: string
  startYear: number
  endYear: number | null
  isPresent: boolean
  description: string
}

interface EducationEntry {
  id: string
  degree: string
  institution: string
  year: number
}

export default function ExperienceEducation() {
  const [experiences, setExperiences] = useState<ExperienceEntry[]>([
    {
      id: "1",
      position: "Associate Professor",
      organization: "ASTU COEEC",
      startYear: 2018,
      endYear: null,
      isPresent: true,
      description: "Teaching and research in electrical engineering and computing.",
    },
    {
      id: "2",
      position: "Senior Engineer",
      organization: "Tech Solutions Ltd",
      startYear: 2015,
      endYear: 2018,
      isPresent: false,
      description: "Led software development teams and implemented cloud solutions.",
    },
  ])

  const [education, setEducation] = useState<EducationEntry[]>([
    {
      id: "1",
      degree: "PhD in Electrical Engineering",
      institution: "University of Technology",
      year: 2015,
    },
    {
      id: "2",
      degree: "M.Sc in Computer Science",
      institution: "National University",
      year: 2012,
    },
  ])

  const [newExperience, setNewExperience] = useState<Omit<ExperienceEntry, "id">>({
    position: "",
    organization: "",
    startYear: new Date().getFullYear(),
    endYear: null,
    isPresent: false,
    description: "",
  })

  const [newEducation, setNewEducation] = useState<Omit<EducationEntry, "id">>({
    degree: "",
    institution: "",
    year: new Date().getFullYear(),
  })

  const addExperience = () => {
    if (newExperience.position && newExperience.organization) {
      setExperiences([...experiences, { ...newExperience, id: Date.now().toString() }])
      setNewExperience({
        position: "",
        organization: "",
        startYear: new Date().getFullYear(),
        endYear: null,
        isPresent: false,
        description: "",
      })
    }
  }

  const deleteExperience = (id: string) => {
    setExperiences(experiences.filter((e) => e.id !== id))
  }

  const addEducation = () => {
    if (newEducation.degree && newEducation.institution) {
      setEducation([...education, { ...newEducation, id: Date.now().toString() }])
      setNewEducation({
        degree: "",
        institution: "",
        year: new Date().getFullYear(),
      })
    }
  }

  const deleteEducation = (id: string) => {
    setEducation(education.filter((e) => e.id !== id))
  }

  return (
    <div className="p-4 lg:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
        {/* Left Side - Form */}
        <div className="bg-white p-4 lg:p-8 rounded-lg card-shadow max-h-screen overflow-y-auto">
          <h2 className="text-xl font-bold mb-6" style={{ color: 'var(--primary-dark)' }}>Edit Experience & Education</h2>

          {/* Experience Section */}
          <div className="mb-8">
            <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--primary-dark)' }}>Experience</h3>
            <div className="space-y-4 mb-6">
              {experiences.map((exp) => (
                <div key={exp.id} className="p-4 rounded-lg" style={{ backgroundColor: 'var(--bg-light)' }}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-semibold text-gray-800">{exp.position}</p>
                      <p className="text-sm text-gray-600">{exp.organization}</p>
                    </div>
                    <button onClick={() => deleteExperience(exp.id)} className="p-2 rounded" style={{ color: 'var(--destructive)' }}>
                      <Trash2 size={18} />
                    </button>
                  </div>
                  <p className="text-xs font-semibold" style={{ color: 'var(--primary)' }}>
                    {exp.startYear} - {exp.isPresent ? 'Present' : exp.endYear}
                  </p>
                  {exp.description && <p className="text-sm text-gray-700 mt-2">{exp.description}</p>}
                </div>
              ))}
            </div>

            <div className="space-y-3 p-4 rounded-lg" style={{ backgroundColor: 'color-mix(in oklab, var(--primary) 12%, white)' }}>
              <input
                type="text"
                placeholder="Position Title"
                value={newExperience.position}
                onChange={(e) => setNewExperience({ ...newExperience, position: e.target.value })}
                className="form-input"
              />
              <input
                type="text"
                placeholder="Organization"
                value={newExperience.organization}
                onChange={(e) => setNewExperience({ ...newExperience, organization: e.target.value })}
                className="form-input"
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  placeholder="Start Year"
                  value={newExperience.startYear}
                  onChange={(e) => setNewExperience({ ...newExperience, startYear: Number.parseInt(e.target.value) })}
                  className="form-input"
                />
                <input
                  type="number"
                  placeholder="End Year"
                  disabled={newExperience.isPresent}
                  value={newExperience.endYear || ""}
                  onChange={(e) =>
                    setNewExperience({
                      ...newExperience,
                      endYear: e.target.value ? Number.parseInt(e.target.value) : null,
                    })
                  }
                  className="form-input disabled:bg-gray-100"
                />
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={newExperience.isPresent}
                  onChange={(e) => setNewExperience({ ...newExperience, isPresent: e.target.checked })}
                  className="cursor-pointer"
                />
                <span className="text-sm text-gray-700">Currently working here</span>
              </label>
              <textarea
                placeholder="Description"
                value={newExperience.description}
                onChange={(e) => setNewExperience({ ...newExperience, description: e.target.value })}
                className="form-input resize-none"
                rows={3}
              />
              <button onClick={addExperience} className="btn-primary w-full flex items-center justify-center gap-2">
                <Plus size={18} />
                Add Experience
              </button>
            </div>
          </div>

          {/* Education Section */}
          <div>
            <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--primary-dark)' }}>Education</h3>
            <div className="space-y-4 mb-6">
              {education.map((edu) => (
                <div key={edu.id} className="p-4 rounded-lg" style={{ backgroundColor: 'var(--bg-light)' }}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-semibold text-gray-800">{edu.degree}</p>
                      <p className="text-sm text-gray-600">{edu.institution}</p>
                    </div>
                    <button onClick={() => deleteEducation(edu.id)} className="p-2 rounded" style={{ color: 'var(--destructive)' }}>
                      <Trash2 size={18} />
                    </button>
                  </div>
                  <p className="text-xs font-semibold" style={{ color: 'var(--primary)' }}>{edu.year}</p>
                </div>
              ))}
            </div>

            <div className="space-y-3 p-4 rounded-lg" style={{ backgroundColor: 'color-mix(in oklab, var(--primary) 12%, white)' }}>
              <input
                type="text"
                placeholder="Degree Title"
                value={newEducation.degree}
                onChange={(e) => setNewEducation({ ...newEducation, degree: e.target.value })}
                className="form-input"
              />
              <input
                type="text"
                placeholder="Institution"
                value={newEducation.institution}
                onChange={(e) => setNewEducation({ ...newEducation, institution: e.target.value })}
                className="form-input"
              />
              <input
                type="number"
                placeholder="Year Completed"
                value={newEducation.year}
                onChange={(e) => setNewEducation({ ...newEducation, year: Number.parseInt(e.target.value) })}
                className="form-input"
              />
              <button onClick={addEducation} className="btn-primary w-full flex items-center justify-center gap-2">
                <Plus size={18} />
                Add Education
              </button>
            </div>
          </div>

          <button className="btn-primary w-full mt-8">Save Changes</button>
        </div>

        {/* Right Side - Timeline Preview */}
        <div className="bg-white p-4 lg:p-8 rounded-lg card-shadow lg:sticky lg:top-8 max-h-screen overflow-y-auto">
          <h2 className="text-xl font-bold mb-6" style={{ color: 'var(--primary-dark)' }}>Timeline Preview</h2>

          <div className="space-y-6">
            {/* Experience Timeline */}
            <div>
              <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--primary-dark)' }}>Experience</h3>
              <div className="relative pl-6">
                {experiences.map((exp, idx) => (
                  <div key={exp.id} className="relative mb-6">
                    <div className="absolute -left-6 top-2 w-3 h-3 rounded-full" style={{ backgroundColor: 'var(--primary)' }}></div>
                    {idx < experiences.length - 1 && <div className="absolute -left-5 top-5 w-0.5 h-16" style={{ backgroundColor: 'color-mix(in oklab, var(--primary) 40%, white)' }}></div>}
                    <div className="p-4 rounded-lg border" style={{ backgroundColor: 'color-mix(in oklab, var(--primary) 10%, white)', borderColor: 'color-mix(in oklab, var(--primary) 30%, white)' }}>
                      <h4 className="font-bold text-gray-800">{exp.position}</h4>
                      <p className="text-sm text-gray-600">{exp.organization}</p>
                      <p className="text-xs font-semibold mt-2" style={{ color: 'var(--primary)' }}>
                        {exp.startYear} - {exp.isPresent ? 'Present' : exp.endYear}
                      </p>
                      {exp.description && <p className="text-sm text-gray-700 mt-2">{exp.description}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Education Timeline */}
            <div>
              <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--primary-dark)' }}>Education</h3>
              <div className="relative pl-6">
                {education.map((edu, idx) => (
                  <div key={edu.id} className="relative mb-6">
                    <div className="absolute -left-6 top-2 w-3 h-3 rounded-full" style={{ backgroundColor: 'var(--accent)' }}></div>
                    {idx < education.length - 1 && <div className="absolute -left-5 top-5 w-0.5 h-16" style={{ backgroundColor: 'color-mix(in oklab, var(--accent) 40%, white)' }}></div>}
                    <div className="p-4 rounded-lg border" style={{ backgroundColor: 'color-mix(in oklab, var(--accent) 10%, white)', borderColor: 'color-mix(in oklab, var(--accent) 30%, white)' }}>
                      <h4 className="font-bold text-gray-800">{edu.degree}</h4>
                      <p className="text-sm text-gray-600">{edu.institution}</p>
                      <p className="text-xs font-semibold mt-2" style={{ color: 'var(--accent)' }}>{edu.year}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
