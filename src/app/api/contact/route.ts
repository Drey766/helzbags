import { Resend } from "resend";
import { contactSchema } from "@/lib/contactSchema";
import { brand } from "@/config/brand";

// Nothing is stored or logged. Personal data only travels in the email to Zuri Bags.

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const MIN_FILL_MS = 3000;
const hits = new Map<string, number[]>(); // in-memory, per server instance, timestamps only

function rateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

function json(status: number, body: Record<string, unknown>) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
  if (rateLimited(ip)) return json(429, { ok: false, error: "rate_limited" });

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json(400, { ok: false, error: "invalid" });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    const fields = Object.fromEntries(parsed.error.issues.map((i) => [String(i.path[0]), i.message]));
    // A filled honeypot: send nothing, and never report success.
    if (fields.company) return json(400, { ok: false, error: "invalid" });
    return json(422, { ok: false, error: "validation", fields });
  }

  const data = parsed.data;
  if (Date.now() - data.startedAt < MIN_FILL_MS) return json(422, { ok: false, error: "too_fast" });

  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL || `${brand.name} website <onboarding@resend.dev>`;
  if (!key || !to) return json(503, { ok: false, error: "email_unavailable" });

  try {
    const resend = new Resend(key);
    const { error } = await resend.emails.send({
      from,
      to,
      subject: `Website message from ${data.name}${data.bag ? ` about ${data.bag}` : ""}`,
      text: [
        `Name: ${data.name}`,
        `Phone: ${data.phone}`,
        ...(data.bag ? [`Bag: ${data.bag}`] : []),
        "",
        data.message,
        "",
        "Sent from the contact form on the Zuri Bags website. Reply by WhatsApp or phone.",
      ].join("\n"),
    });
    if (error) return json(503, { ok: false, error: "email_failed" });
    return json(200, { ok: true });
  } catch {
    return json(503, { ok: false, error: "email_failed" });
  }
}
