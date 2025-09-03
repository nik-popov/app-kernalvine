import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import VmList from '@/components/dashboard/vm-list';
import StatCard from '@/components/dashboard/stat-card';
import { Cpu, DollarSign, HardDrive, Server } from 'lucide-react';
import CreateVmDialog from '@/components/dashboard/create-vm-dialog';
import OnboardingTour from '@/components/dashboard/onboarding-tour';

export default function Dashboard() {
  return (
    <>
      <OnboardingTour />
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-headline text-3xl font-bold tracking-tight">
              Dashboard
            </h1>
            <p className="text-muted-foreground">
              Welcome back! Here's an overview of your virtual machines.
            </p>
          </div>
          <div className="hidden md:block" data-tour-id="create-vm">
            <CreateVmDialog />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4" data-tour-id="stats-overview">
          <StatCard
            title="Active VMs"
            value="2"
            icon={Server}
            description="out of 4 total"
          />
          <StatCard
            title="Total vCPUs"
            value="6"
            icon={Cpu}
            description="currently in use"
          />
          <StatCard
            title="Storage Used"
            value="140 GB"
            icon={HardDrive}
            description="of 500 GB"
          />
          <StatCard
            title="Month-to-Date"
            value="$42.50"
            icon={DollarSign}
            description="estimated cost"
          />
        </div>

        <Card data-tour-id="vm-list">
          <CardHeader>
            <CardTitle>My Virtual Machines</CardTitle>
            <CardDescription>
              Manage your instances, check their status, and perform actions.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <VmList />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
