import React from "react"
import { View, Text, StyleSheet } from "react-native"

// Files
import { auth } from "../firebase"
import { formatDateTime } from "../utils/healper"
import { colors } from "../constants"

const MessageTile = ({ message }) => {
  return (
    <View
      style={[
        styles.messageContainer,
        message.senderId === auth.currentUser.uid
          ? styles.myMessage
          : styles.otherMessage,
      ]}
    >
      <Text style={styles.messageText}>{message.text}</Text>
      <Text
        style={{
          alignSelf: "flex-end",
          fontSize: 12,
          color: "#ffffff80",
        }}
      >
        {formatDateTime(message.createdAt)}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  messageContainer: {
    maxWidth: "80%",
    paddingVertical: 5,
    paddingHorizontal: 8,
    marginVertical: 5,
    borderRadius: 10,
  },
  myMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#10a37F99",
  },
  otherMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#20212380",
  },
  messageText: {
    fontSize: 16,
    color: colors.white,
  },
})

export default MessageTile
