import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(1, "Please add your name.").max(80),
  phone: z
    .string()
    .trim()
    .min(7, "Please add a phone number we can reach.")
    .max(20)
    .regex(/^[+0-9 ()-]+$/, "Use digits, spaces and + only."),
  message: z.string().trim().min(5, "Please write a short message.").max(1500),
  bag: z.string().trim().max(120).optional().default(""),
  // spam checks
  company: z.string().max(0).optional().default(""), // honeypot: must stay empty
  startedAt: z.number().int().positive(),
});

export type ContactInput = z.input<typeof contactSchema>;
