/**
 * Design tokens — mirrors the web app's green-only system
 * (src/app/globals.css @theme). Keep in sync; in a full monorepo these would
 * be imported from a shared `packages/tokens`.
 */
export const colors = {
  brand900: "#073529",
  brand800: "#0b4435",
  brand700: "#0f5743",
  brand600: "#136a50",
  brand500: "#177a5c",
  brand400: "#3f9a7e",
  brand300: "#6fb6a0",
  brand100: "#d2e9e0",
  brand50: "#ecf5f1",
  canvas: "#f7f9f8",
  surface: "#ffffff",
  line: "#e1e6e4",
  ink: "#1a201e",
  inkSoft: "#3a413f",
  muted: "#6b7472",
  faint: "#9aa4a1",
  white: "#ffffff",
  danger: "#b23b3b",
};

export const radius = { sm: 8, md: 12, lg: 16, xl: 24, pill: 999 };
export const space = (n: number) => n * 4;

export const shadow = {
  card: {
    shadowColor: "#073529",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
};

/** Brand-tinted color for placeholder avatars (mirrors web gradientStyle). */
export function hueColor(hue: number, light = false) {
  return light ? `hsl(${hue}, 35%, 90%)` : `hsl(${hue}, 55%, 30%)`;
}

export function initials(name: string) {
  return name
    .replace(/[^a-zA-Z0-9 ]/g, "")
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}
