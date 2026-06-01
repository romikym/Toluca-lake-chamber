import {
  HeartPulse, Building2, UtensilsCrossed, Landmark, Megaphone, Palette,
  Sprout, ShoppingBag, HandHeart, GraduationCap, PawPrint, Car, Cpu, Plane,
  Trash2, Users, PartyPopper, Gift, Utensils,
  LayoutDashboard, UserCog, CalendarDays, Receipt, Sparkles, Settings,
  BarChart3, ShieldCheck, FileText, Inbox, Award, Store, type LucideIcon,
} from "lucide-react";

const registry: Record<string, LucideIcon> = {
  HeartPulse, Building2, UtensilsCrossed, Landmark, Megaphone, Palette,
  Sprout, ShoppingBag, HandHeart, GraduationCap, PawPrint, Car, Cpu, Plane,
  Trash2, Users, PartyPopper, Gift, Utensils,
  LayoutDashboard, UserCog, CalendarDays, Receipt, Sparkles, Settings,
  BarChart3, ShieldCheck, FileText, Inbox, Award, Store,
};

export function Icon({ name, className }: { name: string; className?: string }) {
  const Cmp = registry[name] ?? Building2;
  return <Cmp className={className} />;
}
