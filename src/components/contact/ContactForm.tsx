"use client";

import { useSearchParams } from "next/navigation";
import { useRef, useState } from "react";
import { Phone } from "lucide-react";
import { brand } from "@/config/brand";
import { getProduct } from "@/lib/products";
import { contactMessage, telUrl } from "@/lib/whatsapp";
import { WhatsAppButton } from "@/components/brand/WhatsAppButton";

type Status = "idle" | "sending" | "sent" | "fallback" | "error";

export function ContactForm() {
  const sp = useSearchParams();
  const bagParam = sp.get("bag") ?? "";
  const bagName = (getProduct(bagParam)?.name ?? bagParam).slice(0, 120);
  const [startedAt] = useState(() => Date.now());
  const [status, setStatus] = useState<Status>("idle");
  const [fields, setFields] = useState<Record<string, string>>({});
  const [values, setValues] = useState({ name: "", phone: "", message: "", bag: bagName });
  const statusRef = useRef<HTMLDivElement>(null);

  const waText = contactMessage({ name: values.name, message: values.message, bag: values.bag });

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setStatus("sending");
    setFields({});
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, company: String(fd.get("company") ?? ""), startedAt }),
      });
      const body = (await res.json().catch(() => ({}))) as { ok?: boolean; fields?: Record<string, string>; error?: string };
      if (res.status === 200 && body.ok) setStatus("sent");
      else if (res.status === 422 && body.fields) {
        setFields(body.fields);
        setStatus("idle");
      } else if (res.status === 422 && body.error === "too_fast") {
        setStatus("error");
      } else setStatus("fallback");
    } catch {
      setStatus("fallback");
    }
    setTimeout(() => statusRef.current?.focus(), 50);
  }

  const err = (k: string) =>
    fields[k] ? (
      <p id={`${k}-error`} className="mt-1 text-sm text-danger">
        {fields[k]}
      </p>
    ) : null;

  if (status === "sent") {
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className="rounded-[24px] bg-surface-alt p-8 outline-none">
        <p className="display text-3xl text-primary">Message sent.</p>
        <p className="mt-2 text-muted">{brand.name} will get back to you by phone or WhatsApp.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="space-y-5">
      <div>
        <label htmlFor="c-name" className="text-sm font-medium text-ink">
          Name
        </label>
        <input
          id="c-name"
          name="name"
          required
          autoComplete="name"
          className="input mt-1"
          value={values.name}
          onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
          aria-invalid={!!fields.name}
          aria-describedby={fields.name ? "name-error" : undefined}
        />
        {err("name")}
      </div>
      <div>
        <label htmlFor="c-phone" className="text-sm font-medium text-ink">
          Phone
        </label>
        <input
          id="c-phone"
          name="phone"
          type="tel"
          inputMode="tel"
          required
          autoComplete="tel"
          className="input mt-1"
          value={values.phone}
          onChange={(e) => setValues((v) => ({ ...v, phone: e.target.value }))}
          aria-invalid={!!fields.phone}
          aria-describedby={fields.phone ? "phone-error" : undefined}
        />
        {err("phone")}
      </div>
      <div>
        <label htmlFor="c-bag" className="text-sm font-medium text-ink">
          Bag <span className="font-normal text-muted">(optional)</span>
        </label>
        <input
          id="c-bag"
          name="bag"
          className="input mt-1"
          value={values.bag}
          onChange={(e) => setValues((v) => ({ ...v, bag: e.target.value }))}
        />
      </div>
      <div>
        <label htmlFor="c-message" className="text-sm font-medium text-ink">
          Message
        </label>
        <textarea
          id="c-message"
          name="message"
          required
          rows={5}
          className="input mt-1 resize-y"
          value={values.message}
          onChange={(e) => setValues((v) => ({ ...v, message: e.target.value }))}
          aria-invalid={!!fields.message}
          aria-describedby={fields.message ? "message-error" : undefined}
        />
        {err("message")}
      </div>
      {/* honeypot: hidden from people, tempting for bots */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="c-company">Company</label>
        <input id="c-company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <p className="text-sm text-muted">
        We use your details only to reply. Nothing is stored on this website. See the{" "}
        <a href="/privacy" className="text-primary underline underline-offset-4">
          privacy notice
        </a>
        .
      </p>

      <button type="submit" className="btn btn-primary w-full sm:w-auto" disabled={status === "sending"}>
        {status === "sending" ? "Sending" : "Send message"}
      </button>

      <div ref={statusRef} tabIndex={-1} aria-live="polite" className="outline-none">
        {status === "fallback" && (
          <div className="rounded-[24px] border border-line bg-white p-6">
            <p className="display text-2xl text-primary">The form could not send right now.</p>
            <p className="mt-2 text-muted">Your message has not been sent. Send it on WhatsApp instead, or call us.</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <WhatsAppButton message={waText} label="Send on WhatsApp" />
              <a href={telUrl()} className="btn btn-outline">
                <Phone aria-hidden="true" className="h-[18px] w-[18px]" strokeWidth={1.5} />
                Call {brand.phoneDisplay}
              </a>
            </div>
          </div>
        )}
        {status === "error" && (
          <p className="text-sm text-danger">That was quick. Please check your message and press Send again.</p>
        )}
      </div>
    </form>
  );
}
