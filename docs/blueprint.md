# **App Name**: KVM Cloud Rentals

## Core Features:

- VM Creation: Create an Ubuntu VM using KVM with specified resources and SSH key, automated via libvirt.
- VM Management: Allow users to start, stop, and view the status of their VMs through a web dashboard.
- User Authentication: Secure the dashboard with user authentication to prevent unauthorized access to VM controls.
- Usage Tracking: Track VM runtime to calculate billing amounts.
- Stripe Integration: Integrate with Stripe to handle metered billing based on VM usage.
- SSH Key Management: Generate an SSH key and install that key into the relevant VM, if no key is provided. A tool decides on when a key needs to be generated.
- Dashboard UI: Present a user-friendly web interface to manage VMs, view status, and handle billing information.

## Style Guidelines:

- Primary color: Deep indigo (#4B0082) to evoke a sense of trust and authority.
- Background color: Light grey (#F0F0F0) for a clean, professional look.
- Accent color: Electric purple (#BF00FF) for interactive elements and highlights.
- Headline font: 'Space Grotesk' sans-serif, for a techy feel. Body font: 'Inter' sans-serif.
- Use clean, modern icons to represent VM status, actions, and billing information.
- Use a grid-based layout to organize information clearly and efficiently.
- Use subtle transitions and animations to provide feedback and enhance the user experience.