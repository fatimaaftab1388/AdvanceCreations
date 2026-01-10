import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, ChevronRight, Building, HelpCircle, FileText, Phone } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      {/* Main Container */}
      <main className="flex-1 bg-gray-50">

        {/* --- User's Custom Hero Banner (Seamless) --- */}
        <section className="relative w-full bg-black">
          <div className="max-w-7xl mx-auto px-0 pb-2">
            <div className="relative w-full overflow-hidden group animate-in fade-in duration-500">
              <Image
                src="/home_banner.png"
                alt="Advance Creations Banner"
                width={1920}
                height={600}
                className="w-full h-auto bg-transparent shadow-sm"
                quality={100}
                priority
              />

              {/* Overlay with Buttons (Positioned at bottom, below all text) */}
              <div className="absolute inset-0 flex flex-col justify-end items-start px-6 md:px-20 pb-8 md:pb-24 bg-gradient-to-t from-black/80 via-transparent to-transparent">
                <div className="flex flex-col sm:flex-row justify-start gap-4 md:gap-6 animate-in slide-in-from-bottom duration-1000 delay-500">
                  <Link
                    href="/products"
                    className="bg-primary text-black px-6 md:px-8 py-2 md:py-2.5 rounded-full font-black uppercase text-[10px] md:text-xs tracking-widest hover:bg-white transition-all shadow-[0_10px_30px_rgba(197,160,89,0.4)] active:scale-95 hidden md:flex items-center justify-center gap-2 sm:ml-32 lg:ml-40.5"
                  >
                    View Our Products <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  </Link>
                  {/* <Link
                    href="/assessment"
                    className="border-2 border-primary text-primary px-8 md:px-12 py-3 md:py-4 rounded-full font-black uppercase text-xs md:text-sm tracking-widest hover:bg-primary hover:text-black transition-all active:scale-95 bg-black/60 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
                  >
                    Sell Your Equipment
                  </Link> */}
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="space-y-8">

            {/* Product Categories Layout */}
            <section>
              <div className="border-b-2 border-primary pb-2 mb-6">
                <h2 className="text-xl font-bold text-gray-800">Product Categories</h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
                {[
                  { name: "MRI", image: "/products/mri.png" },
                  { name: "CT", image: "/products/ct.png" },
                  { name: "Ultrasound", image: "/products/ultrasound.png" },
                  { name: "Endoscope", image: "/products/endoscope.png" },
                  { name: "X-Ray", image: "/products/xray.png" },
                  { name: "Dental", image: "/products/dental.png" },
                  { name: "Ophthalmic", image: "/products/ophthalmic.png" },
                  { name: "Others", image: "/products/others.png" },
                ].map((cat, i) => (
                  <Link key={i} href="/products" className="group bg-white rounded-xl shadow-sm border border-gray-100 hover:border-primary hover:shadow-lg transition-all overflow-hidden flex flex-col">
                    <div className="aspect-square relative flex items-center justify-center bg-gray-50 group-hover:bg-primary/5 transition-colors">
                      {cat.image ? (
                        <Image
                          src={cat.image}
                          alt={cat.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="flex flex-col items-center gap-2">
                          <span className="text-4xl">📦</span>
                          <span className="text-[10px] text-gray-400 uppercase tracking-widest">Image Coming Soon</span>
                        </div>
                      )}
                    </div>
                    <div className="p-4 text-center bg-white border-t border-gray-50">
                      <span className="text-sm font-bold text-gray-700 group-hover:text-primary transition-colors">{cat.name}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
