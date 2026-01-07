import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"

export default function Assessment() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col gap-8">
            {/* Main content */}
            <div className="w-full">
              {/* Purchase appraisal title */}
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">Purchase appraisal</h1>
                <div className="border-b-4 border-primary pb-4"></div>
              </div>

              {/* Step 1 */}
              <div className="mb-12">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-primary text-primary-foreground px-4 py-2 font-bold">STEP 1</div>
                  <h2 className="text-2xl font-bold text-gray-600">Please feel free to contact us</h2>
                </div>

                <p className="text-gray-700 mb-6">
                  If you want to sell any medical equipment, whether used or unused, please contact us.
                  You can reach us by phone, email, or by filling out the form below.
                  Our team will respond to you as soon as possible.
                </p>

                {/* Contact cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {/* Phone */}
                  <div className="border-2 border-gray-300 p-6 rounded text-center">
                    <div className="text-primary font-bold text-sm mb-4">From the phone here</div>
                    <div className="flex flex-col items-center gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">☎</span>
                        <span className="text-xl font-bold text-primary">+92 337 8064 727</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">☎</span>
                        <span className="text-xl font-bold text-primary">+92 325 4889 998</span>
                      </div>
                    </div>
                    <div className="text-primary text-sm mb-6">Telephone hours: Weekdays 9:00-18:00</div>
                    <p className="text-gray-700 text-sm">
                      If you call on a weekend or holiday, we will return your call.
                    </p>
                  </div>

                  {/* Email */}
                  <div className="border-2 border-gray-300 p-6 rounded text-center">
                    <div className="text-primary font-bold text-sm mb-4">From the email here</div>
                    <div className="text-4xl mb-4">✉</div>
                    <a href="mailto:advanceincpvtltd@gmail.com" className="text-sm font-bold text-primary hover:underline block mb-4">
                      advanceincpvtltd@gmail.com
                    </a>
                    <p className="text-gray-700 text-sm">
                      Send us your inquiry via email and we will respond promptly.
                    </p>
                  </div>

                  {/* Internet */}
                  <div className="border-2 border-gray-300 p-6 rounded text-center">
                    <div className="text-primary font-bold text-sm mb-4">From the internet here</div>
                    <div className="text-4xl mb-6">✉</div>
                    <Link href="/inquiry" className="block w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 px-4 rounded text-center">
                      Inquiry/Application Form
                    </Link>
                  </div>
                </div>
              </div>

              {/* Arrow */}
              <div className="text-center mb-12">
                <div className="text-5xl text-primary">⬇</div>
              </div>

              {/* Step 2 */}
              <div className="mb-12">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-primary text-primary-foreground px-4 py-2 font-bold">STEP 2</div>
                  <h2 className="text-2xl font-bold text-gray-600">Start free assessment</h2>
                </div>
                <p className="text-gray-700">We will provide a free appraisal at your convenience.</p>
              </div>

              {/* Arrow */}
              <div className="text-center mb-12">
                <div className="text-5xl text-primary">⬇</div>
              </div>

              {/* Step 3 */}
              <div className="mb-12">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-primary text-primary-foreground px-4 py-2 font-bold">STEP 3</div>
                  <h2 className="text-2xl font-bold text-gray-600">Proposal of purchase price</h2>
                </div>
                <p className="text-gray-700">We will provide you with an estimate of the purchase price.</p>
              </div>

              {/* Arrow */}
              <div className="text-center mb-12">
                <div className="text-5xl text-primary">⬇</div>
              </div>

              {/* Step 4 */}
              <div className="mb-12">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-primary text-primary-foreground px-4 py-2 font-bold">STEP 4</div>
                  <h2 className="text-2xl font-bold text-gray-600">Business deal closed</h2>
                </div>
                <p className="text-gray-700">
                  If you are satisfied with the purchase appraisal price, the deal will be concluded.
                </p>
              </div>

              {/* Arrow */}
              <div className="text-center mb-12">
                <div className="text-5xl text-primary">⬇</div>
              </div>

              {/* Step 5 */}
              <div className="mb-12">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-primary text-primary-foreground px-4 py-2 font-bold">STEP 5</div>
                  <h2 className="text-2xl font-bold text-gray-600">Unloading and payment</h2>
                </div>
                <p className="text-gray-700">
                  We will confirm a date and time that is convenient for you, then we will remove the items and pay you
                  the purchase price.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
