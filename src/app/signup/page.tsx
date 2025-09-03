'use client';
import { AuthForm } from '@/components/auth/auth-form';
import { Bot } from 'lucide-react';
import Link from 'next/link';

export default function SignupPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="mx-auto w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="mb-4 flex justify-center">
            <Bot className="h-12 w-12 text-primary" />
          </div>
          <h1 className="font-headline text-3xl font-bold">Create an Account</h1>
          <p className="text-muted-foreground">
            Get started with your own virtual machines
          </p>
        </div>
        <AuthForm mode="signup" />
        <p className="mt-4 text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link href="/" className="font-semibold text-primary hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
