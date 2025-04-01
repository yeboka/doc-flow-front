import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader, SidebarMenu, SidebarMenuItem,
} from "@/components/ui/sidebar"
import { LayoutDashboard, File, Inbox, SquareUser } from "lucide-react";

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarMenu className={"p-3"}>
          <SidebarMenuItem>
            <LayoutDashboard width={24} height={24} />
            Dashboard
          </SidebarMenuItem>
          <SidebarMenuItem>
            <File width={24} height={24}/>
            Документы
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Inbox width={24} height={24}/>
            Запросы
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SquareUser width={24} height={24}/>
            Сотрудники
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}
