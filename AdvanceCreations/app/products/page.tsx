"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { getAllProducts, Product } from "@/lib/products.service"
import { Search, Filter, ArrowRight, Building, Settings, Calendar, Award, Plus } from "lucide-react"

export default function Products() {
  const searchParams = useSearchParams()
  const initialCategory = searchParams.get("category") || "All"

  const [allProducts, setAllProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState(initialCategory)

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true)
        const data = await getAllProducts()
        setAllProducts(data)
        setFilteredProducts(data)
      } catch (err) {
        setError("Failed to load products. Please try again later.")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  // Filtering Logic
  useEffect(() => {
    let result = allProducts

    // Filter by Category
    if (selectedCategory !== "All") {
      result = result.filter(p => p.type === selectedCategory)
    }

    // Filter by Search Term
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      result = result.filter(p =>
        p.name.toLowerCase().includes(term) ||
        p.manufacturer.toLowerCase().includes(term) ||
        p.model.toLowerCase().includes(term)
      )
    }

    setFilteredProducts(result)
  }, [searchTerm, selectedCategory, allProducts])

  const categories = [
    "All", "MRI", "CT", "X-Ray", "Ultrasound", "Endoscopy",
    "Ophthalmology", "Obstetrics", "Physical Therapy Equipment", "Inspection Equipment"
  ]

  return (
    <div className="min-h-screen flex flex-col bg-gray-50/50">
      <Header />

      <main className="flex-1 px-4 py-12">
        <div className="max-w-7xl mx-auto">

          {/* Header & Search Section */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <h1 className="text-4xl font-black text-black uppercase tracking-tight mb-2">Our Products</h1>
              <p className="text-gray-500 font-medium">Browse our inventory of premium medical equipment.</p>
            </div>

            {/* Premium Search Bar */}
            <div className="relative w-full md:w-96 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-primary transition-colors" />
              <input
                type="text"
                placeholder="Search name, manufacturer or model..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl shadow-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-gray-400 font-medium"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Left sidebar: Filter Menu */}
            <div className="lg:col-span-1 space-y-8">
              <div className="bg-white rounded-[32px] shadow-sm border border-gray-100 overflow-hidden">
                <div className="bg-primary px-6 py-5">
                  <h3 className="text-sm font-black text-black uppercase tracking-widest flex items-center gap-2">
                    <Filter className="w-4 h-4" />
                    Product Categories
                  </h3>
                </div>
                <div className="py-4">
                  {categories.map((cat, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedCategory(cat)}
                      className={`w-full text-left px-6 py-3.5 text-sm font-bold transition-all flex items-center justify-between group ${selectedCategory === cat
                        ? "text-primary bg-black"
                        : "text-gray-600 hover:bg-gray-50 hover:text-black"
                        }`}
                    >
                      <span>{cat}</span>
                      <ArrowRight className={`w-4 h-4 transition-all ${selectedCategory === cat ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2 group-hover:opacity-50 group-hover:translate-x-0"
                        }`} />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Main content: Products Grid */}
            <div className="lg:col-span-3">
              {/* States Handling */}
              {loading ? (
                <div className="flex flex-col items-center justify-center py-20 gap-4">
                  <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                  <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Loading Inventory...</p>
                </div>
              ) : error ? (
                <div className="bg-red-50 p-8 rounded-[40px] text-center border border-red-100">
                  <p className="text-red-600 font-bold mb-4">{error}</p>
                  <button onClick={() => window.location.reload()} className="bg-red-600 text-white px-8 py-3 rounded-full font-bold hover:bg-red-700 transition-all">Retry Link</button>
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="bg-white p-20 rounded-[40px] text-center border border-gray-100 shadow-sm">
                  <div className="text-6xl mb-6">🔍</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">No products found</h3>
                  <p className="text-gray-500">Try adjusting your search or filters.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                  {filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      className="group bg-white rounded-[40px] p-6 shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-gray-100 hover:shadow-2xl hover:border-primary/30 transition-all duration-500 relative flex flex-col"
                    >
                      {/* Sold Out Overlay */}
                      {product.soldOut && (
                        <div className="absolute top-6 right-6 z-20 bg-red-600 text-white font-black text-[10px] uppercase tracking-widest px-4 py-2 rounded-full shadow-lg">
                          Sold Out
                        </div>
                      )}

                      {/* Top: Image Section */}
                      <div className="relative aspect-[4/3] rounded-[32px] overflow-hidden bg-gray-50 border border-gray-100 group-hover:border-primary/20 transition-all p-4 mb-6 shrink-0">
                        {/* Decorative background pattern */}
                        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#C5A059_1px,transparent_1px)] [background-size:20px_20px]"></div>

                        {product.image && product.image.startsWith('http') ? (
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-contain p-6 scale-95 group-hover:scale-105 transition-transform duration-700"
                          />
                        ) : (
                          <div className={`w-full h-full ${product.image || 'bg-gray-200/50'} flex flex-col items-center justify-center text-gray-300 gap-3`}>
                            <Plus className="w-10 h-10 opacity-20" />
                            <span className="text-[9px] font-black uppercase tracking-[0.2em]">Inventory Item</span>
                          </div>
                        )}
                      </div>

                      {/* Middle: Content */}
                      <div className="flex-1 flex flex-col">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-[9px] font-black bg-primary/10 text-primary px-3 py-1 rounded-full uppercase tracking-widest">
                            {product.type}
                          </span>
                          {product.badge && (
                            <span className={`text-[9px] font-black uppercase tracking-widest ${product.badgeColor || 'text-red-600'}`}>
                              {product.badge}
                            </span>
                          )}
                        </div>

                        <h2 className="text-xl font-black text-gray-900 mb-6 group-hover:text-primary transition-colors leading-tight min-h-[3rem] line-clamp-2">
                          {product.name}
                        </h2>

                        {/* Attribute List (Compact) */}
                        <div className="space-y-4 mb-8">
                          {[
                            { icon: Building, label: "Manufacturer", value: product.manufacturer },
                            { icon: Settings, label: "Model / #", value: product.model },
                            { icon: Calendar, label: "Model Year", value: product.modelYear },
                            { icon: Award, label: "Condition", value: product.condition },
                          ].map((item, idx) => (
                            <div key={idx} className="flex items-center gap-4 group/item">
                              <div className="w-10 h-10 rounded-xl bg-primary/5 border border-primary/10 flex items-center justify-center text-primary group-hover/item:bg-primary group-hover/item:text-black transition-all">
                                <item.icon className="w-4 h-4" />
                              </div>
                              <div className="min-w-0">
                                <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-0.5">{item.label}</p>
                                <p className="text-sm font-bold text-gray-800 truncate">{item.value}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Bottom: Single Button */}
                      <Link
                        href={`/products/${product.id}`}
                        className="flex items-center justify-center gap-3 bg-primary text-black w-full py-4 rounded-2xl font-black uppercase text-[11px] tracking-widest hover:bg-black hover:text-white transition-all shadow-lg active:scale-95 mt-auto"
                      >
                        View Details <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
