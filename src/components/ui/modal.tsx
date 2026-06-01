"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

export function Modal({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto p-4 sm:p-8"
        >
          <div className="fixed inset-0 bg-brand-900/30 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
            className="relative z-10 my-auto w-full max-w-lg rounded-2xl border border-line bg-surface shadow-lg"
          >
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <h2 className="font-display text-lg font-semibold text-brand-900">{title}</h2>
              <button onClick={onClose} className="rounded-lg p-1 text-muted hover:bg-brand-50 hover:text-brand-700" aria-label="Close">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="max-h-[70vh] overflow-y-auto p-5">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** Shared form field helpers for admin modals. */
export function Field({
  label, name, defaultValue, type = "text", required, placeholder, full,
}: {
  label: string; name: string; defaultValue?: string | number; type?: string;
  required?: boolean; placeholder?: string; full?: boolean;
}) {
  return (
    <label className={full ? "sm:col-span-2 block" : "block"}>
      <span className="mb-1 block text-sm font-medium text-ink-soft">{label}{required && <span className="text-danger"> *</span>}</span>
      <input
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="h-10 w-full rounded-xl border border-line bg-canvas px-3 text-sm outline-none focus:border-brand-500 focus:bg-surface"
      />
    </label>
  );
}

export function TextArea({
  label, name, defaultValue, rows = 3, required,
}: {
  label: string; name: string; defaultValue?: string; rows?: number; required?: boolean;
}) {
  return (
    <label className="sm:col-span-2 block">
      <span className="mb-1 block text-sm font-medium text-ink-soft">{label}{required && <span className="text-danger"> *</span>}</span>
      <textarea name={name} rows={rows} required={required} defaultValue={defaultValue} className="w-full rounded-xl border border-line bg-canvas p-3 text-sm outline-none focus:border-brand-500 focus:bg-surface" />
    </label>
  );
}

export function Select({
  label, name, defaultValue, options, full,
}: {
  label: string; name: string; defaultValue?: string; options: { value: string; label: string }[]; full?: boolean;
}) {
  return (
    <label className={full ? "sm:col-span-2 block" : "block"}>
      <span className="mb-1 block text-sm font-medium text-ink-soft">{label}</span>
      <select name={name} defaultValue={defaultValue} className="h-10 w-full rounded-xl border border-line bg-canvas px-3 text-sm outline-none focus:border-brand-500">
        {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </label>
  );
}
