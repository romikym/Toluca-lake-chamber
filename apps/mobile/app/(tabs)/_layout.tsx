import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/theme";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.brand600,
        tabBarInactiveTintColor: colors.faint,
        tabBarStyle: { backgroundColor: colors.surface, borderTopColor: colors.line },
        headerStyle: { backgroundColor: colors.brand800 },
        headerTintColor: colors.white,
        headerTitleStyle: { fontWeight: "700" },
      }}
    >
      <Tabs.Screen name="index" options={{ title: "Home", tabBarIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color} /> }} />
      <Tabs.Screen name="directory" options={{ title: "Directory", tabBarIcon: ({ color, size }) => <Ionicons name="business-outline" size={size} color={color} /> }} />
      <Tabs.Screen name="events" options={{ title: "Events", tabBarIcon: ({ color, size }) => <Ionicons name="calendar-outline" size={size} color={color} /> }} />
      <Tabs.Screen name="membership" options={{ title: "Join", tabBarIcon: ({ color, size }) => <Ionicons name="ribbon-outline" size={size} color={color} /> }} />
      <Tabs.Screen name="account" options={{ title: "Account", tabBarIcon: ({ color, size }) => <Ionicons name="person-outline" size={size} color={color} /> }} />
    </Tabs>
  );
}
