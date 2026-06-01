"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, type LucideIcon } from "lucide-react";
import { Counter } from "@/components/ui/counter";
import { cn } from "@/lib/utils";

export function StatTile({
  icon: Icon, label, value, prefix, suffix, delta, deltaTone = "up",
}: {
  icon: LucideIcon; label: string; value: number; prefix?: string; suffix?: string;
  delta?: string; deltaTone?: "up" | "down" | "flat";
}) {
  return (
    <div className="group rounded-2xl border border-line bg-surface p-5 shadow-sm transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-line-strong hover:shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-100 text-brand-600 transition-colors group-hover:bg-brand-500 group-hover:text-white">
          <Icon className="h-5 w-5" />
        </div>
        {delta && (
          <span className={cn(
            "flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
            deltaTone === "up" && "bg-brand-50 text-brand-600",
            deltaTone === "down" && "bg-danger-soft text-danger",
            deltaTone === "flat" && "bg-canvas text-muted"
          )}>
            {deltaTone === "up" && <TrendingUp className="h-3 w-3" />}
            {deltaTone === "down" && <TrendingDown className="h-3 w-3" />}
            {delta}
          </span>
        )}
      </div>
      <div className="mt-4 font-display text-3xl font-bold text-brand-900">
        <Counter value={value} prefix={prefix} suffix={suffix} />
      </div>
      <div className="mt-1 text-sm text-muted">{label}</div>
    </div>
  );
}

export function BarChart({ data, label }: { data: { label: string; value: number }[]; label: string }) {
  const max = Math.max(...data.map((d) => d.value));
  return (
    <div className="rounded-2xl border border-line bg-surface p-6 shadow-sm">
      <h3 className="font-display font-semibold text-brand-900">{label}</h3>
      <div className="mt-6 flex h-44 items-end gap-3">
        {data.map((d, i) => (
          <div key={d.label} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
            <div className="flex w-full flex-1 items-end">
              <motion.div
                className="w-full rounded-t-lg bg-gradient-to-t from-brand-600 to-brand-400"
                initial={{ height: 0 }}
                whileInView={{ height: `${Math.max(4, (d.value / max) * 100)}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.05, ease: [0.2, 0.8, 0.2, 1] }}
              />
            </div>
            <span className="text-[11px] text-muted">{d.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ProgressRing({
  value, label, sub, size = 132,
}: {
  value: number; label: string; sub?: string; size?: number;
}) {
  const stroke = 10;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const tone = value > 60 ? "var(--color-brand-500)" : value > 25 ? "var(--color-warning)" : "var(--color-danger)";
  return (
    <div className="flex items-center gap-5">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--color-brand-100)" strokeWidth={stroke} />
          <motion.circle
            cx={size / 2} cy={size / 2} r={r} fill="none" stroke={tone} strokeWidth={stroke} strokeLinecap="round"
            strokeDasharray={c}
            initial={{ strokeDashoffset: c }}
            whileInView={{ strokeDashoffset: c - (value / 100) * c }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.2, 0.8, 0.2, 1] }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display text-2xl font-bold text-brand-900"><Counter value={value} suffix="%" /></span>
        </div>
      </div>
      <div>
        <div className="font-display font-semibold text-brand-900">{label}</div>
        {sub && <p className="mt-1 max-w-[180px] text-sm text-muted">{sub}</p>}
      </div>
    </div>
  );
}

export function Panel({ title, action, children }: { title: string; action?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-line bg-surface p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-display font-semibold text-brand-900">{title}</h3>
        {action}
      </div>
      {children}
    </div>
  );
}
