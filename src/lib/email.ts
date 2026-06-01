import { Resend } from "resend";
import { site } from "@/lib/site";

const key = process.env.RESEND_API_KEY;
const resend = key ? new Resend(key) : null;
const FROM = process.env.EMAIL_FROM || "Toluca Lake Chamber <onboarding@resend.dev>";

export const emailEnabled = Boolean(key);

type SendArgs = { to: string; subject: string; html: string; replyTo?: string };

/** Sends via Resend, or logs to the console when no key is configured. */
export async function sendEmail({ to, subject, html, replyTo }: SendArgs): Promise<{ ok: boolean; simulated?: boolean }> {
  if (!resend) {
    console.log(`\n[email:simulated] → ${to}\n  subject: ${subject}\n  (set RESEND_API_KEY to send for real)\n`);
    return { ok: true, simulated: true };
  }
  try {
    await resend.emails.send({ from: FROM, to, subject, html, replyTo });
    return { ok: true };
  } catch (err) {
    console.error("Resend send error:", err);
    return { ok: false };
  }
}

// ---------- Branded layout ----------
function layout(heading: string, body: string) {
  return `<!doctype html><html><body style="margin:0;background:#f7f9f8;font-family:Helvetica,Arial,sans-serif;color:#1a201e">
  <div style="max-width:560px;margin:0 auto;padding:24px">
    <div style="background:#073529;border-radius:16px 16px 0 0;padding:24px 28px">
      <div style="color:#ffffff;font-size:18px;font-weight:700;letter-spacing:.3px">TOLUCA LAKE</div>
      <div style="color:#a6d3c4;font-size:12px">Chamber of Commerce</div>
    </div>
    <div style="background:#ffffff;border:1px solid #e1e6e4;border-top:none;border-radius:0 0 16px 16px;padding:28px">
      <h1 style="margin:0 0 12px;font-size:20px;color:#0f5743">${heading}</h1>
      <div style="font-size:15px;line-height:1.6;color:#3a413f">${body}</div>
    </div>
    <div style="text-align:center;color:#6b7472;font-size:12px;padding:18px 8px">
      ${site.name}<br/>${site.email} · ${site.phone}<br/>${site.address.line1}, ${site.address.city}, ${site.address.state} ${site.address.zip}
    </div>
  </div></body></html>`;
}

const btn = (href: string, label: string) =>
  `<a href="${href}" style="display:inline-block;margin-top:16px;background:#177a5c;color:#fff;text-decoration:none;padding:11px 20px;border-radius:12px;font-weight:600;font-size:14px">${label}</a>`;

// ---------- Templates ----------
export const templates = {
  welcomeSubscriber: () => ({
    subject: "Welcome to the Toluca Lake Chamber",
    html: layout("Welcome to the Village! 🦢", `
      <p>Thanks for subscribing to the Toluca Lake Chamber of Commerce newsletter.</p>
      <p>You'll be the first to hear about community events, member spotlights, and ways to get involved in the Village.</p>`),
  }),

  contactAck: (name?: string) => ({
    subject: "We received your message",
    html: layout(`Thanks${name ? `, ${name}` : ""}!`, `
      <p>We've received your message and a member of our team will be in touch soon.</p>
      <p>In the meantime, feel free to explore our <a href="#" style="color:#177a5c">business directory</a> and upcoming events.</p>`),
  }),

  contactAdmin: (d: { firstName?: string; lastName?: string; email: string; phone?: string; interest?: string; message: string }) => ({
    subject: `New contact submission — ${d.interest ?? "General"}`,
    html: layout("New contact submission", `
      <p><strong>${[d.firstName, d.lastName].filter(Boolean).join(" ") || "—"}</strong></p>
      <p>Email: ${d.email}<br/>Phone: ${d.phone || "—"}<br/>Interest: ${d.interest || "—"}</p>
      <p style="background:#f7f9f8;border-radius:10px;padding:12px">${d.message}</p>`),
  }),

  membershipApplication: (name: string, planLabel: string) => ({
    subject: "Your Chamber membership application",
    html: layout("Application received 🎉", `
      <p>Hi ${name || "there"},</p>
      <p>Thank you for applying to the Toluca Lake Chamber of Commerce (${planLabel}).</p>
      <p>Your application is pending board review — we'll be in touch shortly. Membership is subject to approval, with a full refund if not approved.</p>`),
  }),

  donationReceipt: (amount: string, recurring: boolean) => ({
    subject: "Thank you for your donation",
    html: layout("Thank you for your generosity ❤️", `
      <p>Your ${recurring ? "monthly " : ""}donation of <strong>${amount}</strong> helps keep the Village thriving.</p>
      <p>Your support funds community programs, local events, and small-business advocacy across Toluca Lake.</p>`),
  }),

  membershipActive: (planLabel: string) => ({
    subject: "Welcome to the Toluca Lake Chamber!",
    html: layout("Your membership is active 🎉", `
      <p>Payment received — welcome to the Toluca Lake Chamber of Commerce (${planLabel})!</p>
      <p>You can now manage your business listing, register for members-only events, and access your benefits from your member portal.</p>`),
  }),

  eventConfirmation: (title: string, when: string) => ({
    subject: `You're registered: ${title}`,
    html: layout("You're all set! ✅", `
      <p>You're registered for <strong>${title}</strong>.</p>
      <p><strong>When:</strong> ${when}</p>
      <p>We can't wait to see you there. Add it to your calendar so you don't miss it!</p>`),
  }),
};
