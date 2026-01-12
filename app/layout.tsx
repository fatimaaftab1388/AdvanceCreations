import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Advance Creations - Premium Medical Equipments at Affordable Prices",
  description:
    "Advance Creations: Professional medical equipment supplier offering high-quality medical equipments.",
  icons: {
    icon: '/favicon.ico',

  }

}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
