import { ScrollView, View, Text, StyleSheet, Pressable } from "react-native";
import { Link } from "expo-router";
import { useApi } from "@/useApi";
import { api } from "@/api";
import { Card, Avatar, Badge, Loading } from "@/components/ui";
import { colors, radius, space } from "@/theme";

const stats = [
  { label: "Members", value: "120+" },
  { label: "Years", value: "86" },
  { label: "Events/yr", value: "40+" },
  { label: "Categories", value: "14" },
];

export default function Home() {
  const dir = useApi(() => api.directory(), []);
  const ev = useApi(() => api.events(), []);

  const members = (dir.data?.businesses ?? []).filter((b) => b.tier !== "STANDARD").slice(0, 4);
  const events = (ev.data?.events ?? []).slice(0, 3);

  return (
    <ScrollView style={{ backgroundColor: colors.canvas }} contentContainerStyle={{ padding: 16, gap: 20 }}>
      {/* Hero */}
      <View style={styles.hero}>
        <Text style={styles.heroEyebrow}>Serving the Village since 1939</Text>
        <Text style={styles.heroTitle}>Empowering local business in Toluca Lake</Text>
        <Text style={styles.heroSub}>Resources, networking, and advocacy for the businesses and residents who make our community thrive.</Text>
        <View style={styles.statRow}>
          {stats.map((s) => (
            <View key={s.label} style={styles.stat}>
              <Text style={styles.statValue}>{s.value}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Featured events */}
      <View>
        <Text style={styles.section}>Upcoming events</Text>
        {ev.loading ? <Loading /> : events.map((e) => (
          <Link key={e.slug} href={`/events/${e.slug}`} asChild>
            <Pressable>
              <Card style={{ marginBottom: 12, flexDirection: "row", alignItems: "center", gap: 12 }}>
                <Avatar name={e.title} hue={e.hue} size={48} square />
                <View style={{ flex: 1 }}>
                  <Text style={styles.rowTitle}>{e.title}</Text>
                  <Text style={styles.rowSub}>{new Date(e.start).toLocaleDateString()} · {e.location}</Text>
                </View>
                {e.price === 0 ? <Badge label="Free" tone="brand" /> : <Badge label={`$${e.price / 100}`} />}
              </Card>
            </Pressable>
          </Link>
        ))}
      </View>

      {/* Featured members */}
      <View>
        <Text style={styles.section}>Featured members</Text>
        {dir.loading ? <Loading /> : members.map((b) => (
          <Link key={b.slug} href={`/directory/${b.slug}`} asChild>
            <Pressable>
              <Card style={{ marginBottom: 12, flexDirection: "row", alignItems: "center", gap: 12 }}>
                <Avatar name={b.name} hue={b.hue} size={48} square />
                <View style={{ flex: 1 }}>
                  <Text style={styles.rowTitle}>{b.name}</Text>
                  <Text style={styles.rowSub}>{b.tagline}</Text>
                </View>
                {b.tier === "PREMIUM" ? <Badge label="Premium" tone="premium" /> : <Badge label="Featured" tone="brand" />}
              </Card>
            </Pressable>
          </Link>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  hero: { backgroundColor: colors.brand700, borderRadius: radius.xl, padding: 20 },
  heroEyebrow: { color: colors.brand300, fontSize: 12, fontWeight: "600", letterSpacing: 1, textTransform: "uppercase" },
  heroTitle: { color: colors.white, fontSize: 28, fontWeight: "800", marginTop: 8, lineHeight: 32 },
  heroSub: { color: "rgba(255,255,255,0.85)", marginTop: 10, lineHeight: 20 },
  statRow: { flexDirection: "row", gap: 8, marginTop: 18 },
  stat: { flex: 1, backgroundColor: "rgba(255,255,255,0.12)", borderRadius: radius.md, padding: space(2.5) },
  statValue: { color: colors.white, fontSize: 18, fontWeight: "800" },
  statLabel: { color: "rgba(255,255,255,0.75)", fontSize: 11, marginTop: 2 },
  section: { fontSize: 20, fontWeight: "700", color: colors.brand900, marginBottom: 12 },
  rowTitle: { fontSize: 15, fontWeight: "600", color: colors.brand900 },
  rowSub: { fontSize: 13, color: colors.muted, marginTop: 2 },
});
