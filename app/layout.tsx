import type { Metadata } from "next"
import "./globals.css"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "image generator",
  description: "dl mini",
  generator: "imagegenerator.dev",
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
