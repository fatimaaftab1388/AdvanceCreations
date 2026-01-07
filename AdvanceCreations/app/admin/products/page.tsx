"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
    Plus,
    Pencil,
    Trash2,
    Search,
    AlertCircle,
    ExternalLink
} from "lucide-react"
import { getAllProducts, deleteProduct, Product } from "@/lib/products.service"
import Image from "next/image"

export default function AdminProducts() {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState("")

    useEffect(() => {
        fetchProducts()
    }, [])

    async function fetchProducts() {
        try {
            setLoading(true)
            const data = await getAllProducts()
            setProducts(data)
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (id: string) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                await deleteProduct(id)
                setProducts(products.filter(p => p.id !== id))
                alert("Product deleted successfully!")
            } catch (error) {
                alert("Error deleting product")
            }
        }
    }

    const filteredProducts = products.filter(p =>
        p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.manufacturer?.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="space-y-6">
            {/* Header Actions */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-primary text-sm"
                    />
                </div>
                <Link
                    href="/admin/products/add"
                    className="flex items-center justify-center gap-2 bg-black text-white px-6 py-2.5 rounded-xl font-bold hover:bg-primary hover:text-black transition-all shadow-lg active:scale-95"
                >
                    <Plus className="w-4 h-4" />
                    Add New Product
                </Link>
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {loading ? (
                    <div className="p-12 text-center text-gray-500 flex flex-col items-center gap-4">
                        <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                        Loading products...
                    </div>
                ) : filteredProducts.length === 0 ? (
                    <div className="p-12 text-center text-gray-500">
                        <AlertCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                        <p className="text-lg font-bold">No products found</p>
                        <p className="text-sm">Try adjusting your search or add a new product.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 font-bold uppercase text-[10px] tracking-widest">
                                    <th className="px-6 py-4">Product Info</th>
                                    <th className="px-6 py-4 font-bold">Manufacturer</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {filteredProducts.map((product) => (
                                    <tr key={product.id} className="group hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-lg bg-gray-50 overflow-hidden flex items-center justify-center text-[10px] font-bold text-gray-400 border border-gray-100 shrink-0 relative">
                                                    {product.image && product.image.startsWith('http') ? (
                                                        <Image src={product.image} alt={product.name} fill className="object-cover" />
                                                    ) : (
                                                        <div className={`w-full h-full ${product.image || 'bg-gray-200'} flex items-center justify-center`}>
                                                            IMG
                                                        </div>
                                                    )}
                                                </div>
                                                <div>
                                                    <div className="font-bold text-gray-900 group-hover:text-primary transition-colors">{product.name}</div>
                                                    <div className="text-xs text-gray-400 uppercase tracking-tighter">{product.category} • {product.model}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm font-medium text-gray-600">{product.manufacturer}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`text-[10px] font-black px-2 py-1 rounded-md uppercase ${product.soldOut ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
                                                }`}>
                                                {product.soldOut ? "Sold Out" : "Active"}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link
                                                    href={`/products/${product.id}`}
                                                    target="_blank"
                                                    className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-all"
                                                    title="View on site"
                                                >
                                                    <ExternalLink className="w-4 h-4" />
                                                </Link>
                                                <Link
                                                    href={`/admin/products/edit/${product.id}`}
                                                    className="p-2 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-all"
                                                    title="Edit"
                                                >
                                                    <Pencil className="w-4 h-4" />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(product.id)}
                                                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                                    title="Delete"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    )
}
