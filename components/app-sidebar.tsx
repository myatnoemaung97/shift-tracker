"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CalendarDays,
  BriefcaseBusiness,
  LayoutDashboard,
  Settings,
  JapaneseYen
} from "lucide-react";

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarRail,
} from "@/components/ui/sidebar";

const navigation = [
  // {
  //   title: "ホーム",
  //   href: "/",
  //   icon: LayoutDashboard,
  // },
  {
    title: "勤務先",
    href: "/jobs",
    icon: BriefcaseBusiness,
  },
  {
    title: "シフト",
    href: "/shifts",
    icon: CalendarDays,
  },
  {
    title: "収入",
    href: "/earnings",
    icon: JapaneseYen,
  },
  {
    title: "設定",
    href: "/settings",
    icon: Settings,
  },
];

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  return (
    <Sidebar {...props}>
      <SidebarHeader className="border-b py-6 bg-white">
        <div className="flex justify-center">
          <Image
            src="/shifto-logo.png"
            alt="Shifto"
            width={120}
            height={36}
            priority
          />
        </div>
      </SidebarHeader>

      <SidebarContent className="bg-white">
        <SidebarGroup>
          <SidebarGroupLabel>ナビゲーション</SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.map((item) => {
                const Icon = item.icon;

                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === item.href}
                    >
                      <Link href={item.href}>
                        <Icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>{/* User profile / Logout goes here */}</SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
