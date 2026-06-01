import { View, Text, FlatList, Pressable, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { useApi } from "@/useApi";
import { api } from "@/api";
import { Card, Cover, Badge, Loading, ErrorState } from "@/components/ui";
import { colors } from "@/theme";

export default function Events() {
  const { data, loading, error } = useApi(() => api.events(), []);
  if (loading) return <Loading />;
  if (error) return <ErrorState message="Couldn't load events." />;

  const events = [...(data?.events ?? [])].sort((a, b) => +new Date(a.start) - +new Date(b.start));

  return (
    <FlatList
      style={{ backgroundColor: colors.canvas }}
      data={events}
      keyExtractor={(e) => e.slug}
      contentContainerStyle={{ padding: 16, gap: 14 }}
      renderItem={({ item: e }) => {
        const d = new Date(e.start);
        return (
          <Link href={`/events/${e.slug}`} asChild>
            <Pressable>
              <Card style={{ padding: 0, overflow: "hidden" }}>
                <Cover hue={e.hue} height={96}>
                  <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <View style={styles.datePill}>
                      <Text style={styles.dateMonth}>{d.toLocaleString("en-US", { month: "short" }).toUpperCase()}</Text>
                      <Text style={styles.dateDay}>{d.getDate()}</Text>
                    </View>
                    {e.price === 0 ? <Badge label="Free" tone="brand" /> : <Badge label={`$${e.price / 100}`} />}
                  </View>
                </Cover>
                <View style={{ padding: 16 }}>
                  <Text style={styles.title}>{e.title}</Text>
                  <Text style={styles.sub}>{d.toLocaleDateString()} · {e.location}</Text>
                  <Text style={styles.summary} numberOfLines={2}>{e.summary}</Text>
                </View>
              </Card>
            </Pressable>
          </Link>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  datePill: { backgroundColor: "rgba(255,255,255,0.95)", borderRadius: 12, paddingHorizontal: 10, paddingVertical: 4, alignItems: "center" },
  dateMonth: { fontSize: 10, fontWeight: "700", color: colors.brand500 },
  dateDay: { fontSize: 18, fontWeight: "800", color: colors.brand900 },
  title: { fontSize: 17, fontWeight: "700", color: colors.brand900 },
  sub: { fontSize: 13, color: colors.muted, marginTop: 4 },
  summary: { fontSize: 14, color: colors.inkSoft, marginTop: 8, lineHeight: 20 },
});
