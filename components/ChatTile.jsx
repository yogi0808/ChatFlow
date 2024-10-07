import React from "react"
import { router } from "expo-router"
import { Ionicons } from "@expo/vector-icons"
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native"

// Files
import { colors } from "../constants"
import { formatDateTime } from "../utils/healper"

const ChatTile = ({ chat }) => {
  return (
    <TouchableOpacity
      onPress={() => router.push(`chat/${chat.chatId}-${chat.receiverId}`)}
      style={styles.main}
    >
      <View style={styles.imgContainer}>
        {chat.user.avatar ? (
          <Image
            source={{ uri: chat.user.avatar }}
            style={{ height: 60, width: 60 }}
            resizeMode="contain"
          />
        ) : (
          <Ionicons
            name="person"
            size={30}
            color={colors.white}
          />
        )}
      </View>
      <View style={styles.container}>
        <Text
          style={styles.title}
          numberOfLines={1}
        >
          {chat.user.username}
        </Text>
        <View style={styles.textContainer}>
          <Text
            style={{ color: "#ffffff80" }}
            numberOfLines={1}
          >
            {chat.lastMessage}
          </Text>
          <Text style={{ color: "#ccc" }}>
            {formatDateTime(chat.updatedAt)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    width: "100%",
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: "row",
    gap: 16,
  },
  container: {
    flex: 1,
    gap: 5,
  },
  textContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "500",
  },
  imgContainer: {
    backgroundColor: colors.secondary2,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    aspectRatio: "1/1",
    borderRadius: 50,
  },
})

export default ChatTile
