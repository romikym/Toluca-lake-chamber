import { ReactNode } from "react";
import { View, Text, StyleSheet, ActivityIndicator, ViewStyle } from "react-native";
import { colors, radius, shadow, hueColor, initials } from "@/theme";

export function Card({ children, style }: { children: ReactNode; style?: ViewStyle }) {
  return <View style={[styles.card, style]}>{children}</View>;
}

export function Badge({ label, tone = "neutral" }: { label: string; tone?: "neutral" | "brand" | "premium" }) {
  const map = {
    neutral: { bg: colors.canvas, fg: colors.muted },
    brand: { bg: colors.brand50, fg: colors.brand700 },
    premium: { bg: colors.brand700, fg: colors.white },
  }[tone];
  return (
    <View style={[styles.badge, { backgroundColor: map.bg }]}>
      <Text style={[styles.badgeText, { color: map.fg }]}>{label}</Text>
    </View>
  );
}

export function Avatar({ name, hue, size = 56, square = false }: { name: string; hue: number; size?: number; square?: boolean }) {
  return (
    <View style={{ width: size, height: size, borderRadius: square ? radius.md : size / 2, backgroundColor: hueColor(hue), alignItems: "center", justifyContent: "center" }}>
      <Text style={{ color: colors.white, fontWeight: "700", fontSize: size * 0.32 }}>{initials(name)}</Text>
    </View>
  );
}

export function Cover({ hue, height = 120, children }: { hue: number; height?: number; children?: ReactNode }) {
  return <View style={{ height, backgroundColor: hueColor(hue), justifyContent: "flex-end", padding: 16 }}>{children}</View>;
}

export function Loading() {
  return (
    <View style={styles.center}>
      <ActivityIndicator color={colors.brand500} size="large" />
    </View>
  );
}

export function ErrorState({ message }: { message: string }) {
  return (
    <View style={styles.center}>
      <Text style={{ color: colors.muted, textAlign: "center" }}>{message}</Text>
      <Text style={{ color: colors.faint, fontSize: 12, marginTop: 8, textAlign: "center" }}>
        Set EXPO_PUBLIC_API_URL to your web app&apos;s address.
      </Text>
    </View>
  );
}

export function SectionTitle({ children }: { children: ReactNode }) {
  return <Text style={styles.section}>{children}</Text>;
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.surface, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.line, padding: 16, ...shadow.card },
  badge: { paddingHorizontal: 10, paddingVertical: 3, borderRadius: radius.pill, alignSelf: "flex-start" },
  badgeText: { fontSize: 11, fontWeight: "600" },
  center: { flex: 1, alignItems: "center", justifyContent: "center", padding: 32 },
  section: { fontSize: 20, fontWeight: "700", color: colors.brand900, marginBottom: 12 },
});
