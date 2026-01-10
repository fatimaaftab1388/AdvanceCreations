"use client"

import { useState } from "react"
import { submitInquiry } from "@/app/actions/inquiry"
import { Loader2, Send } from "lucide-react"

export function FooterContactForm() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [message, setMessage] = useState<string | null>(null)

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setIsSubmitting(true)
        setMessage(null)

        const formData = new FormData(event.currentTarget)

        // Add default values for required fields in the action
        formData.append("equipmentName", "Footer Quick Inquiry")
        formData.append("brand", "General")
        formData.append("condition", "N/A")
        formData.append("preferredContact", "phone")

        const result = await submitInquiry(formData)

        if (result.success) {
            setMessage("Inquiry sent! We'll contact you soon.")
            event.currentTarget.reset()
        } else {
            setMessage(result.error || "Something went wrong.")
        }

        setIsSubmitting(false)
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-3 mt-4">
            <div className="space-y-3">
                <input
                    type="text"
                    name="fullName"
                    placeholder="Your Name"
                    required
                    className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-primary/50 transition-colors"
                />
                <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    required
                    className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-primary/50 transition-colors"
                />
                <textarea
                    name="description"
                    placeholder="Message / Requirement"
                    rows={2}
                    className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-primary/50 transition-colors resize-none"
                ></textarea>
            </div>

            {message && (
                <p className={`text-xs ${message.includes("sent") ? "text-green-500" : "text-red-500"}`}>
                    {message}
                </p>
            )}

            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary text-black font-bold text-sm py-3 rounded-lg hover:bg-white transition-all active:scale-95 flex items-center justify-center gap-2"
            >
                {isSubmitting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                    <>
                        <Send className="w-4 h-4" />
                        Send Message
                    </>
                )}
            </button>
        </form>
    )
}
