"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    Settings,
    LogOut,
    ChevronRight,
    Loader2
} from "lucide-react"
import { auth } from "@/lib/firebase"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname()
    const router = useRouter()
    const [isLoggingOut, setIsLoggingOut] = useState(false)

    const handleLogout = async () => {
        setIsLoggingOut(true)
        try {
            await auth.signOut()
            router.push("/login")
        } catch (error) {
            console.error("Logout error:", error)
        } finally {
            setIsLoggingOut(false)
        }
    }

    const menuItems = [
        { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
        { name: "Products", href: "/admin/products", icon: Package },
    ]

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-black text-white flex flex-col shadow-xl fixed h-full z-20">
                <div className="p-6 border-b border-white/10">
                    <h1 className="text-xl font-bold tracking-tight flex items-center gap-2">
                        <span className="w-8 h-8 bg-primary rounded flex items-center justify-center text-black font-black">A</span>
                        Admin Portal
                    </h1>
                </div>

                <nav className="flex-1 p-4 space-y-2 mt-4">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center justify-between px-4 py-3 rounded-lg transition-all group ${isActive
                                    ? "bg-primary text-black font-bold shadow-lg shadow-primary/20"
                                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <item.icon className={`w-5 h-5 ${isActive ? "text-black" : "text-gray-400 group-hover:text-primary"}`} />
                                    <span>{item.name}</span>
                                </div>
                                {isActive && <ChevronRight className="w-4 h-4" />}
                            </Link>
                        )
                    })}
                </nav>

                <div className="p-4 border-t border-white/10 space-y-2">
                    <button
                        disabled={isLoggingOut}
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-400/10 rounded-lg transition-all disabled:opacity-50"
                    >
                        {isLoggingOut ? <Loader2 className="w-5 h-5 animate-spin" /> : <LogOut className="w-5 h-5" />}
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="ml-64 flex-1 p-8">
                <header className="mb-8 flex justify-between items-center">
                    <div>
                        <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Welcome back, Fatima</h2>
                        <h3 className="text-3xl font-extrabold text-black">
                            {pathname.includes('/products') ? 'Manage Products' : 'Dashboard Overview'}
                        </h3>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold border border-primary/30">
                            FA
                        </div>
                    </div>
                </header>

                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {children}
                </div>
            </main>
        </div>
    )
}
