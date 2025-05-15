import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Post } from "../types";
import { Link } from "expo-router";
import { formatDistanceToNowStrict } from "date-fns";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

type PostListItemProps = {
  post: Post;
  isDetailedPost?: boolean;
};

const PostListItem = ({ post, isDetailedPost }: PostListItemProps) => {
  const myVote = { value: 3 };
  const isUpvoted = myVote?.value === 1;
  const isDownvoted = myVote?.value === -1;
  const shouldShowImage = isDetailedPost || post.image;
  const shouldShowDescription = isDetailedPost || !post.image;

  return (
    <Link href={`/post/${post.id}`} asChild>
      <Pressable
        style={{
          paddingHorizontal: 15,
          paddingVertical: 10,
          gap: 7,
          borderBottomColor: "lightgrey",
          borderBottomWidth: 0.5,
          backgroundColor: "white",
        }}
      >
        {/* HEADER */}
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            source={{ uri: post.group.image }}
            style={{ width: 24, height: 24, borderRadius: 30, marginRight: 5 }}
          />
          <View>
            <View style={{ flexDirection: "row", gap: 5 }}>
              <Text
                style={{ fontWeight: "bold", fontSize: 13, color: "#3A3B3C" }}
              >
                {post.group.name}
              </Text>
              <Text
                style={{ color: "grey", fontSize: 13, alignSelf: "flex-start" }}
              >
                {formatDistanceToNowStrict(new Date(post.created_at))}
              </Text>
            </View>
            {isDetailedPost && (
              <Text style={{ fontSize: 13, color: "#2E5DAA" }}>
                {post.user?.name}
              </Text>
            )}
          </View>
          <Pressable
            onPress={() => console.error("Pressed")}
            style={{
              marginLeft: "auto", // this sends the button to the end
              backgroundColor: "#0d469b",
              borderRadius: 12,
            }}
          >
            <Text
              style={{
                color: "white",
                paddingVertical: 2,
                paddingHorizontal: 8,
                fontWeight: "bold",
                fontSize: 13,
              }}
            >
              Join
            </Text>
          </Pressable>
        </View>

        {/* CONTENT */}
        <Text style={{ fontWeight: "bold", fontSize: 17, letterSpacing: 0.3 }}>
          {post.title}
        </Text>
        {shouldShowImage && post.image && (
          //   <SupabaseImage
          //     path={post.image}
          //     bucket="images"
          //     style={{ width: "100%", aspectRatio: 4 / 3, borderRadius: 15 }}
          //   />
          <Image
            source={{ uri: post.image }}
            style={{ width: "100%", aspectRatio: 4 / 3, borderRadius: 15 }}
          />
        )}
        {shouldShowDescription && post.description && (
          <Text numberOfLines={isDetailedPost ? undefined : 4}>
            {post.description}
          </Text>
        )}

        {/* FOOTER */}
        <View style={{ flexDirection: "row" }}>
          <View style={{ flexDirection: "row", gap: 10 }}>
            <View style={[{ flexDirection: "row" }, styles.iconBox]}>
              <MaterialCommunityIcons
                // onPress={() => upvote(1)}
                name={isUpvoted ? "arrow-up-bold" : "arrow-up-bold-outline"}
                size={19}
                color={isUpvoted ? "crimson" : "black"}
              />
              <Text
                style={{
                  fontWeight: "500",
                  marginLeft: 5,
                  alignSelf: "center",
                }}
              >
                299{/* {post.upvotes[0].sum || 0} */}
              </Text>
              <View
                style={{
                  width: 1,
                  backgroundColor: "#D4D4D4",
                  height: 14,
                  marginHorizontal: 7,
                  alignSelf: "center",
                }}
              />
              <MaterialCommunityIcons
                // onPress={() => upvote(-1)}
                name={
                  isDownvoted ? "arrow-down-bold" : "arrow-down-bold-outline"
                }
                size={19}
                // color={isDownvoted ? "crimson" : "black"}
              />
            </View>
            <View style={[{ flexDirection: "row" }, styles.iconBox]}>
              <MaterialCommunityIcons
                name="comment-outline"
                size={19}
                color="black"
              />
              <Text
                style={{
                  fontWeight: "500",
                  marginLeft: 5,
                  alignSelf: "center",
                }}
              >
                14{/* {post.nr_of_comments?.[0].count} */}
              </Text>
            </View>
          </View>
          <View style={{ marginLeft: "auto", flexDirection: "row", gap: 10 }}>
            <MaterialCommunityIcons
              name="trophy-outline"
              size={19}
              color="black"
              style={styles.iconBox}
            />
            <MaterialCommunityIcons
              name="share-outline"
              size={19}
              color="black"
              style={styles.iconBox}
            />
          </View>
        </View>
      </Pressable>
    </Link>
  );
};

export default PostListItem;

const styles = StyleSheet.create({
  iconBox: {
    borderWidth: 0.5,
    borderColor: "#D4D4D4",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
});
