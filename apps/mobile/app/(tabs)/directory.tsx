import { useMemo, useState } from "react";
import { View, Text, TextInput, FlatList, Pressable, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useApi } from "@/useApi";
import { api } from "@/api";
import { Card, Avatar, Badge, Loading, ErrorState } from "@/components/ui";
import { colors, radius } from "@/theme";

export default function Directory() {
  const { data, loading, error } = useApi(() => api.directory(), []);
  const [q, setQ] = useState("");

  const results = useMemo(() => {
    const list = data?.businesses ?? [];
    const query = q.trim().toLowerCase();
    if (!query) return list;
    return list.filter((b) => b.name.toLowerCase().includes(query) || b.tagline.toLowerCase().includes(query));
  }, [data, q]);

  if (loading) return <Loading />;
  if (error) return <ErrorState message="Couldn't load the directory." />;

  return (
    <View style={{ flex: 1, backgroundColor: colors.canvas }}>
      <View style={styles.searchWrap}>
        <Ionicons name="search" size={18} color={colors.faint} />
        <TextInput
          value={q}
          onChangeText={setQ}
          placeholder="Search businesses…"
          placeholderTextColor={colors.faint}
          style={styles.search}
        />
      </View>
      <FlatList
        data={results}
        keyExtractor={(b) => b.slug}
        contentContainerStyle={{ padding: 16, paddingTop: 4, gap: 12 }}
        ListHeaderComponent={<Text style={styles.count}>{results.length} members</Text>}
        renderItem={({ item: b }) => (
          <Link href={`/directory/${b.slug}`} asChild>
            <Pressable>
              <Card style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
                <Avatar name={b.name} hue={b.hue} size={48} square />
                <View style={{ flex: 1 }}>
                  <Text style={styles.title}>{b.name}</Text>
                  <Text style={styles.sub} numberOfLines={1}>{b.tagline}</Text>
                </View>
                {b.tier === "PREMIUM" && <Badge label="Premium" tone="premium" />}
                {b.tier === "FEATURED" && <Badge label="Featured" tone="brand" />}
              </Card>
            </Pressable>
          </Link>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchWrap: { flexDirection: "row", alignItems: "center", gap: 8, margin: 16, marginBottom: 8, paddingHorizontal: 14, height: 46, backgroundColor: colors.surface, borderRadius: radius.md, borderWidth: 1, borderColor: colors.line },
  search: { flex: 1, color: colors.ink },
  count: { color: colors.muted, fontSize: 13, marginBottom: 4 },
  title: { fontSize: 15, fontWeight: "600", color: colors.brand900 },
  sub: { fontSize: 13, color: colors.muted, marginTop: 2 },
});
