import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Fair Medical - Buying and Selling Used Medical Equipment",
  description:
    "Fair Medical: Professional medical equipment supplier offering used medical equipment, OA equipment, and facilities.",
    generator: 'v0.app'
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
