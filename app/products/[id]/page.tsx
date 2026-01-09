"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { getProductById, Product } from "@/lib/products.service"
import { Phone, Mail, CheckCircle, Info, ChevronLeft, ImageIcon } from "lucide-react"

export default function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
    const [product, setProduct] = useState<Product | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const [productId, setProductId] = useState<string>("")

    useEffect(() => {
        async function loadParams() {
            const resolvedParams = await params
            setProductId(resolvedParams.id)
        }
        loadParams()
    }, [params])

    useEffect(() => {
        if (!productId) return

        async function fetchProduct() {
            try {
                setLoading(true)
                const data = await getProductById(productId)
                if (data) {
                    // Normalize fields if they come from old Firestore documents
                    const normalized = {
                        ...data,
                        type: data.type || (data as any).category || "Medical Equipment",
                        modelYear: data.modelYear || (data as any).year || "N/A",
                        condition: data.condition || "Contact for details"
                    }
                    setProduct(normalized)
                }
            } catch (err) {
                setError("Failed to load product details.")
                console.error(err)
            } finally {
                setLoading(false)
            }
        }

        fetchProduct()
    }, [productId])

    // Loading State
    if (loading) {
        return (
            <div className="min-h-screen flex flex-col bg-gray-50/50">
                <Header />
                <main className="flex-1 max-w-7xl mx-auto px-4 py-12 flex flex-col items-center justify-center">
                    <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                    <p className="mt-6 text-gray-500 font-black uppercase tracking-widest text-xs">Fetching Specifications...</p>
                </main>
                <Footer />
            </div>
        )
    }

    // Error or Not Found State
    if (!product || error) {
        return (
            <div className="min-h-screen flex flex-col bg-gray-50/50">
                <Header />
                <main className="flex-1 max-w-7xl mx-auto px-4 py-20 text-center">
                    <div className="bg-white p-20 rounded-[40px] shadow-sm border border-gray-100 max-w-2xl mx-auto">
                        <div className="text-6xl mb-6">❌</div>
                        <h1 className="text-3xl font-black text-gray-900 mb-4 uppercase tracking-tight">Product Not Found</h1>
                        <p className="mb-10 text-gray-500 font-medium italic">The equipment you are looking for may have been moved or sold.</p>
                        <Link href="/products" className="bg-black text-white px-10 py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-primary hover:text-black transition-all shadow-xl">
                            Back to Inventory
                        </Link>
                    </div>
                </main>
                <Footer />
            </div>
        )
    }

    return (
        <div className="min-h-screen flex flex-col bg-gray-50/50">
            <Header />

            <main className="flex-1 max-w-7xl mx-auto px-4 py-12 w-full">
                <div className="mb-10">
                    <Link href="/products" className="group text-gray-400 hover:text-black font-black uppercase text-[10px] tracking-widest flex items-center gap-2 transition-all">
                        <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Back to Inventory
                    </Link>
                </div>

                {/* Main Product Section */}
                <div className="bg-white rounded-[40px] shadow-xl overflow-hidden border border-gray-100 mb-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 p-10 lg:p-16">

                        {/* Image Section */}
                        <div className="relative group">
                            <div className="aspect-square bg-gray-50 rounded-[40px] overflow-hidden flex items-center justify-center relative shadow-inner border border-gray-50">
                                {product.image && product.image.startsWith('http') ? (
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        fill
                                        className="object-contain p-8 group-hover:scale-110 transition-transform duration-1000"
                                    />
                                ) : (
                                    <div className="flex flex-col items-center gap-4 text-gray-300">
                                        <ImageIcon className="w-20 h-20" />
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">Product Rendering N/A</span>
                                    </div>
                                )}

                                {product.soldOut && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/5 backdrop-blur-[2px]">
                                        <div className="bg-red-600 text-white text-4xl font-black px-12 py-4 rounded-full shadow-2xl transform -rotate-12 border-4 border-white">
                                            SOLD OUT
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Badges */}
                            <div className="absolute top-6 left-6 flex flex-col gap-2">
                                <span className="bg-black text-primary px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                                    {product.type}
                                </span>
                                {product.badge && (
                                    <span className={`bg-white shadow-md border px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest ${product.badgeColor || 'text-red-600'}`}>
                                        {product.badge}
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Info Section */}
                        <div className="flex flex-col">
                            <div className="mb-8">
                                <h1 className="text-4xl lg:text-5xl font-black text-gray-900 leading-[1.1] mb-6 uppercase tracking-tight">
                                    {product.name}
                                </h1>
                                <div className="h-1.5 w-24 bg-primary rounded-full mb-8"></div>

                                <p className="text-gray-500 text-lg leading-relaxed font-medium italic">
                                    {product.description || "No detailed description available for this unit."}
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-8 mb-10">
                                <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100">
                                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Manufacturer</p>
                                    <p className="text-lg font-black text-gray-900">{product.manufacturer}</p>
                                </div>
                                <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100">
                                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Model Number</p>
                                    <p className="text-lg font-black text-gray-900">{product.model}</p>
                                </div>
                                <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100">
                                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Model Year</p>
                                    <p className="text-lg font-black text-gray-900">{product.modelYear}</p>
                                </div>
                                <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100">
                                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Condition</p>
                                    <p className="text-lg font-black text-gray-900 text-primary">{product.condition}</p>
                                </div>
                            </div>

                            <div className="mt-auto space-y-4">
                                {product.soldOut ? (
                                    <div className="w-full bg-gray-100 text-gray-400 px-8 py-6 rounded-[32px] font-black text-center uppercase tracking-widest border-2 border-dashed border-gray-200">
                                        Unit No Longer Available
                                    </div>
                                ) : (
                                    <Link
                                        href="/inquiry"
                                        className="block w-full text-center bg-black hover:bg-primary text-white hover:text-black px-8 py-6 rounded-[32px] font-black text-xl uppercase tracking-tighter transition-all shadow-2xl hover:shadow-primary/20 active:scale-[0.98]"
                                    >
                                        Inquire About Price
                                    </Link>
                                )}
                                <div className="flex items-center justify-center gap-6 pt-4">
                                    <a href="tel:+923378064727" className="flex items-center gap-2 text-gray-400 hover:text-black font-bold text-xs transition-colors">
                                        <Phone className="w-4 h-4 text-primary" />
                                        Call Support
                                    </a>
                                    <span className="text-gray-200">|</span>
                                    <a href="mailto:advanceincpvtltd@gmail.com" className="flex items-center gap-2 text-gray-400 hover:text-black font-bold text-xs transition-colors">
                                        <Mail className="w-4 h-4 text-primary" />
                                        Email Sales
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </main>

            <Footer />
        </div>
    )
}
