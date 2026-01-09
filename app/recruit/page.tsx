import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"

export default function Recruit() {
  const positions = [
    {
      id: 1,
      title: "Medical Equipment Specialist",
      department: "Operations",
      location: "Tokyo",
      type: "Full-time",
    },
    {
      id: 2,
      title: "Sales Representative",
      department: "Sales",
      location: "Osaka",
      type: "Full-time",
    },
    {
      id: 3,
      title: "Technical Support Engineer",
      department: "Support",
      location: "Tokyo",
      type: "Full-time",
    },
    {
      id: 4,
      title: "Logistics Coordinator",
      department: "Supply Chain",
      location: "Yokohama",
      type: "Part-time",
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-foreground mb-4">Recruitment Information</h1>
          <p className="text-foreground/70 mb-12">
            Join our growing team and make a difference in the medical equipment industry.
          </p>

          <section className="bg-white p-8 rounded-lg border border-border mb-8">
            <h2 className="text-2xl font-bold text-primary mb-4">Why Work With Us?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                "Competitive compensation packages",
                "Professional development opportunities",
                "Collaborative team environment",
                "Health and wellness benefits",
                "Career advancement prospects",
                "Flexible working arrangements",
              ].map((benefit, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary rounded-full flex-shrink-0 flex items-center justify-center mt-1">
                    <span className="text-primary-foreground text-sm">✓</span>
                  </div>
                  <p className="text-foreground">{benefit}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">Open Positions</h2>
            <div className="space-y-4">
              {positions.map((position) => (
                <div
                  key={position.id}
                  className="bg-white p-6 rounded-lg border border-border hover:shadow-lg transition-shadow"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-foreground">{position.title}</h3>
                      <p className="text-primary text-sm font-medium">{position.department}</p>
                    </div>
                    <span className="bg-primary/10 text-primary text-xs font-medium px-3 py-1 rounded-full">
                      {position.type}
                    </span>
                  </div>
                  <div className="flex gap-4 text-sm text-foreground/70 mb-4">
                    <span>📍 {position.location}</span>
                  </div>
                  <Link href="/company" className="text-primary font-medium hover:underline">View Details →</Link>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-primary text-primary-foreground p-8 rounded-lg text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Join Our Team?</h2>
            <p className="mb-6">Send us your resume and cover letter</p>
            <Link href="/company" className="inline-block bg-primary-foreground text-primary px-8 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity">
              Apply Now
            </Link>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
