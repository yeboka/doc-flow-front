"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { File, Inbox, LayoutDashboard } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import * as React from "react";
import { useEffect, useState } from "react";
import API from "@/lib/axios";


const navItems = [
  {name: "Dashboard", icon: <LayoutDashboard width={24} height={24}/>, path: "/dashboard"},
  {name: "Документы", icon: <File width={24} height={24}/>, path: "/docs"},
  {name: "Запросы", icon: <Inbox width={24} height={24}/>, path: "/requests"},
  // {name: "Сотрудники", icon: <SquareUser width={24} height={24}/>, path: "/employees"},
];

export function AppSidebar() {
  const pathname = usePathname()
  const [userProfile, setUserProfile] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const fetchUserProfile = async () => {
    try {
      const response = await API.get("/profile");
      setUserProfile(response.data);
    } catch (error: any) {
      setError("Failed to load profile");
      console.error("Error fetching user profile", error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchUserProfile();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;


  return (
    <Sidebar>
      <SidebarHeader/>
      <SidebarContent>
        {userProfile.company && <SidebarMenu className={"p-3"}>
          {navItems.map((item) => {
            const isActive = pathname === item.path
            return (
              <Link href={item.path} key={item.path}>
                <SidebarMenuItem className={`${isActive ? "bg-[#E8DEF8] font-semibold" : ""}`}>
                  {item.icon}
                  {item.name}
                </SidebarMenuItem>
              </Link>
            )
          })}
        </SidebarMenu>}
      </SidebarContent>
      <SidebarFooter/>
    </Sidebar>
  )
}
