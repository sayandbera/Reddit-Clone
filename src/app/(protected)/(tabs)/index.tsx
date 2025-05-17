import { FlatList } from "react-native";
import React from "react";
import PostListItem from "@/components/PostListItem";
import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "@/lib/services/postService";
import { useSupabase } from "@/lib/hooks/useSupabase";
// import posts from "../../../assets/data/posts.json";

const HomeScreen = () => {
  const supabase = useSupabase();

  const {
    data: posts,
    isLoading,
    error,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: () => fetchPosts({ limit: 10, offset: 0 }, supabase),
  });

  return (
    <FlatList
      data={posts}
      renderItem={({ item }) => (
        <PostListItem post={item} isDetailedPost={false} />
      )}
      onRefresh={refetch}
      refreshing={isRefetching}
      keyExtractor={(item) => item.id}
    />
  );
};

export default HomeScreen;
