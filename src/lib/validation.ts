import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().trim().min(2, 'Please enter your name.').max(120),
  email: z
    .string()
    .trim()
    .min(1, 'Please enter your email address.')
    .email('Please enter a valid email address.'),
  organisation: z.string().trim().max(160).optional().or(z.literal('')),
  interest: z.string().optional().or(z.literal('')),
  message: z
    .string()
    .trim()
    .min(20, 'Please give us at least a sentence or two (20 characters).')
    .max(4000, 'Please keep your message under 4,000 characters.'),
  /** Honeypot — must stay empty. Visually hidden, never shown to a human. */
  website: z.string().max(0).optional().or(z.literal('')),
});

export type ContactValues = z.infer<typeof contactSchema>;
