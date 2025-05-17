import { router, Stack, useLocalSearchParams } from "expo-router";
import { View, Text, ActivityIndicator, Alert, FlatList } from "react-native";
import posts from "@/assets/data/posts.json";
import PostListItem from "@/components/PostListItem";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deletePostById, fetchPostById } from "@/lib/services/postService";
import { useSupabase } from "@/lib/hooks/useSupabase";
import { AntDesign, MaterialIcons, Entypo } from "@expo/vector-icons";
import { useUser } from "@clerk/clerk-expo";

export default function PostDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { user } = useUser();
  const supabase = useSupabase();
  const queryClient = useQueryClient();

  const {
    data: post,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["posts", id],
    queryFn: () => fetchPostById(id, supabase),
  });

  const { mutate: remove } = useMutation({
    mutationFn: () => deletePostById(id, supabase),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      router.back();
    },
    onError: (error) => {
      Alert.alert("Error", error.message);
    },
  });

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error || !post) {
    console.log(error);
    return <Text>Post Not Found!</Text>;
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => (
            <View style={{ flexDirection: "row", gap: 16 }}>
              {post.user_id === user?.id && (
                <Entypo
                  onPress={() => remove()}
                  name="trash"
                  size={24}
                  color="white"
                />
              )}
              <AntDesign name="search1" size={22} color="white" />
              <MaterialIcons name="sort" size={26} color="white" />
              <Entypo name="dots-three-horizontal" size={22} color="white" />
            </View>
          ),
          animation: "slide_from_bottom",
        }}
      />

      <View>
        <PostListItem post={post} isDetailedPost={true} />
      </View>

      {/* <FlatList
        data={comments}
        renderItem={({ item }) => (
          <CommentListItem
            comment={item}
            depth={0}
            handleReplyButtonPressed={handleReplyButtonPressed}
          />
        )}
        ListHeaderComponent={<PostListItem post={post} isDetailedPost />}
      /> */}
    </>
  );
}
