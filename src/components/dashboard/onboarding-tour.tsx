'use client';

import { useEffect } from 'react';
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';

const ONBOARDING_STORAGE_KEY = 'kvm-cloud-onboarding-complete';

export default function OnboardingTour() {
  useEffect(() => {
    try {
      const onboardingComplete = localStorage.getItem(ONBOARDING_STORAGE_KEY);
      if (onboardingComplete) {
        return;
      }
    } catch (error) {
        // Silently fail if local storage isn't available
        return;
    }

    const driverObj = driver({
      showProgress: true,
      popoverClass: 'driver-popover',
      steps: [
        {
          element: '[data-tour-id="create-vm"]',
          popover: {
            title: 'Create a Virtual Machine',
            description:
              'Click here to launch a new instance. You can configure its resources and even let our AI generate a secure SSH key for you.',
            side: 'bottom',
            align: 'start',
          },
        },
        {
          element: '[data-tour-id="stats-overview"]',
          popover: {
            title: 'Dashboard Overview',
            description:
              'These cards provide a real-time overview of your active VMs, total resource usage, and estimated monthly costs.',
            side: 'bottom',
            align: 'start',
          },
        },
        {
          element: '[data-tour-id="vm-list"]',
          popover: {
            title: 'Manage Your VMs',
            description:
              'Your virtual machines are listed here. You can easily start, stop, restart, or delete them using the actions menu for each instance.',
            side: 'top',
            align: 'start',
          },
        },
        {
          element: '[data-tour-id="sidebar-settings"]',
          popover: {
            title: 'Manage Your Settings',
            description:
              'Head over to the Settings page to manage your profile and add or remove SSH keys for your VMs.',
            side: 'right',
            align: 'start',
          },
        },
      ],
      onDestroyed: () => {
         try {
            localStorage.setItem(ONBOARDING_STORAGE_KEY, 'true');
        } catch (error) {
            // silently fail
        }
      }
    });

    // We need a slight delay to ensure the dashboard elements have rendered.
    const timer = setTimeout(() => {
      driverObj.drive();
    }, 500);

    return () => clearTimeout(timer);

  }, []);

  return null; // This component doesn't render anything itself
}
