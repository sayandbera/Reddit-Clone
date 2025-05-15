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
      <Stack.Screen name="groupSelector" options={{ headerShown: false }} />
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
          headerRight: () => (
            <View style={{ flexDirection: "row", gap: 16 }}>
              <AntDesign name="search1" size={22} color="white" />
              <MaterialIcons name="sort" size={26} color="white" />
              <Entypo name="dots-three-horizontal" size={22} color="white" />
            </View>
          ),
          animation: "slide_from_bottom",
        }}
      />
    </Stack>
  );
}
