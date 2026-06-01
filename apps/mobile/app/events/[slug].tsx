import { useState } from "react";
import { ScrollView, View, Text, StyleSheet, Pressable } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useApi } from "@/useApi";
import { api, formatCurrency } from "@/api";
import { Badge, Card, Cover, Loading, ErrorState } from "@/components/ui";
import { colors, radius } from "@/theme";

export default function EventDetail() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const { data, loading, error } = useApi(() => api.event(String(slug)), [slug]);
  const [registered, setRegistered] = useState(false);

  if (loading) return <Loading />;
  if (error || !data) return <ErrorState message="Couldn't load this event." />;

  const { event: e, program } = data;
  const d = new Date(e.start);
  const spotsLeft = Math.max(0, e.capacity - e.registered);

  return (
    <ScrollView style={{ backgroundColor: colors.canvas }}>
      <Cover hue={e.hue} height={150}>
        <View style={{ flexDirection: "row", gap: 8 }}>
          {program ? <Badge label={program.name} /> : null}
          {e.price === 0 ? <Badge label="Free" tone="brand" /> : null}
        </View>
      </Cover>
      <View style={{ padding: 16 }}>
        <Text style={styles.title}>{e.title}</Text>

        <Card style={{ marginTop: 14, gap: 10 }}>
          <Row icon="calendar-outline" text={d.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" })} />
          <Row icon="time-outline" text={d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })} />
          <Row icon="location-outline" text={`${e.location} · ${e.address}`} />
        </Card>

        <Card style={{ marginTop: 14 }}>
          <Text style={styles.h}>About this event</Text>
          <Text style={styles.body}>{e.description}</Text>
        </Card>

        <Card style={{ marginTop: 14 }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "baseline" }}>
            <Text style={styles.price}>{e.price === 0 ? "Free" : formatCurrency(e.price)}</Text>
            <Text style={styles.spots}>{spotsLeft} spots left</Text>
          </View>
          <Pressable
            style={[styles.btn, registered && { backgroundColor: colors.brand100 }]}
            onPress={() => setRegistered(true)}
            disabled={registered}
          >
            {registered ? (
              <Text style={[styles.btnText, { color: colors.brand700 }]}>✓ You&apos;re registered</Text>
            ) : (
              <Text style={styles.btnText}>{e.price === 0 ? "RSVP now" : "Register"}</Text>
            )}
          </Pressable>
          <Text style={styles.note}>Secure registration via the Chamber</Text>
        </Card>
      </View>
    </ScrollView>
  );
}

function Row({ icon, text }: { icon: any; text: string }) {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
      <Ionicons name={icon} size={18} color={colors.brand500} />
      <Text style={[styles.body, { flex: 1 }]}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 24, fontWeight: "800", color: colors.brand900 },
  h: { fontSize: 16, fontWeight: "700", color: colors.brand900, marginBottom: 6 },
  body: { fontSize: 15, color: colors.inkSoft, lineHeight: 22 },
  price: { fontSize: 24, fontWeight: "800", color: colors.brand900 },
  spots: { fontSize: 13, color: colors.muted },
  btn: { backgroundColor: colors.brand500, borderRadius: radius.md, paddingVertical: 14, alignItems: "center", marginTop: 14 },
  btnText: { color: colors.white, fontWeight: "700", fontSize: 15 },
  note: { color: colors.faint, fontSize: 12, textAlign: "center", marginTop: 8 },
});
