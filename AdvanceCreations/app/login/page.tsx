"use client"

import Link from "next/link"
import { User, Lock, Eye, EyeOff, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { db } from "@/lib/firebase"
import { collection, query, where, getDocs } from "firebase/firestore"

export default function LoginPage() {
    const router = useRouter()
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [authError, setAuthError] = useState<string | null>(null)

    // State for form fields
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    // Error state
    const [errors, setErrors] = useState<{ email?: string, password?: string }>({})

    const validate = () => {
        let newErrors: { email?: string, password?: string } = {}
        let isValid = true

        // Email Validation
        if (!formData.email.trim()) {
            newErrors.email = "Email is required"
            isValid = false
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Invalid email format"
            isValid = false
        }

        // Password Validation
        if (!formData.password) {
            newErrors.password = "Password is required"
            isValid = false
        }

        setErrors(newErrors)
        return isValid
    }

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setAuthError(null)

        if (validate()) {
            setIsLoading(true)
            try {
                // Option 2 Logic: Query Firestore 'users' collection
                const usersRef = collection(db, "users")
                const q = query(usersRef, where("email", "==", formData.email))
                const querySnapshot = await getDocs(q)

                if (querySnapshot.empty) {
                    setAuthError("No account found with this email.")
                    setIsLoading(false)
                    return
                }

                const userData = querySnapshot.docs[0].data()

                // Compare password (pswd field in your Firestore)
                if (userData.pswd === formData.password) {
                    // Check for admin user
                    const isAdmin = formData.email.toLowerCase().includes("fatima") ||
                        formData.email === "fatimaaftab.1388@gmail.com"

                    if (isAdmin) {
                        router.push("/admin/dashboard")
                    } else {
                        router.push("/")
                    }
                } else {
                    setAuthError("Incorrect password.")
                }
            } catch (error: any) {
                console.error("Firestore Login Error:", error)
                setAuthError("An error occurred. Please try again.")
            } finally {
                setIsLoading(false)
            }
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
        if (errors[e.target.name as keyof typeof errors]) {
            setErrors(prev => ({ ...prev, [e.target.name]: undefined }))
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 font-sans">

            <div className="relative w-full max-w-3xl bg-white rounded-[30px] shadow-xl overflow-hidden min-h-[450px] flex">

                {/* --- Background Decorative Waves (The one you liked) --- */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-primary/30 via-primary/5 to-transparent rounded-full blur-3xl opacity-50 -mr-32 -mt-32 pointer-events-none"></div>
                <svg className="absolute top-0 right-0 w-[70%] h-[70%] pointer-events-none z-0" viewBox="0 0 500 500" preserveAspectRatio="none">
                    <path d="M300,0 L500,0 L500,300 Q400,400 300,300 Q200,200 300,0 Z" fill="url(#grad1)" />
                    <defs>
                        <linearGradient id="grad1" x1="1" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#C5A059" stopOpacity="0.4" />
                            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                </svg>

                <svg className="absolute bottom-0 left-0 w-[70%] h-[50%] pointer-events-none z-0" viewBox="0 0 500 300" preserveAspectRatio="none">
                    <path d="M0,300 L300,300 Q400,200 200,100 Q0,0 0,100 Z" fill="url(#grad2)" />
                    <defs>
                        <linearGradient id="grad2" x1="0" y1="1" x2="1" y2="0">
                            <stop offset="0%" stopColor="#C5A059" stopOpacity="0.3" />
                            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                </svg>

                {/* --- Content Container --- */}
                <div className="relative z-10 w-full grid grid-cols-1 md:grid-cols-2">

                    {/* Left Side: Form */}
                    <div className="p-8 flex flex-col justify-center items-center md:items-start">
                        <div className="w-full max-w-xs space-y-6">
                            <div className="text-center md:text-left">
                                <h2 className="text-3xl font-extrabold text-black">Hello!</h2>
                                <p className="text-gray-500 text-sm mt-1">Sign in to your account</p>
                            </div>

                            {authError && (
                                <div className="bg-red-50 text-red-600 p-3 rounded-xl text-xs font-medium border border-red-100 animate-in fade-in slide-in-from-top-1 text-center font-bold">
                                    {authError}
                                </div>
                            )}

                            <form onSubmit={handleLogin} className="space-y-4 mt-6 w-full">
                                {/* Email Input */}
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <div className={`p-1.5 rounded-md transition-colors ${errors.email || authError ? 'bg-red-50' : 'bg-gray-100 group-focus-within:bg-primary group-focus-within:text-black'}`}>
                                            <User className={`h-4 w-4 ${errors.email || authError ? 'text-red-500' : 'text-gray-500 group-focus-within:text-black'}`} />
                                        </div>
                                    </div>
                                    <input
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        type="email"
                                        placeholder="Email Address"
                                        className={`w-full pl-12 pr-4 py-3 bg-gray-50 rounded-xl border focus:ring-1 shadow-[inset_1px_1px_4px_rgba(0,0,0,0.05)] transition-all outline-none font-medium text-sm text-black placeholder-gray-400
                                ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-none focus:ring-primary'}`}
                                    />
                                    {errors.email && <p className="text-xs text-red-500 mt-1 ml-1">{errors.email}</p>}
                                </div>

                                {/* Password Input */}
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <div className={`p-1.5 rounded-md transition-colors ${errors.password || authError ? 'bg-red-50' : 'bg-gray-100 group-focus-within:bg-primary group-focus-within:text-black'}`}>
                                            <Lock className={`h-4 w-4 ${errors.password || authError ? 'text-red-500' : 'text-gray-500 group-focus-within:text-black'}`} />
                                        </div>
                                    </div>
                                    <input
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Password"
                                        className={`w-full pl-12 pr-10 py-3 bg-gray-50 rounded-xl border focus:ring-1 shadow-[inset_1px_1px_4px_rgba(0,0,0,0.05)] transition-all outline-none font-medium text-sm text-black placeholder-gray-400
                                ${errors.password ? 'border-red-500 focus:ring-red-500' : 'border-none focus:ring-primary'}`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-primary transition-colors cursor-pointer"
                                    >
                                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                    {errors.password && <p className="text-xs text-red-500 mt-1 ml-1">{errors.password}</p>}
                                </div>

                                <div className="flex items-center justify-between text-xs px-1">
                                    <label className="flex items-center gap-2 cursor-pointer select-none">
                                        <input type="checkbox" className="w-4 h-4 rounded border-gray-300 accent-primary" />
                                        <span className="text-gray-500 font-medium">Remember me</span>
                                    </label>
                                    <Link href="#" className="text-gray-400 hover:text-primary font-medium transition-colors">Forgot password?</Link>
                                </div>

                                {/* Button */}
                                <button
                                    disabled={isLoading}
                                    type="submit"
                                    className="w-full bg-primary text-black font-bold py-3 rounded-full shadow-md hover:shadow-lg hover:bg-black hover:text-white transition-all active:scale-95 text-sm tracking-wide border-b-4 border-primary/50 hover:border-primary flex items-center justify-center gap-2"
                                >
                                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "SIGN IN"}
                                </button>

                                <p className="text-center text-xs text-gray-500 mt-4">
                                    Don't have an account? <Link href="/membership" className="font-bold text-primary hover:underline">Create Account</Link>
                                </p>
                            </form>
                        </div>
                    </div>

                    {/* Right Side: Welcome Text */}
                    <div className="p-8 hidden md:flex flex-col justify-center items-end text-right relative pointer-events-none">
                        <div className="relative z-10 max-w-xs mr-4">
                            <h2 className="text-4xl font-extrabold text-black mb-4 leading-tight">Welcome <br /><span className="text-primary italic">Back!</span></h2>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}
