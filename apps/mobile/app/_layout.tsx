import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { colors } from "@/theme";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colors.brand800 },
          headerTintColor: colors.white,
          headerTitleStyle: { fontWeight: "700" },
          contentStyle: { backgroundColor: colors.canvas },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="directory/[slug]" options={{ title: "Business" }} />
        <Stack.Screen name="events/[slug]" options={{ title: "Event" }} />
      </Stack>
    </SafeAreaProvider>
  );
}
