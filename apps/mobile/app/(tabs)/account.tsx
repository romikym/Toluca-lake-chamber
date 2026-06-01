import { View, Text, StyleSheet, Pressable, Linking } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Avatar, Card } from "@/components/ui";
import { colors, radius } from "@/theme";

const links = [
  { icon: "person-outline", label: "Member sign in", note: "Manage your listing & events" },
  { icon: "heart-outline", label: "Donate", note: "Support the Village" },
  { icon: "mail-outline", label: "Contact the Chamber", note: "Info@TolucaLakeChamber.Com" },
  { icon: "information-circle-outline", label: "About", note: "Serving Toluca Lake since 1939" },
] as const;

export default function Account() {
  return (
    <View style={{ flex: 1, backgroundColor: colors.canvas, padding: 16, gap: 16 }}>
      <Card style={{ alignItems: "center", gap: 10, paddingVertical: 28 }}>
        <Avatar name="Toluca Lake" hue={150} size={72} />
        <Text style={styles.title}>Welcome to the Village</Text>
        <Text style={styles.sub}>Sign in to manage your membership, or explore as a guest.</Text>
        <Pressable style={styles.btn} onPress={() => Linking.openURL("https://tolucalakechamber.com/login")}>
          <Text style={styles.btnText}>Member sign in</Text>
        </Pressable>
      </Card>

      <Card style={{ padding: 0, overflow: "hidden" }}>
        {links.map((l, i) => (
          <View key={l.label} style={[styles.row, i < links.length - 1 && styles.rowBorder]}>
            <Ionicons name={l.icon} size={20} color={colors.brand600} />
            <View style={{ flex: 1 }}>
              <Text style={styles.rowLabel}>{l.label}</Text>
              <Text style={styles.rowNote}>{l.note}</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.faint} />
          </View>
        ))}
      </Card>

      <Text style={styles.version}>Toluca Lake Chamber · v0.1.0</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 20, fontWeight: "700", color: colors.brand900 },
  sub: { color: colors.muted, textAlign: "center", lineHeight: 20 },
  btn: { backgroundColor: colors.brand500, borderRadius: radius.md, paddingHorizontal: 24, paddingVertical: 12, marginTop: 6 },
  btnText: { color: colors.white, fontWeight: "600" },
  row: { flexDirection: "row", alignItems: "center", gap: 14, padding: 16 },
  rowBorder: { borderBottomWidth: 1, borderBottomColor: colors.line },
  rowLabel: { fontSize: 15, fontWeight: "600", color: colors.brand900 },
  rowNote: { fontSize: 13, color: colors.muted, marginTop: 1 },
  version: { color: colors.faint, fontSize: 12, textAlign: "center", marginTop: "auto" },
});
