"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ShoppingBag, Plus, Minus, X, Loader2, Check } from "lucide-react";
import type { Product } from "@/lib/store";
import { startStoreCheckout } from "@/app/actions/payments";
import { formatCurrency, cn } from "@/lib/utils";

type Cart = Record<string, number>; // slug -> qty

export function StoreFront({ products }: { products: Product[] }) {
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(products.map((p) => p.category)))],
    [products]
  );
  const [filter, setFilter] = useState("All");
  const [cart, setCart] = useState<Cart>({});
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");
  const [error, setError] = useState<string | null>(null);

  const visible = products.filter((p) => filter === "All" || p.category === filter);
  const lines = Object.entries(cart)
    .map(([slug, qty]) => ({ product: products.find((p) => p.slug === slug)!, qty }))
    .filter((l) => l.product);
  const count = lines.reduce((n, l) => n + l.qty, 0);
  const total = lines.reduce((n, l) => n + l.product.priceCents * l.qty, 0);

  function add(slug: string, delta = 1) {
    setCart((c) => {
      const next = { ...c };
      const q = (next[slug] ?? 0) + delta;
      if (q <= 0) delete next[slug];
      else next[slug] = Math.min(20, q);
      return next;
    });
  }

  async function checkout() {
    if (count === 0) return;
    setState("loading");
    setError(null);
    const res = await startStoreCheckout({
      items: lines.map((l) => ({ slug: l.product.slug, quantity: l.qty })),
      email: email || undefined,
    });
    if (res.url) {
      window.location.href = res.url;
      return;
    }
    if (res.error) {
      setError(res.error);
      setState("idle");
      return;
    }
    setState("done");
    setCart({});
  }

  return (
    <>
      {/* Sticky cart button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full bg-brand-800 px-5 py-3.5 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:bg-brand-900 active:scale-[0.97]"
        aria-label="Open cart"
      >
        <ShoppingBag className="h-5 w-5" />
        {count > 0 && (
          <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-white px-1.5 text-xs font-bold text-brand-800">
            {count}
          </span>
        )}
      </button>

      {/* Category filter */}
      <div className="no-scrollbar -mx-4 mb-12 flex gap-2 overflow-x-auto px-4 sm:justify-center">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={cn(
              "shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 active:scale-[0.97]",
              filter === c
                ? "bg-brand-800 text-white shadow-sm"
                : "border border-line bg-surface text-ink-soft hover:border-brand-300 hover:text-brand-800"
            )}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Product grid */}
      <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((p) => (
          <div key={p.slug} className="group flex flex-col overflow-hidden rounded-[1.5rem] border border-line bg-surface shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="relative aspect-[4/3] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.image} alt={p.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]" />
              {p.badge && (
                <span className="absolute left-3 top-3 rounded-full bg-brand-900/85 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                  {p.badge}
                </span>
              )}
            </div>
            <div className="flex flex-1 flex-col p-6">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-display text-lg font-semibold leading-snug text-brand-900">{p.name}</h3>
                <span className="shrink-0 font-display text-lg font-bold text-brand-700">{formatCurrency(p.priceCents)}</span>
              </div>
              <p className="mt-1 text-sm font-medium text-muted">{p.tagline}</p>
              <p className="mt-3 flex-1 text-[14px] leading-relaxed text-ink-soft">{p.description}</p>
              {cart[p.slug] ? (
                <div className="mt-5 flex items-center justify-between rounded-full border border-brand-300 bg-brand-50 p-1">
                  <button onClick={() => add(p.slug, -1)} className="flex h-9 w-9 items-center justify-center rounded-full text-brand-700 transition hover:bg-white active:scale-95" aria-label="Remove one">
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="font-display text-base font-bold text-brand-800">{cart[p.slug]} in cart</span>
                  <button onClick={() => add(p.slug, 1)} className="flex h-9 w-9 items-center justify-center rounded-full text-brand-700 transition hover:bg-white active:scale-95" aria-label="Add one">
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <button onClick={() => add(p.slug, 1)} className="mt-5 flex h-11 w-full items-center justify-center gap-2 rounded-full bg-brand-800 text-sm font-semibold text-white transition-all duration-200 hover:bg-brand-900 active:scale-[0.98]">
                  <Plus className="h-4 w-4" /> Add to cart
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Cart drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-[150] bg-brand-950/50 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <motion.aside
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="fixed right-0 top-0 z-[160] flex h-full w-full max-w-md flex-col bg-canvas shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-line px-6 py-5">
                <h2 className="font-display text-xl font-semibold text-brand-900">Your cart</h2>
                <button onClick={() => setOpen(false)} className="flex h-9 w-9 items-center justify-center rounded-full text-ink-soft transition hover:bg-brand-50" aria-label="Close cart">
                  <X className="h-5 w-5" />
                </button>
              </div>

              {state === "done" ? (
                <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-100 text-brand-600">
                    <Check className="h-8 w-8" />
                  </div>
                  <h3 className="mt-5 font-display text-2xl font-bold text-brand-900">Order received</h3>
                  <p className="mt-3 text-ink-soft">Thank you for supporting the Village. We&apos;ll be in touch about your order{email ? ` at ${email}` : ""}.</p>
                </div>
              ) : lines.length === 0 ? (
                <div className="flex flex-1 flex-col items-center justify-center px-8 text-center text-ink-soft">
                  <ShoppingBag className="h-10 w-10 text-faint" />
                  <p className="mt-4">Your cart is empty.</p>
                  <button onClick={() => setOpen(false)} className="mt-5 text-sm font-semibold text-brand-700 hover:text-brand-800">Keep shopping</button>
                </div>
              ) : (
                <>
                  <div className="flex-1 space-y-4 overflow-y-auto px-6 py-5">
                    {lines.map((l) => (
                      <div key={l.product.slug} className="flex gap-4">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={l.product.image} alt={l.product.name} className="h-20 w-20 shrink-0 rounded-xl object-cover" />
                        <div className="flex flex-1 flex-col">
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="text-sm font-semibold text-brand-900">{l.product.name}</h3>
                            <span className="text-sm font-bold text-brand-700">{formatCurrency(l.product.priceCents * l.qty)}</span>
                          </div>
                          <span className="text-xs text-muted">{l.product.tagline}</span>
                          <div className="mt-auto flex items-center gap-1 self-start rounded-full border border-line p-0.5">
                            <button onClick={() => add(l.product.slug, -1)} className="flex h-7 w-7 items-center justify-center rounded-full text-ink-soft transition hover:bg-brand-50" aria-label="Remove one"><Minus className="h-3.5 w-3.5" /></button>
                            <span className="w-6 text-center text-sm font-semibold text-brand-800">{l.qty}</span>
                            <button onClick={() => add(l.product.slug, 1)} className="flex h-7 w-7 items-center justify-center rounded-full text-ink-soft transition hover:bg-brand-50" aria-label="Add one"><Plus className="h-3.5 w-3.5" /></button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-line px-6 py-5">
                    <label className="block">
                      <span className="mb-1.5 block text-sm font-medium text-ink-soft">Email for your receipt (optional)</span>
                      <input
                        type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com"
                        className="h-11 w-full rounded-xl border border-line bg-surface px-4 text-sm outline-none focus:border-brand-500"
                      />
                    </label>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-sm text-ink-soft">Total</span>
                      <span className="font-display text-2xl font-bold text-brand-900">{formatCurrency(total)}</span>
                    </div>
                    {error && <p className="mt-2 text-sm text-danger">{error}</p>}
                    <button
                      onClick={checkout} disabled={state === "loading"}
                      className="mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#2a7fb8] font-semibold text-white transition hover:bg-[#236d9f] disabled:opacity-60"
                    >
                      {state === "loading" ? <Loader2 className="h-5 w-5 animate-spin" /> : <>Checkout · {formatCurrency(total)}</>}
                    </button>
                    <p className="mt-3 text-center text-xs text-muted">Secure checkout · Stripe-powered · Proceeds support the Chamber</p>
                  </div>
                </>
              )}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
