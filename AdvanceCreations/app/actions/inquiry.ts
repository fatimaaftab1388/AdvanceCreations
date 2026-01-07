"use server"

import { db } from "@/lib/firebase"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"

export async function submitInquiry(formData: FormData) {
  try {
    const data = {
      fullName: formData.get("fullName"),
      company: formData.get("company"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      equipmentName: formData.get("equipmentName"),
      brand: formData.get("brand"),
      modelNumber: formData.get("modelNumber"),
      condition: formData.get("condition"),
      yearOfManufacture: formData.get("yearOfManufacture"),
      description: formData.get("description"),
      preferredContact: formData.get("preferredContact"),
      status: "pending",
      createdAt: serverTimestamp(),
    }

    // 1. Save to Firestore (as a backup/log)
    const docRef = await addDoc(collection(db, "inquiries"), data)

    // 2. Email Logic via Resend API
    // Temporarily hardcoding for debugging since process.env is failing
    const resendApiKey = "re_61JEgs7J_JpGdQqhajMqwB6Mbo8N2XFWE"
    console.log("Resend API Key (Hardcoded) in use")

    if (resendApiKey) {
      try {
        const response = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: 'Advance Creations <onboarding@resend.dev>',
            to: ['advanceincpvtltd@gmail.com'],
            subject: `New Inquiry: ${data.fullName} - ${data.equipmentName}`,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden;">
                <div style="background-color: #000; padding: 24px; text-align: center;">
                  <h1 style="color: #c5a059; margin: 0; font-size: 24px; text-transform: uppercase; letter-spacing: 2px;">Advance Creations</h1>
                  <p style="color: #9ca3af; margin: 4px 0 0 0; font-size: 12px; text-transform: uppercase;">Equipment Inquiry Received</p>
                </div>
                
                <div style="padding: 32px; background-color: #ffffff;">
                  <h2 style="border-bottom: 2px solid #f3f4f6; padding-bottom: 12px; margin-bottom: 24px; font-size: 18px; color: #111;">Contact Details</h2>
                  <p style="margin: 8px 0;"><strong>Full Name:</strong> ${data.fullName}</p>
                  <p style="margin: 8px 0;"><strong>Company/Hospital:</strong> ${data.company || "N/A"}</p>
                  <p style="margin: 8px 0;"><strong>Phone:</strong> ${data.phone}</p>
                  <p style="margin: 8px 0;"><strong>Email:</strong> ${data.email}</p>
                  <p style="margin: 8px 0;"><strong>Preferred Contact:</strong> <span style="text-transform: capitalize;">${data.preferredContact}</span></p>

                  <h2 style="border-bottom: 2px solid #f3f4f6; padding-bottom: 12px; margin-top: 32px; margin-bottom: 24px; font-size: 18px; color: #111;">Equipment Details</h2>
                  <p style="margin: 8px 0;"><strong>Equipment Name:</strong> ${data.equipmentName}</p>
                  <p style="margin: 8px 0;"><strong>Brand:</strong> ${data.brand}</p>
                  <p style="margin: 8px 0;"><strong>Model:</strong> ${data.modelNumber || "N/A"}</p>
                  <p style="margin: 8px 0;"><strong>Condition:</strong> <span style="text-transform: capitalize;">${data.condition}</span></p>
                  <p style="margin: 8px 0;"><strong>Year:</strong> ${data.yearOfManufacture || "N/A"}</p>

                  <h2 style="border-bottom: 2px solid #f3f4f6; padding-bottom: 12px; margin-top: 32px; margin-bottom: 24px; font-size: 18px; color: #111;">Description / Notes</h2>
                  <div style="background-color: #f9fafb; padding: 16px; border-radius: 8px; font-style: italic; color: #4b5563;">
                    ${data.description || "No additional notes provided."}
                  </div>
                </div>

                <div style="background-color: #f3f4f6; padding: 16px; text-align: center; font-size: 11px; color: #9ca3af;">
                  This is an automated notification from Advance Creations Inquiry System.
                </div>
              </div>
            `,
          }),
        })

        const result = await response.json()
        console.log("Resend API Status:", response.status)
        console.log("Resend API Result:", JSON.stringify(result))

        if (!response.ok) {
          console.error("Resend API Error Details:", result)
          return { success: false, error: `Resend Error: ${result.message || response.statusText}` }
        }
      } catch (err: any) {
        console.error("Resend Email Network Error:", err)
        return { success: false, error: `Network/API Error: ${err.message}` }
      }
    } else {
      console.warn("CRITICAL: RESEND_API_KEY is not defined!")
      return { success: false, error: "Email configuration missing." }
    }

    console.log("Inquiry logged to Firestore:", docRef.id)

    return { success: true }
  } catch (error: any) {
    console.error("Error submitting inquiry:", error)
    return { success: false, error: error.message || "Failed to submit inquiry. Please try again." }
  }
}
