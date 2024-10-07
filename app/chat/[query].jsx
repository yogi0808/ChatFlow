import React, { useEffect, useState } from "react"
import {
  FlatList,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
  Text,
} from "react-native"
import { colors } from "../../constants"
import { doc, onSnapshot } from "firebase/firestore"
import { Stack, useLocalSearchParams } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"

// Files
import { db } from "../../firebase"
import InputField from "../../components/InputField"
import ChatHeader from "../../components/ChatHeader"
import MessageTile from "../../components/MessageTile"
import useSendMessage from "../../hooks/useSendMessage"
import CustomButton from "../../components/CustomButton"

const Chat = () => {
  const { query } = useLocalSearchParams()

  const { loading, sendMessage } = useSendMessage()

  const chatId = query.split("-")[0]
  const receiverId = query.split("-")[1]

  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState("")

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", query.split("-")[0]), (res) => {
      const messages = res.data().messages

      setMessages(messages.sort((a, b) => b.createdAt - a.createdAt))
    })

    return () => unSub()
  }, [])

  const handleSend = async () => {
    await sendMessage(newMessage, chatId, receiverId)
    setNewMessage("")
  }

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          header: () => <ChatHeader userId={receiverId} />,
        }}
      />
      <FlatList
        data={messages}
        keyExtractor={(item) => item.createdAt}
        renderItem={({ item }) => <MessageTile message={item} />}
        ListEmptyComponent={() => (
          <Text style={styles.emptyText}>
            Send message to start Conversation.
          </Text>
        )}
        contentContainerStyle={{ paddingVertical: 8 }}
        inverted
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={80}
      >
        <View style={styles.inputContainer}>
          <InputField
            value={newMessage}
            onSubmit={handleSend}
            textChange={setNewMessage}
            editable={loading}
            placeholder="Type a message"
          />
          <CustomButton
            onPress={handleSend}
            loading={loading}
            icon="send"
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary,
    paddingHorizontal: 10,
  },
  inputContainer: {
    gap: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 5,
    paddingVertical: 15,
  },
  emptyText: {
    color: "#FFFFFFA1",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "400",
    marginBottom: 30,
    paddingHorizontal: 10,
    transform: [{ rotate: "180deg" }],
  },
})

export default Chat
