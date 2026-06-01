import { Save } from "lucide-react";
import { Panel } from "@/components/dashboard/widgets";
import { Toggle } from "@/components/ui/toggle";

function Field({ label, value, type = "text", full }: { label: string; value?: string; type?: string; full?: boolean }) {
  return (
    <label className={full ? "sm:col-span-2 block" : "block"}>
      <span className="mb-1.5 block text-sm font-medium text-ink-soft">{label}</span>
      <input type={type} defaultValue={value} className="h-11 w-full rounded-xl border border-line bg-canvas px-4 text-sm outline-none focus:border-brand-500 focus:bg-surface" />
    </label>
  );
}

const prefs = [
  { label: "Event reminders", desc: "24h and 1h before events you've registered for" },
  { label: "Membership renewal notices", desc: "When your renewal is approaching" },
  { label: "Community newsletter", desc: "Monthly news, events, and member spotlights" },
  { label: "Directory inquiries", desc: "When someone contacts you via your listing" },
];

export default function PortalProfilePage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold text-brand-900">Profile</h1>
          <p className="text-sm text-muted">Your account details and preferences.</p>
        </div>
        <button className="flex items-center gap-2 rounded-xl bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600"><Save className="h-4 w-4" /> Save</button>
      </div>

      <Panel title="Account">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Full name" value="Taylor Montana" />
          <Field label="Role" value="President · Compass Real Estate" />
          <Field label="Email" value="taylor@example.com" type="email" />
          <Field label="Phone" value="818-555-0142" />
        </div>
      </Panel>

      <Panel title="Notification preferences">
        <ul className="divide-y divide-line">
          {prefs.map((p, i) => (
            <li key={p.label} className="flex items-center justify-between py-3">
              <div>
                <div className="text-sm font-medium text-brand-900">{p.label}</div>
                <div className="text-xs text-muted">{p.desc}</div>
              </div>
              <Toggle defaultOn={i !== 3} />
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}
