"use client";

import "../globals.css"
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

// export const metadata = {
//   title: "DataFlow",
//   description: 'DataFlow',
// }

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <SidebarProvider>
        <AppSidebar/>
        {children}
      </SidebarProvider>
    </div>
  );
}
