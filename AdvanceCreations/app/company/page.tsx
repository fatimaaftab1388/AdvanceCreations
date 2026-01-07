import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Image from "next/image"

export default function Company() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1 px-4 py-16">
        <div className="max-w-5xl mx-auto space-y-20">

          {/* --- Message from the President --- */}
          <section className="bg-white p-10 md:p-14 rounded-[40px] shadow-xl border border-gray-100 overflow-hidden relative group">
            <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-[100px] -mr-40 -mt-40 group-hover:bg-primary/10 transition-colors"></div>

            <div className="relative z-10 flex flex-col md:flex-row gap-16 items-center md:items-start">
              {/* CEO Image */}
              <div className="w-full max-w-[320px] md:w-1/3 flex-shrink-0">
                <div className="relative aspect-[4/5] rounded-[40px] overflow-hidden shadow-2xl ring-1 ring-black/5 hover:ring-primary/20 transition-all">
                  <Image
                    src="C:/Users/PMLS/.gemini/antigravity/brain/cd5c1475-2bec-485f-8528-af10cce41410/ceo_abdur_rehman_abbasi_1767024151082.png"
                    alt="Abdur Rehman Abbasi - CEO Advance Creations"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                <div className="mt-8 text-center md:text-left">
                  <h3 className="text-2xl font-black text-black uppercase tracking-tighter leading-none">Abdur Rehman Abbasi</h3>
                  <div className="flex items-center gap-2 mt-2 justify-center md:justify-start">
                    <div className="h-[2px] w-8 bg-primary"></div>
                    <p className="text-primary font-black uppercase text-[10px] tracking-[0.2em]">CEO & President</p>
                  </div>
                </div>
              </div>

              {/* Message Content */}
              <div className="flex-1 space-y-8">
                <div>
                  <h2 className="text-4xl font-black text-black uppercase tracking-tighter italic flex flex-col">
                    <span className="text-primary text-sm not-italic tracking-[0.3em] font-black mb-2">LEADERSHIP</span>
                    Message from the President
                  </h2>
                  <div className="h-1.5 w-24 bg-primary mt-4 rounded-full"></div>
                </div>

                <div className="space-y-6 text-gray-500 leading-relaxed font-medium text-base md:text-lg text-justify">
                  <p>
                    In recent years, many countries around the world have experienced shortages of high-quality medical equipment, affecting the lives of millions.
                  </p>
                  <p>
                    At <span className="text-black font-black">Advance Creations</span>, we aim to be a bridge of health and innovation. Our mission is to contribute to improving medical conditions in developing countries by providing premium-grade medical equipment, carefully sourced from advanced medical facilities.
                  </p>
                  <p>
                    When I first started my journey, I was astonished by the high level of medical technology and service standards in leading nations. At the same time, I was impressed by how abundant those countries were in goods.
                  </p>
                  <p>
                    Witnessing the reality of medical shortages through my family members who work in the medical field, I wondered what I could do. This led to the creation of Advance Creations—a platform dedicated to acquiring world-class medical equipment and ensuring its reliable distribution to markets where it is most needed.
                  </p>
                  <p>
                    Currently, we serve many countries, including my home country of <span className="text-primary font-bold">Pakistan</span>, as well as India, the Middle East, and beyond. We believe that everyone deserves access to quality healthcare.
                  </p>

                  <blockquote className="relative p-8 bg-gray-50 rounded-3xl border-l-[12px] border-primary mt-12 shadow-sm italic">
                    <p className="font-extrabold text-black text-xl leading-snug">
                      "Our goal is not just to sell equipment, but to heal communities by making advanced technology affordable and accessible."
                    </p>
                  </blockquote>
                </div>
              </div>
            </div>
          </section>

          {/* --- Company Information Section (Minimalist Refinement) --- */}
          <section className="space-y-12">
            <div className="text-center md:text-left space-y-2">
              <h2 className="text-3xl font-black text-black uppercase tracking-tighter">Company Information</h2>
              <div className="h-[3px] w-24 bg-primary mx-auto md:mx-0"></div>
            </div>

            <div className="bg-white rounded-[40px] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden border-t-8 border-t-primary">
              <div className="py-2">
                <table className="w-full text-left border-collapse">
                  <tbody>
                    {[
                      { label: "Company Name", value: "Advance Creations" },
                      { label: "Location", value: "Wah Cantt, Punjab, Pakistan" },
                      { label: "Tel", value: "+92-XXX-XXXXXXX / +92-XXX-XXXXXXX" },
                      { label: "Fax", value: "+92-XXX-XXXXXXX" },
                      { label: "Email", value: "info@advanceinc.com" },
                      { label: "Registration", value: "Registered Medical Device Distributor License No. XP-1388, PHC Certified." },
                      { label: "Capital", value: "50,000,000 PKR" },
                    ].map((row, idx) => (
                      <tr key={idx} className="border-b border-gray-50 transition-all hover:bg-gray-50/50">
                        <td className="w-1/3 py-8 px-10 font-black text-gray-400 uppercase text-[10px] tracking-[0.2em] border-r border-gray-50">
                          {row.label}
                        </td>
                        <td className="py-8 px-10 text-black font-extrabold text-sm md:text-base leading-relaxed">
                          {row.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex justify-center pb-8 opacity-20">
              <p className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-400">Advance Creations • Quality Healthcare First</p>
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  )
}
