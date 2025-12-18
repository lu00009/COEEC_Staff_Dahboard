import { useState } from "react"
import { useAuth } from "../../../context/AuthContext"
import { PageType } from "../../breadcrumbs"

interface SignupProps {
    onNavigate: (page: PageType) => void
}

export default function Signup({ onNavigate }: SignupProps) {
    const { signup } = useAuth()
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        staffId: "",
    })
    const [errors, setErrors] = useState<Record<string, string>>({})
    const [isSubmitting, setIsSubmitting] = useState(false)

    const validateForm = () => {
        const newErrors: Record<string, string> = {}

        if (!formData.name.trim()) {
            newErrors.name = "Full name is required"
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required"
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Please enter a valid email address"
        }

        if (!formData.staffId.trim()) {
            newErrors.staffId = "Staff ID is required"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validateForm()) {
            return
        }

        setIsSubmitting(true)

        try {
            await signup(formData.name, formData.email, formData.staffId)
            // Navigate to verification page
            onNavigate("verification")
        } catch (error) {
            console.error("Signup error:", error)
            setErrors({ submit: "An error occurred during signup. Please try again." })
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
        // Clear error for this field when user starts typing
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }))
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
            <div className="max-w-md w-full">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold mb-2" style={{ color: "var(--primary)" }}>
                        Create Your Account
                    </h1>
                    <p className="text-gray-600">Join the ASTU COEEC Staff Portal</p>
                </div>

                {/* Signup Card */}
                <div className="bg-white rounded-lg shadow-lg p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Full Name */}
                        <div>
                            <label htmlFor="name" className="form-label">
                                Full Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="form-input"
                                placeholder="Enter your full name"
                            />
                            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                        </div>

                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="form-label">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="form-input"
                                placeholder="Enter your email"
                            />
                            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                        </div>

                        {/* Staff ID */}
                        <div>
                            <label htmlFor="staffId" className="form-label">
                                Staff ID
                            </label>
                            <input
                                type="text"
                                id="staffId"
                                name="staffId"
                                value={formData.staffId}
                                onChange={handleChange}
                                className="form-input"
                                placeholder="Enter your staff ID"
                            />
                            {errors.staffId && <p className="mt-1 text-sm text-red-600">{errors.staffId}</p>}
                        </div>

                        {/* Submit Error */}
                        {errors.submit && (
                            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                                <p className="text-sm text-red-600">{errors.submit}</p>
                            </div>
                        )}

                        {/* Submit Button */}
                        <button type="submit" disabled={isSubmitting} className="btn-primary w-full py-3 text-base font-semibold">
                            {isSubmitting ? "Creating Account..." : "Create Account"}
                        </button>
                    </form>

                    {/* Sign In Link */}
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            Already have an account?{" "}
                            <button
                                onClick={() => onNavigate("signin")}
                                className="font-semibold hover:underline"
                                style={{ color: "var(--primary)" }}
                            >
                                Sign In
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
