"use client"

import { useState, useEffect } from "react"
import {
    ShoppingCart,
    Search,
    Filter,
    MoreVertical,
    Calendar,
    User,
    Package,
    CheckCircle2,
    Clock,
    Truck,
    Loader2
} from "lucide-react"
import { db } from "@/lib/firebase"
import { collection, getDocs, query, orderBy } from "firebase/firestore"

export default function AdminOrders() {
    const [orders, setOrders] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState("")

    useEffect(() => {
        async function fetchOrders() {
            try {
                const ordersColl = collection(db, "orders")
                const q = query(ordersColl, orderBy("date", "desc"))
                const snapshot = await getDocs(q)
                const ordersList = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }))
                setOrders(ordersList)
            } catch (error) {
                console.error("Error fetching orders:", error)
            } finally {
                setLoading(false)
            }
        }
        fetchOrders()
    }, [])

    const filteredOrders = orders.filter(order =>
        order.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customerEmail?.toLowerCase().includes(searchTerm.toLowerCase())
    )

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
                <Loader2 className="w-10 h-10 animate-spin text-primary" />
                <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Fetching Live Orders...</p>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {/* Filters & Search */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by Order ID, Customer Name or Email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary text-sm font-medium transition-all"
                    />
                </div>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-5 py-3 bg-gray-50 text-gray-500 rounded-2xl text-xs font-bold hover:bg-black hover:text-white transition-all uppercase tracking-widest">
                        <Filter className="w-4 h-4" />
                        Filter
                    </button>
                    <button className="flex items-center gap-2 px-5 py-3 bg-gray-50 text-gray-500 rounded-2xl text-xs font-bold hover:bg-black hover:text-white transition-all uppercase tracking-widest">
                        <Calendar className="w-4 h-4" />
                        History
                    </button>
                </div>
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-100 text-gray-400 font-black uppercase text-[10px] tracking-[0.15em]">
                                <th className="px-8 py-5">Order ID</th>
                                <th className="px-8 py-5">Customer Details</th>
                                <th className="px-8 py-5">Product Info</th>
                                <th className="px-8 py-5">Status</th>
                                <th className="px-8 py-5 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filteredOrders.length > 0 ? (
                                filteredOrders.map((order) => (
                                    <tr key={order.id} className="group hover:bg-gray-50/50 transition-colors">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2.5 bg-gray-100 rounded-xl group-hover:bg-primary/20 transition-colors">
                                                    <ShoppingCart className="w-4 h-4 text-gray-400 group-hover:text-black" />
                                                </div>
                                                <div>
                                                    <div className="font-black text-black text-sm">#{order.id.toString().slice(-6).toUpperCase()}</div>
                                                    <div className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">{order.date || 'Received'}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-2">
                                                <User className="w-3.5 h-3.5 text-primary" />
                                                <div>
                                                    <div className="text-sm font-bold text-gray-900 leading-none">{order.customerName || 'Anonymous'}</div>
                                                    <div className="text-[10px] text-gray-400 font-medium lowercase mt-1">{order.customerEmail || order.email || 'no-email@provided'}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-sm text-gray-600">
                                            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-tight">
                                                <Package className="w-3.5 h-3.5 text-gray-400" />
                                                {order.productName || 'General Inquiry'}
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className={`text-[10px] font-black uppercase px-3 py-1.5 rounded-lg flex items-center gap-2 w-fit border ${order.status === 'Completed' ? 'bg-green-50 text-green-700 border-green-100' :
                                                order.status === 'Shipped' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                                                    order.status === 'Pending' ? 'bg-yellow-50 text-yellow-700 border-yellow-100' :
                                                        'bg-red-50 text-red-700 border-red-100'
                                                }`}>
                                                {order.status === 'Completed' && <CheckCircle2 className="w-3 h-3" />}
                                                {order.status === 'Shipped' && <Truck className="w-3 h-3" />}
                                                {order.status === 'Pending' && <Clock className="w-3 h-3" />}
                                                {order.status || 'Received'}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex justify-end">
                                                <button className="p-2.5 text-gray-400 hover:text-black hover:bg-gray-100 rounded-xl transition-all shadow-sm">
                                                    <MoreVertical className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="px-8 py-20 text-center">
                                        <div className="flex flex-col items-center gap-4 opacity-20">
                                            <ShoppingCart className="w-16 h-16" />
                                            <div className="space-y-1">
                                                <p className="text-xl font-black uppercase tracking-tighter">No Orders Displayed</p>
                                                <p className="text-sm font-bold uppercase text-gray-400 tracking-[0.2em]">Records appear here when users inquire.</p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Footer Info */}
            <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-gray-400 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm italic">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                Live synchronization with Firebase Firestore active.
            </div>
        </div>
    )
}
