import { Redirect, Stack, router } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import { View } from "react-native";
import { AntDesign, MaterialIcons, Entypo } from "@expo/vector-icons";

export default function ProtectedLayout() {
  const { isSignedIn } = useAuth();

  if (!isSignedIn) {
    return <Redirect href="/(auth)/sign-in" />;
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="group-selector" options={{ headerShown: false }} />
      <Stack.Screen
        name="post/[id]"
        options={{
          headerTitle: "",
          headerStyle: { backgroundColor: "#FF5700" },
          headerLeft: () => (
            <AntDesign
              name="close"
              size={24}
              color="white"
              onPress={() => router.back()}
            />
          ),
          animation: "fade_from_bottom",
        }}
      />
    </Stack>
  );
}
