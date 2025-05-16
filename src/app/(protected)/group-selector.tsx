import {
  View,
  Text,
  TextInput,
  FlatList,
  Pressable,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import groups from "@/assets/data/groups.json";
import { Group } from "@/types";
import { useSetAtom } from "jotai";
import { selectedGroupAtom } from "@/atoms";

export default function GroupSelector() {
  const [searchValue, setSearchValue] = useState<string>("");
  const setGroup = useSetAtom(selectedGroupAtom);
  const filteredGroups = useMemo(
    () =>
      groups.filter((group) =>
        group.name.toLowerCase().includes(searchValue.toLowerCase())
      ),
    [searchValue]
  );

  const onGroupSelected = (group: Group) => {
    setGroup(group);
    router.back();
  };

  const renderListHeader = () => (
    <>
      {/* Header View */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 8, // Spacing after header
        }}
      >
        <Pressable
          onPress={() => router.back()}
          hitSlop={10}
          style={{ padding: 4 }}
        >
          <AntDesign name="close" size={24} color="black" />
        </Pressable>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            textAlign: "center",
            flex: 1,
            marginRight: 24 + 4 * 2, // Balance the space taken by the close icon + its padding
          }}
        >
          Post to
        </Text>
      </View>

      {/* Search Bar View */}
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "lightgrey",
          borderRadius: 20,
          gap: 5,
          marginBottom: 20, // Spacing after search bar, before list items start
          alignItems: "center",
          paddingHorizontal: 12,
        }}
      >
        <AntDesign name="search1" size={16} color="gray" />
        <TextInput
          placeholder="Search for a community"
          placeholderTextColor={"grey"}
          style={{ paddingVertical: 12, flex: 1 }}
          value={searchValue}
          onChangeText={(text) => setSearchValue(text)}
        />
        {searchValue && (
          <Pressable
            onPress={() => setSearchValue("")}
            hitSlop={10}
            style={{ padding: 4 }}
          >
            <AntDesign name="closecircle" size={15} color="#E4E4E4" />
          </Pressable>
        )}
      </View>
    </>
  );

  return (
    <SafeAreaView
      style={{
        backgroundColor: "white",
        flex: 1,
        paddingHorizontal: 16,
      }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0} // Adjust if needed
      >
        <FlatList
          data={filteredGroups}
          ListHeaderComponent={renderListHeader}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => onGroupSelected(item)}
              style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
            >
              <Image
                source={{ uri: item.image }}
                style={{ width: 40, aspectRatio: 1, borderRadius: 20 }}
              />
              <Text style={{ fontWeight: "600", fontSize: 15 }}>
                {item.name}
              </Text>
            </Pressable>
          )}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
