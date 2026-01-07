"use client"

import type React from "react"

import { Search } from "lucide-react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { getAllProducts, Product } from "@/lib/products.service"

interface SearchResult {
  id: string
  title: string
  type: string
  description: string
}

export function SearchBar() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [allProducts, setAllProducts] = useState<Product[]>([])
  const router = useRouter()

  // Fetch all products on mount
  useEffect(() => {
    async function fetchProducts() {
      try {
        const products = await getAllProducts()
        setAllProducts(products)
      } catch (error) {
        console.error("Failed to fetch products for search:", error)
      }
    }
    fetchProducts()
  }, [])

  // Filter products based on search query
  useEffect(() => {
    if (query.trim()) {
      const filtered = allProducts
        .filter(
          (product) =>
            (product.name || "").toLowerCase().includes(query.toLowerCase()) ||
            (product.type || "").toLowerCase().includes(query.toLowerCase()) ||
            (product.manufacturer || "").toLowerCase().includes(query.toLowerCase()) ||
            (product.model || "").toLowerCase().includes(query.toLowerCase()) ||
            (product.description || "").toLowerCase().includes(query.toLowerCase())
        )
        .map((product) => ({
          id: product.id,
          title: product.name,
          type: product.type,
          description: product.manufacturer + " - " + product.model
        }))

      setResults(filtered)
      setIsOpen(true)
    } else {
      setResults([])
      setIsOpen(false)
    }
  }, [query, allProducts])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push("/products")
      setIsOpen(false)
    }
  }

  const handleResultClick = (id: string) => {
    router.push(`/products/${id}`)
    setQuery("")
    setIsOpen(false)
  }

  return (
    <form onSubmit={handleSearch} className="relative w-full">
      <div className="relative flex items-center">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.trim() && setIsOpen(true)}
          placeholder="Search by manufacturer, product name, or model number..."
          className="w-full pl-4 pr-10 py-1.5 bg-transparent text-gray-800 text-sm focus:outline-none placeholder:text-gray-400"
        />
        <button
          type="submit"
          className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
        >
          <Search className="w-4 h-4 text-gray-500" />
        </button>
      </div>

      {/* Dropdown Results */}
      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
          {results.map((result) => (
            <button
              key={result.id}
              type="button"
              onClick={() => handleResultClick(result.id)}
              className="w-full text-left px-4 py-2 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors"
            >
              <div className="font-bold text-gray-800 text-xs">{result.title}</div>
              <div className="text-[10px] text-gray-500">{result.type}</div>
              <div className="text-[10px] text-gray-400">{result.description}</div>
            </button>
          ))}
        </div>
      )}

      {/* No Results Message */}
      {isOpen && query.trim() && results.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50 p-4 text-center">
          <p className="text-sm text-gray-500">No products found for "{query}"</p>
        </div>
      )}
    </form>
  )
}
