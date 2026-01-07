"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
    Package,
    Users,
    ArrowUpRight,
    TrendingUp,
    Loader2
} from "lucide-react"
import { db } from "@/lib/firebase"
import { collection, getCountFromServer } from "firebase/firestore"

export default function AdminDashboard() {
    const [counts, setCounts] = useState({
        products: 0,
        users: 0,
        inquiries: 0
    })
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchDashboardData() {
            try {
                const productsColl = collection(db, "products")
                const usersColl = collection(db, "users")

                const [productsSnapshot, usersSnapshot] = await Promise.all([
                    getCountFromServer(productsColl),
                    getCountFromServer(usersColl)
                ]).catch(() => [null, null])

                setCounts({
                    products: productsSnapshot?.data().count || 0,
                    users: usersSnapshot?.data().count || 0,
                    inquiries: 0
                })

            } catch (error) {
                console.error("Error fetching dashboard data:", error)
            } finally {
                setLoading(false)
            }
        }
        fetchDashboardData()
    }, [])

    const stats = [
        { name: "Total Products", value: counts.products, icon: Package, change: "+Live", trend: "up" },
        { name: "Total Users", value: counts.users, icon: Users, change: "+Active", trend: "up" },
        { name: "Support Inquiries", value: counts.inquiries, icon: TrendingUp, change: "Active", trend: "neutral" },
    ]

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center bg-gray-50/50">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-10 h-10 animate-spin text-primary" />
                    <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Loading Admin Data...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {stats.map((stat) => (
                    <div key={stat.name} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 group hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                        <div className="flex justify-between items-start mb-6">
                            <div className="p-4 bg-gray-50 rounded-2xl group-hover:bg-primary/20 transition-colors">
                                <stat.icon className="w-6 h-6 text-gray-400 group-hover:text-black" />
                            </div>
                            <span className={`text-[10px] font-black tracking-widest uppercase px-3 py-1 rounded-full ${stat.trend === 'up' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                                }`}>
                                {stat.change}
                            </span>
                        </div>
                        <p className="text-gray-400 text-[11px] font-black uppercase tracking-widest mb-1">{stat.name}</p>
                        <p className="text-5xl font-black text-black">{stat.value}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Product Shortcut */}
                <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-gray-100 p-10 flex flex-col justify-center items-center text-center space-y-6">
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                        <Package className="w-10 h-10 text-primary" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-black text-black uppercase tracking-tight mb-2">Manage Your Catalog</h3>
                        <p className="text-gray-500 max-w-sm">Easily add, edit or remove products from your website's public listing.</p>
                    </div>
                    <Link href="/admin/products" className="bg-black text-white font-black px-10 py-4 rounded-2xl text-xs hover:bg-primary hover:text-black transition-all uppercase tracking-widest flex items-center gap-2">
                        View Product List <ArrowUpRight className="w-4 h-4" />
                    </Link>
                </div>

                {/* Growth Tip */}
                <div className="bg-black text-white rounded-3xl p-10 flex flex-col justify-between relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 rounded-full blur-[80px] -mr-24 -mt-24 animate-pulse"></div>
                    <div className="relative z-10">
                        <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-black mb-8">
                            <TrendingUp className="w-6 h-6" />
                        </div>
                        <h3 className="text-2xl font-black mb-4 uppercase tracking-tighter italic">Admin Tip</h3>
                        <p className="text-gray-400 text-sm leading-relaxed mb-10 font-medium">
                            Premium products with clear, gold-themed imagery perform 60% better in inquiries. Keep your catalog shining!
                        </p>
                        <Link href="/admin/products/add" className="w-full bg-primary text-black font-black py-4 rounded-2xl text-xs hover:bg-white transition-all active:scale-95 inline-block text-center uppercase tracking-widest shadow-lg shadow-primary/20">
                            Add New Product
                        </Link>
                    </div>
                    <div className="relative z-10 mt-12 pt-8 border-t border-white/10 flex justify-between items-center text-[10px] font-black text-gray-500 uppercase tracking-widest">
                        <span>Management</span>
                        <span className="text-primary italic">Advance Creations</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
