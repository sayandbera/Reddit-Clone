import { useLocalSearchParams } from "expo-router";
import { View, Text, ActivityIndicator } from "react-native";
import posts from "@/assets/data/posts.json";
import PostListItem from "@/components/PostListItem";
import { useQuery } from "@tanstack/react-query";
import { fetchPostById } from "@/lib/services/postService";
import { supabase } from "@/lib/hooks/useSupabase";

export default function PostDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const {
    data: post,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["posts", id],
    queryFn: () => fetchPostById(id, supabase),
  });

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error || !post) {
    console.log(error);
    return <Text>Post Not Found!</Text>;
  }

  return (
    <View>
      <PostListItem post={post} isDetailedPost={true} />
    </View>
  );
}
