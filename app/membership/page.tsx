"use client"

import Link from "next/link"
import { User, Lock, Eye, EyeOff, Mail, CheckCircle, AlertCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function MembershipPage() {
    const router = useRouter()
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    // State for form fields
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    // Error state
    const [errors, setErrors] = useState<{ fullName?: string, email?: string, password?: string, confirmPassword?: string }>({})

    const validate = () => {
        let newErrors: { fullName?: string, email?: string, password?: string, confirmPassword?: string } = {}
        let isValid = true

        // Name Validation: Only Alphabets
        if (!/^[a-zA-Z\s]+$/.test(formData.fullName)) {
            newErrors.fullName = "Name can only contain alphabets"
            isValid = false
        }
        if (!formData.fullName.trim()) {
            newErrors.fullName = "Full Name is required"
            isValid = false
        }

        // Email Validation: Proper format
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Please enter a valid email address"
            isValid = false
        }

        // Password Validation
        if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters"
            isValid = false
        }

        // Confirm Password
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match"
            isValid = false
        }

        setErrors(newErrors)
        return isValid
    }

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault()
        if (validate()) {
            // Simulate registration
            alert("Registration Successful!")
            router.push("/login")
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
        // Clear error when user types
        if (errors[e.target.name as keyof typeof errors]) {
            setErrors(prev => ({ ...prev, [e.target.name]: undefined }))
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 font-sans">

            {/* Container Size Reduced matches Login Page */}
            <div className="relative w-full max-w-3xl bg-white rounded-[30px] shadow-xl overflow-hidden min-h-[550px] flex">

                {/* --- Background Decorative Waves (Same Black & Gold Theme) --- */}

                {/* Top Right Wave */}
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

                {/* Bottom Left Wave */}
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
                        <div className="w-full max-w-xs space-y-4">
                            <div className="text-center md:text-left">
                                <h2 className="text-3xl font-extrabold text-black">Sign Up</h2>
                                <p className="text-gray-500 text-sm mt-1">Join Advance Creations</p>
                            </div>

                            <form onSubmit={handleRegister} className="space-y-3 mt-4 w-full">
                                {/* Name Input */}
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <div className={`p-1.5 rounded-md transition-colors ${errors.fullName ? 'bg-red-50' : 'bg-gray-100 group-focus-within:bg-primary group-focus-within:text-black'}`}>
                                            <User className={`h-4 w-4 ${errors.fullName ? 'text-red-500' : 'text-gray-500 group-focus-within:text-black'}`} />
                                        </div>
                                    </div>
                                    <input
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        type="text"
                                        placeholder="Full Name"
                                        className={`w-full pl-12 pr-4 py-3 bg-gray-50 rounded-xl border focus:ring-1 shadow-[inset_1px_1px_4px_rgba(0,0,0,0.05)] transition-all outline-none font-medium text-sm text-black placeholder-gray-400
                                ${errors.fullName ? 'border-red-500 focus:ring-red-500' : 'border-none focus:ring-primary'}`}
                                    />
                                    {errors.fullName && <p className="text-xs text-red-500 mt-1 ml-1">{errors.fullName}</p>}
                                </div>

                                {/* Email Input */}
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <div className={`p-1.5 rounded-md transition-colors ${errors.email ? 'bg-red-50' : 'bg-gray-100 group-focus-within:bg-primary group-focus-within:text-black'}`}>
                                            <Mail className={`h-4 w-4 ${errors.email ? 'text-red-500' : 'text-gray-500 group-focus-within:text-black'}`} />
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
                                        <div className={`p-1.5 rounded-md transition-colors ${errors.password ? 'bg-red-50' : 'bg-gray-100 group-focus-within:bg-primary group-focus-within:text-black'}`}>
                                            <Lock className={`h-4 w-4 ${errors.password ? 'text-red-500' : 'text-gray-500 group-focus-within:text-black'}`} />
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

                                {/* Confirm Password Input */}
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <div className={`p-1.5 rounded-md transition-colors ${errors.confirmPassword ? 'bg-red-50' : 'bg-gray-100 group-focus-within:bg-primary group-focus-within:text-black'}`}>
                                            <CheckCircle className={`h-4 w-4 ${errors.confirmPassword ? 'text-red-500' : 'text-gray-500 group-focus-within:text-black'}`} />
                                        </div>
                                    </div>
                                    <input
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        type={showConfirmPassword ? "text" : "password"}
                                        placeholder="Confirm Password"
                                        className={`w-full pl-12 pr-10 py-3 bg-gray-50 rounded-xl border focus:ring-1 shadow-[inset_1px_1px_4px_rgba(0,0,0,0.05)] transition-all outline-none font-medium text-sm text-black placeholder-gray-400
                                ${errors.confirmPassword ? 'border-red-500 focus:ring-red-500' : 'border-none focus:ring-primary'}`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-primary transition-colors cursor-pointer"
                                    >
                                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                    {errors.confirmPassword && <p className="text-xs text-red-500 mt-1 ml-1">{errors.confirmPassword}</p>}
                                </div>

                                {/* Button */}
                                <button type="submit" className="w-full bg-primary text-white font-bold py-3 rounded-full shadow-md hover:shadow-lg hover:bg-black transition-all active:scale-95 text-sm tracking-wide border-b-4 border-primary/50 hover:border-primary mt-2">
                                    REGISTER
                                </button>

                                <p className="text-center text-xs text-gray-500 mt-4">
                                    Already have an account? <Link href="/login" className="font-bold text-primary hover:underline">Sign In</Link>
                                </p>
                            </form>
                        </div>
                    </div>

                    {/* Right Side: Welcome Text */}
                    <div className="p-8 hidden md:flex flex-col justify-center items-end text-right relative pointer-events-none">
                        <div className="relative z-10 max-w-xs mr-4">
                            <h2 className="text-4xl font-extrabold text-black mb-4 leading-tight">Become a <br /><span className="text-primary">Member!</span></h2>
                            {/* REMOVED DESCRIPTION TEXT HERE */}
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}
