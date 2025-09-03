'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CreditCard, LayoutDashboard, Settings } from 'lucide-react';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';

const menuItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, tourId: 'sidebar-dashboard' },
  { href: '/dashboard/billing', label: 'Billing', icon: CreditCard, tourId: 'sidebar-billing' },
  { href: '/dashboard/settings', label: 'Settings', icon: Settings, tourId: 'sidebar-settings' },
];

const GrapeIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
        <path d="M9.1,1.5C8.4,1.6,7.7,2.3,7.6,3c-0.1,0.7,0.5,1.4,1.2,1.5c0.7,0.1,1.4-0.5,1.5-1.2C10.4,2.6,9.8,1.9,9.1,1.5z"/>
        <path d="M15.4,1.7c-0.6-0.3-1.3-0.2-1.8,0.3c-0.5,0.5-0.6,1.2-0.3,1.8c0.3,0.6,1,0.8,1.8,0.3c0.6-0.3,1-1,0.8-1.8C15.8,2.1,15.6,1.8,15.4,1.7z"/>
        <path d="M12.9,6.7c-0.6-0.5-1.5-0.6-2.2-0.1c-0.7,0.5-0.9,1.4-0.4,2.1c0.5,0.7,1.4,0.9,2.1,0.4C13,8.6,13.5,7.3,12.9,6.7z"/>
        <path d="M7.4,6.6C6.8,6.8,6.2,7.4,6,8.1C5.8,8.8,6,9.5,6.6,10c0.6,0.5,1.4,0.3,1.9-0.2c0.5-0.5,0.7-1.3,0.4-1.9C8.7,7,8,6.5,7.4,6.6z"/>
        <path d="M18.4,6.6c-0.6-0.2-1.3,0-1.7,0.5c-0.4,0.5-0.5,1.2-0.2,1.7c0.3,0.6,1,0.8,1.7,0.5c0.6-0.3,1-1,0.8-1.7C18.9,7.1,18.7,6.8,18.4,6.6z"/>
        <path d="M15.5,11.2c-0.7-0.3-1.4,0-1.9,0.5c-0.5,0.5-0.6,1.2-0.3,1.9c0.3,0.7,1,0.9,1.9,0.5c0.7-0.3,1.1-1,0.9-1.9C16,11.6,15.8,11.3,15.5,11.2z"/>
        <path d="M10.1,11.2c-0.7,0.1-1.4,0.7-1.5,1.5c-0.1,0.7,0.4,1.4,1.1,1.5c0.7,0.1,1.4-0.4,1.5-1.1c0.1-0.7-0.4-1.4-1.1-1.5C10.1,11.6,10.1,11.2,10.1,11.2z"/>
        <path d="M19.7,11.5c-0.6-0.5-1.5-0.6-2.2-0.1c-0.7,0.5-0.9,1.3-0.5,2.1c0.5,0.7,1.3,0.9,2.1,0.5c0.7-0.5,0.9-1.3,0.5-2.1C19.7,11.8,19.7,11.5,19.7,11.5z"/>
        <path d="M5.1,11.3c-0.7-0.3-1.4,0-1.9,0.5C2.7,12.3,2.6,13,2.9,13.7c0.3,0.7,1,0.9,1.9,0.5c0.7-0.3,1.1-1,0.9-1.9C5.5,11.7,5.3,11.4,5.1,11.3z"/>
        <path d="M12.9,16c-0.7-0.3-1.4,0-1.9,0.5c-0.5,0.5-0.6,1.2-0.3,1.9c0.3,0.7,1,0.9,1.9,0.5c0.7-0.3,1.1-1,0.9-1.9C13.5,16.4,13.2,16.1,12.9,16z"/>
        <path d="M7.6,16c-0.7,0.1-1.4,0.7-1.5,1.5c-0.1,0.7,0.4,1.4,1.1,1.5c0.7,0.1,1.4-0.4,1.5-1.1c0.1-0.7-0.4-1.4-1.1-1.5C7.6,16.4,7.6,16,7.6,16z"/>
        <path d="M17.9,16c-0.7,0.1-1.4,0.7-1.5,1.5c-0.1,0.7,0.4,1.4,1.1,1.5c0.7,0.1,1.4-0.4,1.5-1.1c0.1-0.7-0.4-1.4-1.1-1.5C17.9,16.4,17.9,16,17.9,16z"/>
        <path d="M15.4,20.5c-0.5,0.5-0.6,1.2-0.3,1.8c0.3,0.6,1,0.8,1.8,0.3c0.6-0.3,1-1,0.8-1.8c-0.1-0.4-0.4-0.8-0.8-1C16.5,20,15.9,20,15.4,20.5z"/>
        <path d="M10.3,20.5c-0.5-0.5-1.3-0.5-1.8-0.2c-0.6,0.3-1,1-0.8,1.8c0.2,0.6,0.8,1,1.5,0.8c0.5-0.2,1-0.6,1.1-1.2C10.5,21.1,10.5,20.5,10.3,20.5z"/>
    </svg>
)

export default function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon" variant="sidebar" className="border-r">
      <SidebarHeader className="p-4">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 font-semibold text-primary"
        >
          <GrapeIcon className="h-6 w-6" />
          <span className="font-headline text-lg group-data-[collapsible=icon]:hidden">
            Kernal Vine
          </span>
        </Link>
      </SidebarHeader>
      <SidebarContent className="flex-1 p-2">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href} data-tour-id={item.tourId}>
              <SidebarMenuButton
                asChild
                isActive={pathname.startsWith(item.href)}
                tooltip={{ children: item.label, side: 'right', align: 'center' }}
              >
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
