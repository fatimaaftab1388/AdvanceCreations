import Link from "next/link"
import Image from "next/image"
import { SearchBar } from "./search-bar"
import { Phone, Users, LogIn, Facebook, Instagram, Youtube, Mail, ChevronDown, Menu, ShieldCheck, Linkedin } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export function Header() {
  return (
    <>
      <header className="bg-black text-white border-b border-gray-900 sticky top-0 z-[60] shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between gap-6 w-full">

            {/* Left: Logo & Brand */}
            <Link href="/" className="flex items-center gap-3 group shrink-0">
              <div className="relative w-10 h-10 md:w-16 md:h-16">
                <Image
                  src="/logo_v3.png"
                  alt="Advance Creations Logo"
                  fill
                  className="object-contain mix-blend-screen"
                  priority
                />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg md:text-xl font-black text-white leading-none tracking-tight uppercase italic">
                  Advance <span className="text-primary">Creations</span>
                </h1>
                <p className="text-[10px] text-gray-500 font-bold tracking-widest uppercase"></p>
              </div>
            </Link>

            {/* Center: Merged Navigation (Desktop) */}
            <nav className="hidden xl:flex flex-wrap items-center justify-center gap-x-6 md:gap-x-8 lg:gap-x-12 gap-y-4">
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

            {/* Right: Utility Links (Desktop) */}
            <div className="hidden xl:flex items-center gap-4 text-gray-400 font-medium text-xs md:text-sm shrink-0">
              <Link href="/login" className="flex items-center gap-1 hover:text-primary transition-colors">
                <ShieldCheck className="w-4 h-4" />
                <span className="hidden sm:inline">Admin</span>
              </Link>
              <div className="h-4 w-px bg-gray-800 mx-1"></div>
              <div className="flex gap-2">
                <Link href="https://www.instagram.com/advance_creations_pvt_ltd?igsh=ZWI4dXo1ZXlwYmR4&utm_source=qr" className="hover:text-primary transition-colors"><Instagram className="w-4 h-4 md:w-5 md:h-5" /></Link>
                <Link href="https://www.facebook.com/share/14WVDFprtxZ/?mibextid=wwXIfr" className="hover:text-primary transition-colors"><Facebook className="w-4 h-4 md:w-5 md:h-5" /></Link>
                <Link href="https://www.linkedin.com/in/advance-creations-54b5b53a5?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" className="hover:text-primary transition-colors"><Linkedin className="w-4 h-4 md:w-5 md:h-5" /></Link>

              </div>
            </div>

            {/* Mobile Menu (Hamburger) */}
            <div className="xl:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <button className="text-white hover:text-primary p-2">
                    <Menu className="w-6 h-6" />
                  </button>
                </SheetTrigger>
                <SheetContent side="right" className="bg-black border-l border-gray-800 text-white w-[300px]">
                  <SheetHeader>
                    <SheetTitle className="text-center text-white italic font-black uppercase text-xl mt-6">
                      Advance <span className="text-primary">Creations</span>
                    </SheetTitle>
                  </SheetHeader>
                  <div className="mt-12 flex flex-col gap-8 px-6">
                    <div className="flex flex-col gap-6 items-center text-center">
                      {[
                        { name: "Home", href: "/" },
                        { name: "Products", href: "/products" },
                        { name: "About Us", href: "/about" },
                        { name: "Contact Us", href: "/inquiry" },
                      ].map((item, index) => (
                        <Link
                          key={index}
                          href={item.href}
                          className="text-base font-bold text-gray-400 hover:text-primary transition-colors uppercase tracking-widest py-1"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>

                    <div className="h-px bg-gray-800 my-2"></div>

                    <div className="flex flex-col gap-5 text-sm text-gray-500 items-center">
                      <Link href="/login" className="flex items-center gap-2 hover:text-primary transition-colors font-medium">
                        <ShieldCheck className="w-4 h-4" /> Admin
                      </Link>
                    </div>

                    <div className="mt-auto flex gap-4 text-gray-400 justify-start pt-8">
                      <Link href="https://www.instagram.com/advance_creations_pvt_ltd?igsh=ZWI4dXo1ZXlwYmR4&utm_source=qr" className="hover:text-primary"><Instagram className="w-5 h-5" /></Link>
                      <Link href="https://www.facebook.com/share/14WVDFprtxZ/?mibextid=wwXIfr" className="hover:text-primary"><Facebook className="w-5 h-5" /></Link>
                      <Link href="https://www.linkedin.com/in/advance-creations-54b5b53a5?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" className="hover:text-primary"><Linkedin className="w-5 h-5" /></Link>
                      <Link href="#" className="hover:text-primary"><Youtube className="w-5 h-5" /></Link>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
