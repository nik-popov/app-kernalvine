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
    viewBox="0 0 24 24" 
    fill="currentColor"
    stroke="currentColor"
    strokeWidth="1"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}>
        <path d="M22 5V2l-5.5 5.5" />
        <path d="M16.5 3.5c-1.5 0-2.8 1.4-3.5 3.5C12.5 9.5 14 11 14 11s-1.5 2-1.5 3.5c0 2.5 2 4.5 4.5 4.5s4.5-2 4.5-4.5S19 8 19 8s-1.5-4.5-2.5-4.5z" />
        <path d="M14 11a5 5 0 0 0-5-5c-2.8 0-5 2.2-5 5s2.2 5 5 5c.8 0 1.5-.2 2.2-.5" />
        <path d="M6 22a2 2 0 0 1-2-2v-3c0-1.1.9-2 2-2h1" />
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
