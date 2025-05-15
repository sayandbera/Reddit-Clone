import { FlatList } from "react-native";
import React from "react";
import posts from "../../../assets/data/posts.json";
import PostListItem from "../../../components/PostListItem";

const HomeScreen = () => {
  return (
    <FlatList
      data={posts}
      renderItem={({ item }) => (
        <PostListItem post={item} isDetailedPost={false} />
      )}
    />
  );
};

export default HomeScreen;
