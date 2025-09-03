'use client';
import { AuthForm } from '@/components/auth/auth-form';
import { Bot } from 'lucide-react';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="mx-auto w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="mb-4 flex justify-center">
            <Bot className="h-12 w-12 text-primary" />
          </div>
          <h1 className="font-headline text-3xl font-bold">
            Welcome to KVM Cloud
          </h1>
          <p className="text-muted-foreground">
            Sign in to access your dashboard
          </p>
        </div>
        <AuthForm />
      </div>
    </div>
  );
}
