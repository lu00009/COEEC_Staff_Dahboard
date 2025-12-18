import { useEffect, useState } from "react"
import { useAuth } from "../../../context/AuthContext"
import { CheckCircle, Clock, Mail } from "lucide-react"
import { PageType } from "../../breadcrumbs"

interface VerificationProps {
    onNavigate: (page: PageType) => void
}

export default function Verification({ onNavigate }: VerificationProps) {
    const { tempUserData } = useAuth()
    // CONFIGURABLE: Change this to false to test unverified state
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [isVerified, setIsVerified] = useState(true)
    const [countdown, setCountdown] = useState(3)

    useEffect(() => {
        // If no temp user data, redirect to signup
        if (!tempUserData) {
            onNavigate("signup")
            return
        }

        // If verified, start countdown before redirecting to set password
        if (isVerified) {
            const timer = setInterval(() => {
                setCountdown((prev) => {
                    if (prev <= 1) {
                        clearInterval(timer)
                        onNavigate("set-password")
                        return 0
                    }
                    return prev - 1
                })
            }, 1000)

            return () => clearInterval(timer)
        }
    }, [isVerified, tempUserData, onNavigate])

    const handleResendEmail = () => {
        console.log("Resending verification email to:", tempUserData?.email)
        // In a real app, this would trigger a backend API call
        alert("Verification email sent! Please check your inbox.")
    }

    if (!tempUserData) {
        return null
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
            <div className="max-w-md w-full">
                {/* Verification Card */}
                <div className="bg-white rounded-lg shadow-lg p-8">
                    {isVerified ? (
                        // Verified State
                        <div className="text-center">
                            <div className="mx-auto mb-6 w-20 h-20 rounded-full flex items-center justify-center" style={{ backgroundColor: "color-mix(in oklab, var(--primary) 15%, white)" }}>
                                <CheckCircle className="w-12 h-12" style={{ color: "var(--primary)" }} />
                            </div>

                            <h1 className="text-2xl font-bold mb-2" style={{ color: "var(--primary)" }}>
                                Email Verified!
                            </h1>

                            <p className="text-gray-600 mb-6">
                                Your email <span className="font-semibold">{tempUserData.email}</span> has been successfully verified.
                            </p>

                            <div className="p-4 bg-blue-50 rounded-lg mb-6">
                                <p className="text-sm text-gray-700">
                                    Redirecting to set your password in <span className="font-bold text-lg" style={{ color: "var(--primary)" }}>{countdown}</span> seconds...
                                </p>
                            </div>

                            <button
                                onClick={() => onNavigate("set-password")}
                                className="btn-primary w-full py-3 text-base font-semibold"
                            >
                                Continue to Set Password
                            </button>
                        </div>
                    ) : (
                        // Unverified State
                        <div className="text-center">
                            <div className="mx-auto mb-6 w-20 h-20 rounded-full bg-yellow-100 flex items-center justify-center">
                                <Clock className="w-12 h-12 text-yellow-600" />
                            </div>

                            <h1 className="text-2xl font-bold mb-2 text-gray-800">
                                Verify Your Email
                            </h1>

                            <p className="text-gray-600 mb-6">
                                We've sent a verification link to <span className="font-semibold">{tempUserData.email}</span>
                            </p>

                            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg mb-6">
                                <div className="flex items-start gap-3">
                                    <Mail className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                                    <div className="text-left">
                                        <p className="text-sm font-semibold text-gray-800 mb-1">Check your inbox</p>
                                        <p className="text-sm text-gray-600">
                                            Click the verification link in the email to activate your account. Don't forget to check your spam folder!
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <p className="text-sm text-gray-600 mb-4">
                                Didn't receive the email?
                            </p>

                            <button
                                onClick={handleResendEmail}
                                className="btn-secondary w-full py-3 text-base font-semibold border"
                            >
                                Resend Verification Email
                            </button>

                            <div className="mt-6">
                                <button
                                    onClick={() => onNavigate("signup")}
                                    className="text-sm text-gray-600 hover:underline"
                                >
                                    Back to signup
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Developer Note */}
                <div className="mt-4 p-3 bg-gray-100 rounded-lg text-xs text-gray-600 text-center">
                    <strong>Developer Note:</strong> Toggle <code className="px-1 bg-white rounded">isVerified</code> in Verification.tsx to test both states
                </div>
            </div>
        </div>
    )
}
