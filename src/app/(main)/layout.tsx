"use client";

import "../globals.css"
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Provider } from 'react-redux';
import { store } from '@/lib/store';

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
      <Provider store={store}>
        <SidebarProvider>
          <AppSidebar/>
          {children}
        </SidebarProvider>
      </Provider>
    </div>
  );
}
