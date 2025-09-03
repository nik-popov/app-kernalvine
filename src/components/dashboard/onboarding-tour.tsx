'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Bot, Cpu, HardDrive, PlusCircle, Server, Settings } from 'lucide-react';

const TOUR_STEPS = [
  {
    icon: <Bot className="h-10 w-10 text-primary" />,
    title: 'Welcome to KVM Cloud!',
    description: "Let's take a quick tour to see how you can manage your virtual machines.",
  },
  {
    icon: <PlusCircle className="h-10 w-10 text-primary" />,
    title: 'Create a Virtual Machine',
    description:
      'Click the "Create VM" button to launch a new instance. You can configure its resources and even let our AI generate a secure SSH key for you.',
  },
  {
    icon: <Cpu className="h-10 w-10 text-primary" />,
    title: 'Dashboard Overview',
    description:
      'The cards at the top provide a real-time overview of your active VMs, total resource usage, and estimated monthly costs.',
  },
  {
    icon: <Server className="h-10 w-10 text-primary" />,
    title: 'Manage Your VMs',
    description:
      'Your virtual machines are listed here. You can easily start, stop, restart, or delete them using the actions menu for each instance.',
  },
  {
    icon: <Settings className="h-10 w-10 text-primary" />,
    title: 'Manage Your Settings',
    description:
      'Head over to the Settings page to manage your profile and add or remove SSH keys for your VMs.',
  },
];

const ONBOARDING_STORAGE_KEY = 'kvm-cloud-onboarding-complete';

export default function OnboardingTour() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    try {
      const onboardingComplete = localStorage.getItem(ONBOARDING_STORAGE_KEY);
      if (!onboardingComplete) {
        setIsOpen(true);
      }
    } catch (error) {
      // localStorage is not available
      console.error("Could not access localStorage. Onboarding tour won't be shown.");
    }
  }, []);

  const handleNext = () => {
    if (currentStep < TOUR_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleFinish();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinish = () => {
    try {
      localStorage.setItem(ONBOARDING_STORAGE_KEY, 'true');
    } catch (error) {
        // silently fail
    }
    setIsOpen(false);
  };

  const step = TOUR_STEPS[currentStep];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md" onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
            <div className="flex items-center justify-center pb-4">{step.icon}</div>
          <DialogTitle className="text-center text-2xl font-headline">{step.title}</DialogTitle>
          <DialogDescription className="text-center text-base pt-2">
            {step.description}
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center justify-center gap-2 pt-4">
            {TOUR_STEPS.map((_, index) => (
                <button
                    key={index}
                    onClick={() => setCurrentStep(index)}
                    className={`h-2 w-2 rounded-full transition-colors ${index === currentStep ? 'bg-primary' : 'bg-muted hover:bg-muted-foreground/50'}`}
                    aria-label={`Go to step ${index + 1}`}
                />
            ))}
        </div>

        <DialogFooter className="pt-4 sm:justify-between">
          {currentStep > 0 ? (
            <Button variant="outline" onClick={handlePrev}>
              Previous
            </Button>
          ) : <div />}
          {currentStep < TOUR_STEPS.length - 1 ? (
            <Button onClick={handleNext}>Next</Button>
          ) : (
            <Button onClick={handleFinish}>Finish Tour</Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
