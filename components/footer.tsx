import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin, Send } from "lucide-react"
import { FooterContactForm } from "./footer-contact-form"

export function Footer() {
  return (
    <footer className="bg-black text-white border-t border-primary/20">
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Column 1: Company Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              {/* <div className="relative w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center p-1.5 border border-primary/20 group overflow-hidden">
                <Image
                  src="/logo_v3.png"
                  alt="Advance Creations Logo"
                  width={48}
                  height={48}
                  className="object-contain mix-blend-screen group-hover:scale-110 transition-transform duration-500"
                />
              </div> */}
              <h3 className="text-xl font-black text-white leading-none tracking-tight uppercase">
                Advance <span className="text-primary">Creations</span>
              </h3>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
              Supporting Healthcare Providers with Reliable & Cost-Effective Medical Equipment Worldwide.
            </p>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/share/14WVDFprtxZ/?mibextid=wwXIfr" className="w-10 h-10 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-black hover:border-primary transition-all duration-300">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/advance_creations_pvt_ltd?igsh=ZWI4dXo1ZXlwYmR4&utm_source=qr" className="w-10 h-10 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-black hover:border-primary transition-all duration-300">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/in/advance-creations-54b5b53a5?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" className="w-10 h-10 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-black hover:border-primary transition-all duration-300">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-8 relative inline-block">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-primary"></span>
            </h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link href="/" className="hover:text-primary transition-colors flex items-center gap-2 group">Home</Link></li>
              <li><Link href="/products" className="hover:text-primary transition-colors flex items-center gap-2 group">Products</Link></li>
              <li><Link href="/about" className="hover:text-primary transition-colors flex items-center gap-2 group">About Us</Link></li>

            </ul>
          </div>

          {/* Column 3: Products */}
          <div>
            <h4 className="text-white font-bold mb-8 relative inline-block">
              Our Products
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-primary"></span>
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-x-8 gap-y-4 text-sm text-gray-400">
              <li><Link href="/products?category=MRI" className="hover:text-primary transition-colors whitespace-nowrap">MRI System</Link></li>
              <li><Link href="/products?category=CT" className="hover:text-primary transition-colors whitespace-nowrap">CT Scanner</Link></li>
              <li><Link href="/products?category=Ultrasound" className="hover:text-primary transition-colors whitespace-nowrap">Ultrasound</Link></li>
              <li><Link href="/products?category=X-Ray" className="hover:text-primary transition-colors whitespace-nowrap">X-Ray Machines</Link></li>
              <li><Link href="/products?category=Endoscope" className="hover:text-primary transition-colors whitespace-nowrap">Endoscope</Link></li>
              <li><Link href="/products?category=Dental" className="hover:text-primary transition-colors whitespace-nowrap">Dental</Link></li>
              <li><Link href="/products?category=Ophthalmic" className="hover:text-primary transition-colors whitespace-nowrap">Ophthalmic</Link></li>
              <li><Link href="/products?category=Others" className="hover:text-primary transition-colors whitespace-nowrap">Others</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div className="space-y-6">
            <h4 className="text-white font-bold mb-8 relative inline-block">
              Contact
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-primary"></span>
            </h4>
            <div className="space-y-4">
              <a href="tel:+923378064727" className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-black transition-all">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="text-sm text-gray-400 group-hover:text-white transition-colors">
                  <span className="block font-bold text-white mb-0.5">Phone</span>
                  +92 337 8064 727
                </div>
              </a>
              <a href="mailto:advanceincpvtltd@gmail.com" className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-black transition-all">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="text-sm text-gray-400 group-hover:text-white transition-colors">
                  <span className="block font-bold text-white mb-0.5">Email</span>
                  advanceincpvtltd@gmail.com
                </div>
              </a>
              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-black transition-all">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="text-sm text-gray-400">
                  <span className="block font-bold text-white mb-0.5">Address</span>
                  33,34 Civic Center Block F, Kohistan Enclave, Wah Cantt, Pakistan
                </div>
              </div>
            </div>

            {/* <div className="pt-4">
              <h5 className="text-white font-bold mb-4 text-xs uppercase tracking-widest">Quick Inquiry</h5>
              {/* <FooterContactForm /> */}
            {/* </div> */}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-900 mb-8"></div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>&copy; 2026 Advance Creations. All rights reserved.</p>
          {/* <div className="flex gap-6">
            <Link href="#" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-primary transition-colors">
              Terms of Service
            </Link>
          </div> */}
        </div>
      </div>
    </footer >
  )
}
