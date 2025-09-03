import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const invoices = [
  {
    id: 'INV001',
    date: 'June 23, 2024',
    amount: '$25.00',
    status: 'Paid',
  },
  {
    id: 'INV002',
    date: 'May 23, 2024',
    amount: '$30.00',
    status: 'Paid',
  },
  {
    id: 'INV003',
    date: 'April 23, 2024',
    amount: '$20.00',
    status: 'Paid',
  },
];

export default function BillingPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-headline text-3xl font-bold tracking-tight">
          Billing
        </h1>
        <p className="text-muted-foreground">
          Manage your subscription and view your payment history.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Payment History</CardTitle>
              <CardDescription>
                A record of your recent payments.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-medium">{invoice.id}</TableCell>
                      <TableCell>{invoice.date}</TableCell>
                      <TableCell>{invoice.status}</TableCell>
                      <TableCell className="text-right">
                        {invoice.amount}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Current Plan</CardTitle>
              <CardDescription>Pay-as-you-go</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-4xl font-bold">$0.04/hour</p>
                <p className="text-xs text-muted-foreground">
                  Billed monthly based on usage.
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant="outline">
                Change Plan
              </Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 38 24"
                  className="h-8 w-12"
                  aria-label="Visa"
                >
                  <path
                    d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"
                    fill="#3F51B5"
                  />
                  <path
                    d="M35.1 24H2.9c-.5 0-1-.2-1.2-.6l14.3-15.3c.3-.3.7-.3 1 0l14.3 15.3c.3.4.2.9-.2 1.2-.2.1-.3.1-.5.1z"
                    fill="#3F51B5"
                    opacity=".7"
                  />
                  <path
                    d="M26.4 8.2c-.3-.3-.8-.3-1.1 0L19 14.5l-2.4-4.8c-.2-.4-.6-.6-1-.6s-.8.2-1 .6L10.7 17H7.3c-.4 0-.8.3-.8.8s.3.8.8.8h4.2c.4 0 .8-.3.9-.7l2.2-4.5 2.5 5c.2.4.6.6 1 .6s.8-.2 1-.6l6.4-6.8c.3-.3.3-.8 0-1.1z"
                    fill="#FFF"
                  />
                </svg>
                <div>
                  <p className="font-semibold">Visa ending in 1234</p>
                  <p className="text-sm text-muted-foreground">
                    Expires 12/2026
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Manage Payment
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
