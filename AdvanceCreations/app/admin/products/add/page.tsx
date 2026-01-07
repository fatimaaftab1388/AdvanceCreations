"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Save, X, ImageIcon } from "lucide-react"
import { addProduct } from "@/lib/products.service"

export default function AddProduct() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        type: "",
        manufacturer: "",
        model: "",
        modelYear: "",
        condition: "",
        imageURL: "",
        description: "",
        soldOut: false
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        try {
            await addProduct(formData)
            alert("Product added successfully!")
            router.push("/admin/products")
        } catch (error) {
            alert("Error adding product")
        } finally {
            setLoading(false)
        }
    }

    const categories = [
        "MRI", "CT", "X-Ray", "Ultrasound", "Endoscopy",
        "Ophthalmology", "Obstetrics", "Physical Therapy Equipment", "Inspection Equipment"
    ]

    return (
        <div className="max-w-4xl mx-auto pb-12">
            <div className="flex justify-between items-center mb-8">
                <Link href="/admin/products" className="flex items-center gap-2 text-gray-500 hover:text-black transition-colors">
                    <ArrowLeft className="w-4 h-4" />
                    Back to list
                </Link>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-[40px] shadow-lg border border-gray-100 overflow-hidden">
                <div className="p-10 border-b border-gray-100 bg-gray-50/50">
                    <h2 className="text-3xl font-black text-black uppercase tracking-tight">Add New Product</h2>
                    <p className="text-gray-500 font-medium mt-1">Fill in the details to list a new medical device.</p>
                </div>

                <div className="p-10 space-y-10">
                    {/* General Info Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Product Name</label>
                            <input
                                required
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="e.g., Ultrasound Scanner"
                                className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary transition-all text-sm font-bold"
                            />
                        </div>
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Product Type / Category</label>
                            <select
                                required
                                value={formData.type}
                                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary transition-all text-sm font-bold appearance-none"
                            >
                                <option value="">Select Type</option>
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="space-y-3 lg:col-span-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Manufacturer</label>
                            <input
                                required
                                type="text"
                                value={formData.manufacturer}
                                onChange={(e) => setFormData({ ...formData, manufacturer: e.target.value })}
                                placeholder="e.g., Hitachi, Ltd."
                                className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary transition-all text-sm font-bold"
                            />
                        </div>
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Model #</label>
                            <input
                                required
                                type="text"
                                value={formData.model}
                                onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                                placeholder="e.g., HF-220"
                                className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary transition-all text-sm font-bold"
                            />
                        </div>
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Model Year</label>
                            <input
                                required
                                type="text"
                                value={formData.modelYear}
                                onChange={(e) => setFormData({ ...formData, modelYear: e.target.value })}
                                placeholder="2023"
                                className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary transition-all text-sm font-bold"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Condition</label>
                            <input
                                required
                                type="text"
                                value={formData.condition}
                                onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                                placeholder="e.g., Excellent, Used (Refurbished)"
                                className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary transition-all text-sm font-bold"
                            />
                        </div>
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Image URL</label>
                            <div className="relative">
                                <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    required
                                    type="text"
                                    value={formData.imageURL}
                                    onChange={(e) => setFormData({ ...formData, imageURL: e.target.value })}
                                    placeholder="Paste image link here..."
                                    className="w-full pl-12 pr-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary transition-all text-sm font-bold"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Description</label>
                        <textarea
                            rows={4}
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder="Provide a detailed description of the product..."
                            className="w-full px-5 py-4 bg-gray-50 border-none rounded-3xl focus:ring-2 focus:ring-primary transition-all text-sm font-bold resize-none"
                        ></textarea>
                    </div>

                    <div className="flex items-center gap-4 bg-gray-50 p-6 rounded-3xl border border-gray-100">
                        <input
                            type="checkbox"
                            id="soldOut"
                            checked={formData.soldOut}
                            onChange={(e) => setFormData({ ...formData, soldOut: e.target.checked })}
                            className="w-6 h-6 accent-primary rounded-lg border-gray-300"
                        />
                        <label htmlFor="soldOut" className="text-sm font-black text-gray-700 cursor-pointer uppercase tracking-tight">Mark as Sold Out</label>
                    </div>
                </div>

                <div className="p-10 bg-gray-50/50 border-t border-gray-100 flex items-center justify-end gap-6">
                    <Link
                        href="/admin/products"
                        className="text-sm font-black text-gray-500 hover:text-black transition-colors uppercase tracking-widest"
                    >
                        Cancel
                    </Link>
                    <button
                        disabled={loading}
                        type="submit"
                        className="flex items-center gap-3 bg-black text-white px-10 py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-primary hover:text-black transition-all shadow-xl active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
                    >
                        <Save className="w-4 h-4" />
                        {loading ? 'Saving...' : 'Add Product'}
                    </button>
                </div>
            </form>
        </div>
    )
}
