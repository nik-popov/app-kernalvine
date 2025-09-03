'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { generateAndInstallSSHKey } from '@/ai/flows/generate-and-install-ssh-key';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { PlusCircle, Loader2, Wand2, Copy, Download } from 'lucide-react';
import { Input } from '../ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { usePathname } from 'next/navigation';

const formSchema = z.object({
  customerId: z.string().min(3, 'Instance name must be at least 3 characters.'),
  email: z.string().email('Please enter a valid email.'),
  cpu: z.string(),
  ram: z.string(),
  disk: z.string(),
  sshKey: z.string().min(1, 'SSH Public Key is required.'),
});

export default function CreateVmDialog() {
  const [open, setOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedKey, setGeneratedKey] = useState<{
    publicKey: string;
    privateKey: string;
  } | null>(null);
  const { toast } = useToast();
  const pathname = usePathname();
  const isSettingsPage = pathname.includes('settings');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customerId: '',
      email: '',
      cpu: '2',
      ram: '4',
      disk: '40',
      sshKey: '',
    },
  });

  const handleGenerateKey = async () => {
    setIsGenerating(true);
    const customerId = form.getValues('customerId');
    if (!customerId) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Please enter an instance name first.',
      });
      setIsGenerating(false);
      return;
    }
    try {
      const result = await generateAndInstallSSHKey({ customerId });
      form.setValue('sshKey', result.publicKey, { shouldValidate: true });
      setGeneratedKey(result);
      toast({
        title: 'SSH Key Generated',
        description: 'Public key has been added to the form.',
      });
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Generation Failed',
        description: 'Could not generate SSH key.',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: `${type} copied to clipboard.` });
  };

  const downloadPrivateKey = () => {
    if (!generatedKey) return;
    const blob = new Blob([generatedKey.privateKey], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${form.getValues('customerId')}_id_rsa`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (isSettingsPage) {
      console.log('Key added:', values.sshKey); // Mock API call
      toast({
        title: 'SSH Key Added',
        description: 'Your new SSH key has been saved.',
      });
    } else {
      console.log('VM created:', values); // Mock API call
      toast({
        title: 'VM Provisioning Started',
        description: `Instance "${values.customerId}" is being created.`,
      });
    }

    setOpen(false);
    // If a key was generated, we don't need to show it again as it's available for download/copy
    // But for a real app, a modal to confirm download is a good idea.
    if (generatedKey) {
      // Reset generated key state after submission
      setTimeout(() => setGeneratedKey(null), 500);
    }
    form.reset();
  };

  const dialogTitle = isSettingsPage ? 'Add New SSH Key' : 'Create New VM';
  const dialogDescription = isSettingsPage
    ? 'Generate or paste an SSH public key to add to your account.'
    : 'Configure and launch a new Ubuntu virtual machine.';
  const submitButtonText = isSettingsPage ? 'Add Key' : 'Create VM';

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {isSettingsPage ? (
          <Button variant="outline" className="w-full">
            Add New Key
          </Button>
        ) : (
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create VM
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <DialogHeader>
              <DialogTitle className="font-headline">{dialogTitle}</DialogTitle>
              <DialogDescription>{dialogDescription}</DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              {!isSettingsPage && (
                <>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="customerId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Instance Name</FormLabel>
                          <FormControl>
                            <Input placeholder="prod-web-server" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>User Email</FormLabel>
                          <FormControl>
                            <Input placeholder="user@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="cpu"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>vCPUs</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select cores" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="1">1 Core</SelectItem>
                              <SelectItem value="2">2 Cores</SelectItem>
                              <SelectItem value="4">4 Cores</SelectItem>
                              <SelectItem value="8">8 Cores</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="ram"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>RAM</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select memory" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="2">2 GB</SelectItem>
                              <SelectItem value="4">4 GB</SelectItem>
                              <SelectItem value="8">8 GB</SelectItem>
                              <SelectItem value="16">16 GB</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="disk"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Disk</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select storage" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="20">20 GB</SelectItem>
                              <SelectItem value="40">40 GB</SelectItem>
                              <SelectItem value="80">80 GB</SelectItem>
                              <SelectItem value="160">160 GB</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                  </div>
                </>
              )}
              {isSettingsPage && (
                <FormField
                  control={form.control}
                  name="customerId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Key Name</FormLabel>
                      <FormControl>
                        <Input placeholder="My new key" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={form.control}
                name="sshKey"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel>SSH Public Key</FormLabel>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={handleGenerateKey}
                        disabled={isGenerating}
                      >
                        {isGenerating ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          <Wand2 className="mr-2 h-4 w-4" />
                        )}
                        Generate for me
                      </Button>
                    </div>
                    <FormControl>
                      <Textarea
                        placeholder="ssh-rsa AAAAB3NzaC1yc2EAAA..."
                        className="font-code text-xs"
                        rows={5}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {generatedKey && (
                <Card className="mt-4 bg-muted/50">
                  <CardHeader>
                    <CardTitle className="text-base">
                      Your New Private Key
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Save this key securely. You will not be able to see it
                      again.
                    </p>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      readOnly
                      value={generatedKey.privateKey}
                      className="font-code text-xs h-32"
                    />
                    <div className="mt-2 flex gap-2">
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          copyToClipboard(generatedKey.privateKey, 'Private key')
                        }
                      >
                        <Copy className="mr-2 h-4 w-4" />
                        Copy
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={downloadPrivateKey}
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit">{submitButtonText}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
