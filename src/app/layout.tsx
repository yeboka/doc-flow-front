"use client";
import "./globals.css"
import { Toaster } from "sonner";
import { store } from "@/lib/store";
import { Provider } from "react-redux";

// export const metadata = {
//   title: 'DataFlow',
//   description: 'Помощник в управлении документами',
// }

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
    <body>
    <Provider store={store}>
      {children}
    </Provider>
    <Toaster richColors/>
    </body>
    </html>
  )
}
