"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Mail, Phone, Briefcase } from "lucide-react"

export default function InquiryPage() {

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />

            <main className="flex-1 py-8 px-4 md:py-12">
                <div className="max-w-4xl mx-auto">
                    {/* Header Section */}
                    <div className="text-center mb-10">
                        <h1 className="text-2xl md:text-4xl font-black text-black uppercase tracking-tighter italic">
                            Contact <span className="text-primary italic">Us</span>
                        </h1>
                        <div className="h-1.5 w-16 bg-primary mx-auto mt-3 rounded-full"></div>
                    </div>

                    {/* Contact Options Table */}
                    <div className="bg-white rounded-[24px] md:rounded-[32px] shadow-xl border border-gray-100 overflow-hidden mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-black text-white">
                                        <th className="px-6 py-4 text-[9px] font-black uppercase tracking-[0.2em] italic border-r border-white/10">Channel</th>
                                        <th className="px-6 py-4 text-[9px] font-black uppercase tracking-[0.2em] italic border-r border-white/10">Details</th>
                                        <th className="px-6 py-4 text-[9px] font-black uppercase tracking-[0.2em] italic">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    <tr className="group hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-5 border-r border-gray-50">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                                                    <Phone className="w-4 h-4 text-primary" />
                                                </div>
                                                <span className="text-xs font-black text-black uppercase tracking-widest">By Phone</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 text-xs font-bold text-gray-600 border-r border-gray-50 italic">
                                            Direct line for sales & technical support
                                        </td>
                                        <td className="px-6 py-5">
                                            <a href="tel:+923378064727" className="inline-flex items-center gap-2 text-black font-black uppercase text-[9px] tracking-widest hover:text-primary transition-colors group/link">
                                                +92 337 8064727
                                                <div className="w-4 h-[2px] bg-primary group-hover:w-8 transition-all duration-300"></div>
                                            </a>
                                        </td>
                                    </tr>
                                    <tr className="group hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-5 border-r border-gray-50">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                                                    <Mail className="w-4 h-4 text-primary" />
                                                </div>
                                                <span className="text-xs font-black text-black uppercase tracking-widest">By Email</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 text-xs font-bold text-gray-600 border-r border-gray-50 italic">
                                            Send your formal inquiries and documents
                                        </td>
                                        <td className="px-6 py-5">
                                            <a href="mailto:advanceincpvtltd@gmail.com" className="inline-flex items-center gap-2 text-black font-black uppercase text-[9px] tracking-widest hover:text-primary transition-colors group/link">
                                                advanceincpvtltd@gmail.com
                                                <div className="w-4 h-[2px] bg-primary group-hover:w-8 transition-all duration-300"></div>
                                            </a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Careers Section */}
                    <div className="bg-white rounded-[24px] md:rounded-[32px] shadow-sm border border-gray-100 overflow-hidden scroll-mt-24">
                        <div className="bg-black text-white px-6 py-4 flex items-center gap-3">
                            <div className="p-1.5 bg-primary/20 rounded-lg">
                                <Briefcase className="w-4 h-4 text-primary" />
                            </div>
                            <h2 className="font-black uppercase tracking-widest text-xs italic">Work With Us</h2>
                        </div>

                        <div className="p-8 md:p-12 text-center space-y-6">
                            <div className="space-y-3">
                                <h2 className="text-2xl md:text-3xl font-black text-black uppercase tracking-tight">Join Our <span className="text-primary italic">Expert Team</span></h2>
                                <p className="text-gray-500 font-medium max-w-2xl mx-auto text-sm md:text-base">
                                    Are you a Biomedical Engineer, Computer Scientist, or a technical professional in the medical equipment field? We are always looking for talented individuals to join Advance Creations.
                                </p>
                            </div>

                            <div className="bg-gray-50 rounded-[32px] p-8 border border-gray-100">
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] mb-4">Submission Process</p>
                                <p className="text-sm font-bold text-gray-700 mb-6 italic">
                                    "Please send your updated CV and portfolio directly to our recruitment team."
                                </p>

                                <a
                                    href="mailto:advanceincpvtltd@gmail.com?subject=Job Application - [Your Name]"
                                    className="inline-flex items-center justify-center gap-3 bg-black text-white px-8 py-4 rounded-full font-black uppercase tracking-[0.15em] text-xs hover:bg-primary hover:text-black transition-all shadow-lg active:scale-95"
                                >
                                    <Mail className="w-4 h-4" />
                                    Send Your CV Now
                                </a>
                            </div>

                            <div className="flex items-center justify-center gap-6 pt-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>
                                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Global Opportunities</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>
                                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Technical Roles</span>
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
