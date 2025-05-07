import "./globals.css"
import { Toaster } from "sonner";

export const metadata = {
  title: 'DataFlow',
  description: 'Помощник в управлении документами',
}

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
    <body>
    {children}
    <Toaster richColors  />
    </body>
    </html>
  )
}
