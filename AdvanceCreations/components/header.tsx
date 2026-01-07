import Link from "next/link"
import Image from "next/image"
import { SearchBar } from "./search-bar"
import { Phone, Users, LogIn, Facebook, Instagram, Youtube, Mail, ChevronDown } from "lucide-react"

export function Header() {
  return (
    <>
      <header className="bg-black text-white border-b border-gray-900 sticky top-0 z-[60] shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">

            {/* Left: Logo & Brand */}
            <Link href="/" className="flex items-center gap-3 group shrink-0">
              <div className="relative w-14 h-14 md:w-16 md:h-16">
                <Image
                  src="/logo_v3.png"
                  alt="Advance Creations Logo"
                  fill
                  className="object-contain mix-blend-screen"
                  priority
                />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg md:text-xl font-black text-white leading-none tracking-tight uppercase">
                  Advance <span className="text-primary">Creations</span>
                </h1>
                <p className="text-[10px] text-gray-500 font-bold tracking-widest uppercase"></p>
              </div>
            </Link>

            {/* Center: Merged Navigation (Restored Two-Level Design) */}
            <nav className="flex flex-wrap items-center justify-center gap-x-6 md:gap-x-8 lg:gap-x-12 gap-y-4">
              {[
                { name: "Home", href: "/" },
                // { name: "Assessment", href: "/assessment" },
                {
                  name: "Products",
                  href: "/products",
                  dropdown: [
                    { name: "All Products", href: "/products" },
                    { name: "MRI", href: "/products?category=MRI" },
                    { name: "CT", href: "/products?category=CT" },
                    { name: "X-Ray", href: "/products?category=X-Ray" },
                    { name: "Ultrasound", href: "/products?category=Ultrasound" },
                    { name: "Endoscope", href: "/products?category=Endoscope" },
                    { name: "Dental", href: "/products?category=Dental" },
                    { name: "Ophthalmic", href: "/products?category=Ophthalmic" },
                    { name: "Others", href: "/products?category=Others" },
                  ]
                },
                { name: "About Us", href: "/about" },
                { name: "Contact Us", href: "/inquiry" },
              ].map((item, index) => (
                <div key={index} className="group relative">
                  <Link
                    href={item.href}
                    className="group flex flex-col items-center justify-center transition-all px-2"
                  >
                    <span className="text-xs md:text-sm font-black text-white group-hover:text-primary transition-colors uppercase leading-none flex items-center gap-1">
                      {item.name}
                      {item.dropdown && <ChevronDown className="w-3 h-3" />}
                    </span>
                    <div className="h-0.5 w-0 group-hover:w-full bg-primary transition-all duration-300 mt-1"></div>
                  </Link>

                  {/* Dropdown Menu */}
                  {item.dropdown && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                      <div className="bg-black border border-gray-800 rounded-xl shadow-2xl overflow-hidden min-w-[200px] py-2">
                        {item.dropdown.map((subItem, subIndex) => (
                          <Link
                            key={subIndex}
                            href={subItem.href}
                            className="block px-6 py-3 text-xs font-bold text-gray-400 hover:text-primary hover:bg-gray-900 transition-colors uppercase tracking-widest"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Right: Utility Links (Log in, Membership, Socials) */}
            <div className="flex items-center gap-4 text-gray-400 font-medium text-xs md:text-sm shrink-0">
              <Link href="/login" className="flex items-center gap-1 hover:text-primary transition-colors">
                <LogIn className="w-4 h-4" />
                <span className="hidden sm:inline">Log in</span>
              </Link>
              <Link href="/membership" className="flex items-center gap-1 hover:text-primary transition-colors">
                <Users className="w-4 h-4" />
                <span className="hidden sm:inline">Membership</span>
              </Link>
              <div className="h-4 w-px bg-gray-800 mx-1"></div>
              <div className="flex gap-2">
                <Link href="#" className="hover:text-primary transition-colors"><Instagram className="w-4 h-4 md:w-5 md:h-5" /></Link>
                <Link href="#" className="hover:text-primary transition-colors"><Facebook className="w-4 h-4 md:w-5 md:h-5" /></Link>
                <Link href="#" className="hover:text-primary transition-colors"><Youtube className="w-4 h-4 md:w-5 md:h-5" /></Link>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
