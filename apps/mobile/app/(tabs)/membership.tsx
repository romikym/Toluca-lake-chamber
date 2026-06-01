import { ScrollView, View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useApi } from "@/useApi";
import { api, formatCurrency } from "@/api";
import { Card, Badge, Loading, ErrorState } from "@/components/ui";
import { colors, radius } from "@/theme";

export default function Membership() {
  const { data, loading, error } = useApi(() => api.plans(), []);
  if (loading) return <Loading />;
  if (error) return <ErrorState message="Couldn't load membership plans." />;

  return (
    <ScrollView style={{ backgroundColor: colors.canvas }} contentContainerStyle={{ padding: 16, gap: 14 }}>
      <Text style={styles.intro}>Businesses and residents are welcome — you don&apos;t need to be located in Toluca Lake.</Text>
      {(data?.plans ?? []).map((p) => (
        <Card key={p.key} style={p.popular ? { borderColor: colors.brand300, borderWidth: 2 } : undefined}>
          <View style={styles.head}>
            <Text style={styles.name}>{p.name}</Text>
            {p.popular ? <Badge label="Most popular" tone="premium" /> : <Badge label={p.audience} />}
          </View>
          {p.eligibility ? <Text style={styles.elig}>{p.eligibility}</Text> : null}
          <Text style={styles.price}>{formatCurrency(p.priceCents)}<Text style={styles.per}> / year</Text></Text>
          <View style={{ gap: 8, marginTop: 12 }}>
            {p.benefits.map((b) => (
              <View key={b} style={{ flexDirection: "row", gap: 8, alignItems: "flex-start" }}>
                <Ionicons name="checkmark-circle" size={18} color={colors.brand500} />
                <Text style={styles.benefit}>{b}</Text>
              </View>
            ))}
          </View>
        </Card>
      ))}
      <Text style={styles.note}>To apply, open the web app — secure checkout is handled there.</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  intro: { color: colors.inkSoft, lineHeight: 20 },
  head: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  name: { fontSize: 18, fontWeight: "700", color: colors.brand900 },
  elig: { color: colors.muted, fontSize: 13, marginTop: 2 },
  price: { fontSize: 30, fontWeight: "800", color: colors.brand900, marginTop: 10 },
  per: { fontSize: 14, fontWeight: "400", color: colors.muted },
  benefit: { flex: 1, color: colors.inkSoft, fontSize: 14, lineHeight: 20 },
  note: { color: colors.faint, fontSize: 12, textAlign: "center", marginTop: 4 },
});
