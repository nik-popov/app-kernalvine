'use client';

import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';

const ONBOARDING_STORAGE_KEY = 'kernal-vine-onboarding-complete';

const driverObj = driver({
  showProgress: true,
  popoverClass: 'driver-popover',
  allowClose: false,
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
      onHighlightStarted: (element) => {
        if (element) {
            (element as HTMLElement).style.pointerEvents = 'none';
        }
      },
      onDeselected: (element) => {
        if (element) {
            (element as HTMLElement).style.pointerEvents = '';
        }
      }
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
  },
});

export function isOnboardingComplete() {
  try {
    return !!localStorage.getItem(ONBOARDING_STORAGE_KEY);
  } catch (error) {
    // If localStorage is not available, assume tour is complete to avoid errors.
    return true;
  }
}

export function driveOnboardingTour() {
  driverObj.drive();
}

// This component is no longer needed, but we keep the file for the functions.
export default function OnboardingTour() {
  return null;
}
