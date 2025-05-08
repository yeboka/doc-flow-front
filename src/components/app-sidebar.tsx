"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { File, Inbox, LayoutDashboard, SquareUser } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import * as React from "react";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { fetchUserProfile } from "@/lib/slices/profileSlice";


const navItems = [
  {name: "Dashboard", icon: <LayoutDashboard width={24} height={24}/>, path: "/dashboard"},
  {name: "Документы", icon: <File width={24} height={24}/>, path: "/docs"},
  {name: "Запросы", icon: <Inbox width={24} height={24}/>, path: "/requests"},
  {name: "Сотрудники", icon: <SquareUser width={24} height={24}/>, path: "/employees"},
];

export function AppSidebar() {
  const pathname = usePathname()
  const { data: userProfile, loading, error } = useAppSelector((state) => state.profile);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch])

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Sidebar>
      <SidebarHeader/>
      <SidebarContent>
        {userProfile?.company && <SidebarMenu className={"p-3"}>
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
