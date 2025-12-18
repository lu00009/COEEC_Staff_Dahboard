import { useState } from "react"
import { useAuth } from "../../../context/AuthContext"
import { Eye, EyeOff, Check, X } from "lucide-react"
import { PageType } from "../../breadcrumbs"

interface SetPasswordProps {
    onNavigate: (page: PageType) => void
}

export default function SetPassword({ onNavigate }: SetPasswordProps) {
    const { setPassword, tempUserData } = useAuth()
    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: "",
    })
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [errors, setErrors] = useState<Record<string, string>>({})
    const [isSubmitting, setIsSubmitting] = useState(false)

    // Password strength calculation
    const getPasswordStrength = (password: string) => {
        if (!password) return { score: 0, label: "", color: "" }

        let score = 0
        if (password.length >= 8) score++
        if (password.length >= 12) score++
        if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++
        if (/\d/.test(password)) score++
        if (/[^A-Za-z0-9]/.test(password)) score++

        if (score <= 2) return { score, label: "Weak", color: "#ef4444" }
        if (score <= 3) return { score, label: "Fair", color: "#f59e0b" }
        if (score <= 4) return { score, label: "Good", color: "#3b82f6" }
        return { score, label: "Strong", color: "#10b981" }
    }

    const passwordStrength = getPasswordStrength(formData.password)

    const passwordRequirements = [
        { met: formData.password.length >= 8, text: "At least 8 characters" },
        { met: /[a-z]/.test(formData.password) && /[A-Z]/.test(formData.password), text: "Mixed case letters" },
        { met: /\d/.test(formData.password), text: "At least one number" },
        { met: /[^A-Za-z0-9]/.test(formData.password), text: "At least one special character" },
    ]

    const validateForm = () => {
        const newErrors: Record<string, string> = {}

        if (!formData.password) {
            newErrors.password = "Password is required"
        } else if (formData.password.length < 8) {
            newErrors.password = "Password must be at least 8 characters"
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = "Please confirm your password"
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match"
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
            await setPassword(formData.password)
            // Show success message before redirecting
            alert("Password set successfully! Redirecting to signin...")
            onNavigate("signin")
        } catch (error) {
            console.error("Set password error:", error)
            setErrors({ submit: "An error occurred. Please try again." })
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }))
        }
    }

    // Redirect if no temp user data
    if (!tempUserData) {
        onNavigate("signup")
        return null
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
            <div className="max-w-md w-full">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold mb-2" style={{ color: "var(--primary)" }}>
                        Set Your Password
                    </h1>
                    <p className="text-gray-600">
                        Creating account for <span className="font-semibold">{tempUserData.email}</span>
                    </p>
                </div>

                {/* Password Card */}
                <div className="bg-white rounded-lg shadow-lg p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* New Password */}
                        <div>
                            <label htmlFor="password" className="form-label">
                                New Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="form-input pr-10"
                                    placeholder="Enter your password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                            {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}

                            {/* Password Strength Indicator */}
                            {formData.password && (
                                <div className="mt-2">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-xs text-gray-600">Password Strength:</span>
                                        <span className="text-xs font-semibold" style={{ color: passwordStrength.color }}>
                                            {passwordStrength.label}
                                        </span>
                                    </div>
                                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                        <div
                                            className="h-full transition-all duration-300 rounded-full"
                                            style={{
                                                width: `${(passwordStrength.score / 5) * 100}%`,
                                                backgroundColor: passwordStrength.color,
                                            }}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Password Requirements */}
                            {formData.password && (
                                <div className="mt-3 space-y-1">
                                    {passwordRequirements.map((req, index) => (
                                        <div key={index} className="flex items-center gap-2 text-xs">
                                            {req.met ? (
                                                <Check size={14} className="text-green-600 flex-shrink-0" />
                                            ) : (
                                                <X size={14} className="text-gray-400 flex-shrink-0" />
                                            )}
                                            <span className={req.met ? "text-green-600" : "text-gray-500"}>{req.text}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label htmlFor="confirmPassword" className="form-label">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className="form-input pr-10"
                                    placeholder="Confirm your password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                >
                                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                            {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}

                            {/* Password Match Indicator */}
                            {formData.confirmPassword && formData.password === formData.confirmPassword && (
                                <div className="mt-2 flex items-center gap-2 text-sm text-green-600">
                                    <Check size={16} />
                                    <span>Passwords match</span>
                                </div>
                            )}
                        </div>

                        {/* Submit Error */}
                        {errors.submit && (
                            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                                <p className="text-sm text-red-600">{errors.submit}</p>
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="btn-primary w-full py-3 text-base font-semibold"
                        >
                            {isSubmitting ? "Setting Password..." : "Set Password & Continue"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
