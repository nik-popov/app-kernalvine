'use client';
import { HelpCircle, Menu, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSidebar } from '@/components/ui/sidebar';
import CreateVmDialog from '../dashboard/create-vm-dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { driveOnboardingTour } from '../dashboard/onboarding-tour';

export default function Header() {
  const { toggleSidebar } = useSidebar();

  const handleRelaunchTour = () => {
    // We need a slight delay for the tour to find elements if the sidebar was just opened.
    setTimeout(() => driveOnboardingTour(), 100);
  };

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <Button
        size="icon"
        variant="outline"
        className="md:hidden"
        onClick={toggleSidebar}
      >
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle Menu</span>
      </Button>
      <div className="relative ml-auto flex-1 md:grow-0">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search VMs..."
          className="w-full rounded-lg bg-muted pl-8 md:w-[200px] lg:w-[320px]"
        />
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" className="h-10 w-10">
            <HelpCircle className="h-5 w-5" />
            <span className="sr-only">Help Menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={handleRelaunchTour}>
            Relaunch Tour
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="ml-2 md:hidden">
        <CreateVmDialog />
      </div>
    </header>
  );
}
