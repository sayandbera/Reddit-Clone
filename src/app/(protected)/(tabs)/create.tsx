import { useState } from "react";
import {
  View,
  Image,
  Text,
  Pressable,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, Feather } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import groups from "@/assets/data/groups.json";

const create = () => {
  const [title, setTitle] = useState<string>("");
  const [bodyText, setBodyText] = useState<string>("");
  const [image, setImage] = useState<string | null>(null);
  const isPending = false;
  const onPostClick = async () => {
    // let imagePath = image ? await uploadImage(image, supabase) : undefined;
    // mutate(imagePath);
  };
  const goBack = () => {
    setTitle("");
    setBodyText("");
    // setGroup(null);
    router.back();
  };
  const group = groups[2];

  return (
    <SafeAreaView
      style={{ backgroundColor: "white", flex: 1, paddingHorizontal: 16 }}
    >
      {/* HEADER */}
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <AntDesign name="close" size={24} color="black" onPress={goBack} />
        <Pressable
          onPress={() => onPostClick()}
          style={{ marginLeft: "auto" }}
          disabled={isPending}
        >
          <Text style={styles.postText}>
            {isPending ? "Posting..." : "Post"}
          </Text>
        </Pressable>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ paddingVertical: 12 }}
        >
          {/* COMMUNITY SELECTOR */}
          <Link href={"groupSelector"} asChild>
            <Pressable style={styles.communityContainer}>
              {group ? (
                <>
                  <Image
                    source={{ uri: group.image }}
                    style={{ width: 20, height: 20, borderRadius: 10 }}
                  />
                  <Text style={{ fontWeight: "600" }}>{group.name}</Text>
                </>
              ) : (
                <>
                  <Text style={styles.rStyles}>r/</Text>
                  <Text style={{ fontWeight: "600" }}>Select a community</Text>
                </>
              )}
            </Pressable>
          </Link>

          {/* INPUTS */}
          <TextInput
            placeholder="Title"
            style={{ fontSize: 20, fontWeight: "600", paddingVertical: 20 }}
            value={title}
            onChangeText={setTitle}
            multiline
            autoFocus
            scrollEnabled={false}
            placeholderTextColor="gray"
          />
          <TextInput
            placeholder="Description (optional)"
            value={bodyText}
            onChangeText={(text) => setBodyText(text)}
            multiline
            scrollEnabled={false}
            placeholderTextColor="gray"
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default create;

const styles = StyleSheet.create({
  postText: {
    color: "white",
    backgroundColor: "#115BCA",
    fontWeight: "bold",
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  rStyles: {
    backgroundColor: "black",
    color: "white",
    paddingVertical: 1,
    paddingHorizontal: 5,
    borderRadius: 10,
    fontWeight: "bold",
  },
  communityContainer: {
    backgroundColor: "#EDEDED",
    flexDirection: "row",
    padding: 10,
    borderRadius: 20,
    gap: 5,
    alignSelf: "flex-start",
    marginVertical: 10,
  },
});
