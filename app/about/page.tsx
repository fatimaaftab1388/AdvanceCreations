import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Shield, Award, Activity, Heart, Globe, Users, Tag } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function About() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50/50">
      <Header />

      <main className="flex-1">
        {/* Hero / Header Section + Integrated Introduction */}
        <section className="relative bg-black pt-6 pb-12 md:pt-10 md:pb-20 overflow-hidden border-b border-white/5">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 blur-[150px] rounded-full"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/10 blur-[120px] rounded-full"></div>

          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full mb-6">
                <Shield className="w-3.5 h-3.5 text-primary" />
                <span className="text-[9px] font-black text-primary uppercase tracking-[0.2em]">Trusted Excellence</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter italic mb-3 leading-none">
                About <span className="text-primary italic">Us</span>
              </h1>
              <div className="h-1 w-20 bg-primary mx-auto rounded-full mb-8"></div>
            </div>

            <div className="max-w-3xl mx-auto">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-[32px] p-6 md:p-10 text-center shadow-2xl shadow-primary/5">
                <h2 className="text-lg md:text-2xl font-black text-white leading-tight uppercase tracking-tight mb-4">
                  Specialized Medical Equipment <span className="text-primary italic">Trading Experts</span>
                </h2>
                <p className="text-sm md:text-base text-gray-400 leading-relaxed font-medium italic">
                  "We are a specialized medical equipment trading company dedicated to delivering reliable, high-quality healthcare solutions. Our focus is on providing precise, trusted, and modern medical equipment that meets international healthcare standards. Through dependable products, competitive pricing, and efficient service, we support healthcare providers in delivering better patient care."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Message from CEO Section */}
        <section className="py-12 px-4 bg-white border-b border-gray-100">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-[0.85fr_1.15fr] gap-10 items-center">
              <div className="relative group max-w-[300px] mx-auto md:mx-0">
                <div className="absolute -inset-3 bg-primary/20 rounded-[32px] blur-xl group-hover:bg-primary/30 transition-all duration-700"></div>
                <div className="relative aspect-[4/5] rounded-[24px] overflow-hidden border-2 border-white shadow-xl bg-black">
                  <Image
                    src="/ceo_new.jpg"
                    alt="CEO Abdur Rehman Abbasi"
                    fill
                    className="object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                  />
                  {/* Overlay for aesthetic */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                  <div className="absolute bottom-5 left-5 text-white">
                    <p className="text-[9px] font-black uppercase tracking-[0.3em] text-primary mb-1">Founder & CEO</p>
                    <h3 className="text-base font-black uppercase tracking-tight italic leading-tight">Abdur Rehman <span className="text-primary">Abbasi</span></h3>
                  </div>
                </div>
              </div>

              <div className="space-y-5">
                <div className="inline-flex items-center gap-2 text-primary font-black uppercase text-[9px] tracking-widest">
                  <div className="w-8 h-[1.5px] bg-primary"></div>
                  Message from the CEO
                </div>
                <h3 className="text-2xl font-black text-black uppercase tracking-tight leading-none italic">
                  Committed to <span className="text-primary">Medical Innovation</span>
                </h3>
                <div className="space-y-3.5 text-gray-600 font-medium leading-relaxed italic text-[13px] md:text-sm">
                  <p>
                    "I have over six years of hands-on experience in the medical equipment industry. I grew up and worked in Japan, where I was directly involved in installing, assembling, and maintaining advanced medical machines. This journey taught me the true value of precision, quality, and reliability—standards that are essential in healthcare and that I continue to uphold today."
                  </p>
                  <p>
                    "After returning to Pakistan, I founded this company with a clear purpose: not only to deliver trusted, high-quality medical equipment, but also to make advanced healthcare solutions more accessible. By offering reliable equipment at fair and competitive prices, we aim to support hospitals and clinics without compromising on international quality standards."
                  </p>
                  <p>
                    "I strongly believe that by maintaining ethical practices, global standards, and cost-effective solutions, we can contribute meaningfully to Pakistan’s healthcare system. Our goal is to support local healthcare providers, create sustainable business opportunities, and strengthen the medical sector while adding real value to the country’s economic growth."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values / Why Choose Us */}
        <section className="py-14 bg-black text-white relative">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-10">
              <h3 className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-4">Our Core Philosophy</h3>
              <h4 className="text-2xl font-black uppercase tracking-tight italic">Why Professionals Choose <span className="text-primary italic">Advance Creations</span></h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: Award,
                  title: "Quality Assurance",
                  desc: "We strictly adhere to professional healthcare standards, ensuring every unit is reliable and precise."
                },
                {
                  icon: Activity,
                  title: "Modern Solutions",
                  desc: "Focused on delivering the latest medical technologies to support modern healthcare facilities."
                },
                {
                  icon: Users,
                  title: "Provider Support",
                  desc: "Our mission is to empower healthcare providers with efficient service and dependable equipment."
                },
                {
                  icon: Tag,
                  title: "Competitive Pricing",
                  desc: "Providing the best market rates for premium medical equipment, ensuring maximum value for your investment."
                }
              ].map((item, i) => (
                <div key={i} className="bg-white/5 border border-white/10 p-8 rounded-[32px] hover:bg-white/10 transition-all duration-500 group">
                  <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-500">
                    <item.icon className="w-7 h-7 text-primary group-hover:text-black transition-colors duration-500" />
                  </div>
                  <h5 className="text-lg font-black uppercase tracking-tight mb-2">{item.title}</h5>
                  <p className="text-xs text-gray-400 font-medium leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-12 px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-black text-black uppercase tracking-tighter italic mb-6">
              Ready to upgrade your <span className="text-primary italic">Healthcare Facility?</span>
            </h2>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/products"
                className="bg-black text-white px-7 py-3.5 rounded-2xl font-black uppercase text-[9px] tracking-widest hover:bg-primary hover:text-black transition-all shadow-xl active:scale-95"
              >
                Explore Products
              </Link>
              <Link
                href="/inquiry"
                className="bg-white text-black border-2 border-black px-7 py-3.5 rounded-2xl font-black uppercase text-[9px] tracking-widest hover:bg-black hover:text-white transition-all active:scale-95"
              >
                Contact Sales
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
