import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  company: z.string().trim().max(200).optional().default(""),
  employees: z.string().trim().max(20),
  message: z.string().trim().min(1).max(2000),
});

export const submitContactForm = createServerFn({ method: "POST" })
  .inputValidator((input: z.infer<typeof contactSchema>) => contactSchema.parse(input))
  .handler(async ({ data }) => {
    const webhookUrl = process.env.N8N_WEBHOOK_URL;

    if (!webhookUrl) {
      console.error("N8N_WEBHOOK_URL is not configured");
      return { success: false, error: "Server configuration error. Please try again later." };
    }

    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          company: data.company,
          employees: data.employees,
          message: data.message,
          source: "flologixautomations.com",
          submittedAt: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        console.error(`Webhook failed [${response.status}]: ${await response.text()}`);
        return { success: false, error: "Failed to submit. Please try again." };
      }

      return { success: true, error: null };
    } catch (err) {
      console.error("Webhook request failed:", err);
      return { success: false, error: "Failed to submit. Please try again." };
    }
  });
