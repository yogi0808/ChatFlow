import { router } from "expo-router"
import { Ionicons } from "@expo/vector-icons"
import { doc, getDoc } from "firebase/firestore"
import React, { useEffect, useState } from "react"
import { View, Text, StyleSheet, Image } from "react-native"

// Files
import { colors } from "../constants"
import CustomButton from "./CustomButton"
import { auth, db } from "../firebase"
import useAddFriend from "../hooks/useAddFriend"

const AddFriendTile = ({ user }) => {
  const { loading, addFriend } = useAddFriend()
  const [chat, setChat] = useState(null)
  const [isFriend, setIsFriend] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, "userchats", auth.currentUser.uid)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
          docSnap.data().chats.forEach((item) => {
            if (item.receiverId === user.id) {
              setChat(item)
              setIsFriend(true)
            }
          })
        } else {
          console.log("No such document!")
        }
      } catch (e) {
        console.error("Error fetching document: ", e)
      }
    }

    if (user.id !== auth.currentUser.uid) {
      fetchData()
    }
  }, [isFriend])

  return (
    <View style={styles.main}>
      <View style={styles.imgContainer}>
        {user.avatar ? (
          <Image
            source={{ uri: user.avatar }}
            style={{ width: 60, height: 60 }}
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
      <Text
        style={styles.title}
        numberOfLines={1}
      >
        {user.username}
      </Text>
      {user.id === auth.currentUser.uid ? (
        <CustomButton
          text="It's You"
          disabled={true}
          containerStyles={{ marginLeft: "auto" }}
          sm
        />
      ) : isFriend ? (
        <CustomButton
          text="Message"
          onPress={() => router.push(`chat/${chat.chatId}-${user.id}`)}
          containerStyles={{ marginLeft: "auto" }}
          sm
        />
      ) : (
        <CustomButton
          text="Add to Friend"
          loading={loading}
          onPress={() => addFriend(user)}
          containerStyles={{ marginLeft: "auto" }}
          sm
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    width: "100%",
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  title: {
    color: colors.white,
    fontSize: 20,
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

export default AddFriendTile
