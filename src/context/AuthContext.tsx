import React, { createContext, useContext, useState, ReactNode } from "react"

interface User {
  id: string
  email: string
  name: string
  staffId: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  signup: (name: string, email: string, staffId: string) => Promise<void>
  setPassword: (password: string) => Promise<void>
  tempUserData: { name: string; email: string; staffId: string } | null
  setTempUserData: (data: { name: string; email: string; staffId: string } | null) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [tempUserData, setTempUserData] = useState<{ name: string; email: string; staffId: string } | null>(null)

  const signup = async (name: string, email: string, staffId: string) => {
    // Store temporary user data for after verification
    setTempUserData({ name, email, staffId })
    console.log("Signup data:", { name, email, staffId })
    // In a real app, this would make an API call to create the user
  }

  const setPassword = async (password: string) => {
    console.log("Setting password for user:", tempUserData?.email, "Password length:", password.length)
    // In a real app, this would make an API call to set the password
    // For now, we'll simulate creating the user
    if (tempUserData) {
      setUser({
        id: "temp-id",
        email: tempUserData.email,
        name: tempUserData.name,
        staffId: tempUserData.staffId,
      })
      setTempUserData(null)
    }
  }

  const login = async (email: string, password: string) => {
    console.log("Login attempt:", { email, password })
    // In a real app, this would make an API call
    // For now, we'll simulate a successful login
    setUser({
      id: "temp-id",
      email: email,
      name: "John Doe",
      staffId: "STAFF123",
    })
  }

  const logout = () => {
    setUser(null)
    setTempUserData(null)
    console.log("User logged out")
  }

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    signup,
    setPassword,
    tempUserData,
    setTempUserData,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
