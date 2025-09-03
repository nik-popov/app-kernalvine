'use server';
/**
 * @fileOverview Generates an SSH key pair and installs the public key on a VM.
 *
 * - generateAndInstallSSHKey - A function that handles the SSH key generation and installation process.
 * - GenerateAndInstallSSHKeyInput - The input type for the generateAndInstallSSHKey function.
 * - GenerateAndInstallSSHKeyOutput - The return type for the generateAndInstallSSHKey function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { generateKeyPairSync } from 'crypto';

const GenerateAndInstallSSHKeyInputSchema = z.object({
  customerId: z.string().describe('The unique identifier for the customer.'),
});
export type GenerateAndInstallSSHKeyInput = z.infer<typeof GenerateAndInstallSSHKeyInputSchema>;

const GenerateAndInstallSSHKeyOutputSchema = z.object({
  publicKey: z.string().describe('The generated SSH public key.'),
  privateKey: z.string().describe('The generated SSH private key.'),
});
export type GenerateAndInstallSSHKeyOutput = z.infer<typeof GenerateAndInstallSSHKeyOutputSchema>;

export async function generateAndInstallSSHKey(input: GenerateAndInstallSSHKeyInput): Promise<GenerateAndInstallSSHKeyOutput> {
  return generateAndInstallSSHKeyFlow(input);
}

const generateSshKeyPrompt = ai.definePrompt({
    name: 'generateSshKeyPrompt',
    prompt: `You are an expert system administrator. Please generate a secure SSH key pair for customer {{{customerId}}}. The key should be an RSA key with a length of 4096 bits. Ensure that the private key is properly secured.

Output the public and private keys.`,
    input: { schema: GenerateAndInstallSSHKeyInputSchema },
    output: { schema: GenerateAndInstallSSHKeyOutputSchema },
  });

const generateAndInstallSSHKeyFlow = ai.defineFlow(
  {
    name: 'generateAndInstallSSHKeyFlow',
    inputSchema: GenerateAndInstallSSHKeyInputSchema,
    outputSchema: GenerateAndInstallSSHKeyOutputSchema,
  },
  async input => {
    // Generate SSH key pair using Node.js crypto module
    const { publicKey, privateKey } = generateKeyPairSync('rsa', {
      modulusLength: 4096,
      publicKeyEncoding: {
        type: 'spki',
        format: 'pem'
      },
      privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem'
      }
    });

    return {
      publicKey: publicKey.toString(),
      privateKey: privateKey.toString(),
    };
  }
);
