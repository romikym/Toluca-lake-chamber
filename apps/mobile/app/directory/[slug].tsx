import { ScrollView, View, Text, StyleSheet, Pressable, Linking } from "react-native";
import { Link, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useApi } from "@/useApi";
import { api } from "@/api";
import { Avatar, Badge, Card, Cover, Loading, ErrorState } from "@/components/ui";
import { colors } from "@/theme";

export default function BusinessDetail() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const { data, loading, error } = useApi(() => api.business(String(slug)), [slug]);

  if (loading) return <Loading />;
  if (error || !data) return <ErrorState message="Couldn't load this business." />;

  const { business: b, related } = data;

  return (
    <ScrollView style={{ backgroundColor: colors.canvas }}>
      <Cover hue={b.hue} height={120} />
      <View style={{ padding: 16, marginTop: -40 }}>
        <Avatar name={b.name} hue={b.hue} size={84} square />
        <View style={{ flexDirection: "row", gap: 8, marginTop: 12 }}>
          {b.tier === "PREMIUM" && <Badge label="Premium member" tone="premium" />}
          {b.tier === "FEATURED" && <Badge label="Featured member" tone="brand" />}
        </View>
        <Text style={styles.name}>{b.name}</Text>
        <Text style={styles.tagline}>{b.tagline}</Text>

        <Card style={{ marginTop: 16 }}>
          <Text style={styles.h}>About</Text>
          <Text style={styles.body}>{b.description}</Text>
        </Card>

        <Card style={{ marginTop: 14, gap: 12 }}>
          <Text style={styles.h}>Contact</Text>
          <Row icon="location-outline" text={b.address} />
          {b.phone ? <Pressable onPress={() => Linking.openURL(`tel:${b.phone}`)}><Row icon="call-outline" text={b.phone} /></Pressable> : null}
          {b.website ? <Pressable onPress={() => Linking.openURL(`https://${b.website}`)}><Row icon="globe-outline" text={b.website} /></Pressable> : null}
        </Card>

        {related.length > 0 && (
          <View style={{ marginTop: 20 }}>
            <Text style={styles.h}>Similar members</Text>
            {related.map((r) => (
              <Link key={r.slug} href={`/directory/${r.slug}`} asChild>
                <Pressable>
                  <Card style={{ marginTop: 10, flexDirection: "row", alignItems: "center", gap: 12 }}>
                    <Avatar name={r.name} hue={r.hue} size={44} square />
                    <View style={{ flex: 1 }}>
                      <Text style={styles.rowTitle}>{r.name}</Text>
                      <Text style={styles.rowSub} numberOfLines={1}>{r.tagline}</Text>
                    </View>
                  </Card>
                </Pressable>
              </Link>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
}

function Row({ icon, text }: { icon: any; text: string }) {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
      <Ionicons name={icon} size={18} color={colors.brand500} />
      <Text style={styles.body}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  name: { fontSize: 24, fontWeight: "800", color: colors.brand900, marginTop: 10 },
  tagline: { fontSize: 15, color: colors.muted, marginTop: 2 },
  h: { fontSize: 16, fontWeight: "700", color: colors.brand900, marginBottom: 6 },
  body: { fontSize: 15, color: colors.inkSoft, lineHeight: 22, flex: 1 },
  rowTitle: { fontSize: 14, fontWeight: "600", color: colors.brand900 },
  rowSub: { fontSize: 13, color: colors.muted, marginTop: 1 },
});
