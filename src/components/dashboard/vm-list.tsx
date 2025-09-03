'use client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import {
  MoreHorizontal,
  PlayCircle,
  Power,
  RefreshCw,
  Trash2,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const vms = [
  {
    id: 'customer1-vm',
    name: 'prod-web-server',
    status: 'Running',
    ip: '192.168.1.101',
    cpu: 2,
    ram: 4,
    disk: 40,
  },
  {
    id: 'customer2-vm',
    name: 'staging-db',
    status: 'Running',
    ip: '192.168.1.102',
    cpu: 4,
    ram: 8,
    disk: 80,
  },
  {
    id: 'customer3-vm',
    name: 'dev-environment',
    status: 'Stopped',
    ip: 'N/A',
    cpu: 1,
    ram: 2,
    disk: 20,
  },
  {
    id: 'customer4-vm',
    name: 'analytics-worker',
    status: 'Error',
    ip: '192.168.1.104',
    cpu: 2,
    ram: 4,
    disk: 40,
  },
];

export default function VmList() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Running':
        return (
          <Badge className="border-transparent bg-emerald-600 text-primary-foreground hover:bg-emerald-600/80">
            Running
          </Badge>
        );
      case 'Stopped':
        return <Badge variant="secondary">Stopped</Badge>;
      case 'Error':
        return <Badge variant="destructive">Error</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>IP Address</TableHead>
          <TableHead>CPU</TableHead>
          <TableHead>RAM</TableHead>
          <TableHead>Disk</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {vms.map((vm) => (
          <TableRow key={vm.id}>
            <TableCell className="font-medium">{vm.name}</TableCell>
            <TableCell>{getStatusBadge(vm.status)}</TableCell>
            <TableCell>{vm.ip}</TableCell>
            <TableCell>{vm.cpu} cores</TableCell>
            <TableCell>{vm.ram} GB</TableCell>
            <TableCell>{vm.disk} GB</TableCell>
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">VM Actions</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <PlayCircle className="mr-2 h-4 w-4" /> Start
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Power className="mr-2 h-4 w-4" /> Stop
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <RefreshCw className="mr-2 h-4 w-4" /> Restart
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive focus:text-destructive-foreground focus:bg-destructive">
                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
