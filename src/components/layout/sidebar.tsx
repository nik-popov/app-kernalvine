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
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M22 5V2l-5.5 5.5" />
      <path d="M2 22v-3" />
      <path d="M2 19a4 4 0 0 0 4 4" />
      <path d="M13.73 22a4 4 0 0 0 3.46-6.02" />
      <path d="M17.19 15.98a4 4 0 0 0-5.78-2.43" />
      <path d="M11.41 13.55a4 4 0 0 0-5.8 2.45" />
      <path d="M5.61 16a4 4 0 0 0 3.48 6" />
      <path d="M9.09 22a4 4 0 0 0 3.47-6.01" />
      <path d="M12.56 15.99a4 4 0 0 0-5.78-2.44" />
      <path d="M12.56 15.99a4 4 0 0 0 5.78 2.44" />
      <path d="M11.41 13.55a4 4 0 0 0 5.8-2.45" />
      <path d="M17.21 11.1a4 4 0 0 0-3.48-6" />
      <path d="M13.73 5.1a4 4 0 0 0-3.46 6.02" />
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
