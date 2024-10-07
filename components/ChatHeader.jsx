import { useState, useEffect } from "react"
import { router } from "expo-router"
import { Ionicons } from "@expo/vector-icons"
import { doc, getDoc } from "firebase/firestore"
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native"

// Files
import { colors } from "../constants"
import { db } from "../firebase"

const ChatHeader = ({ userId }) => {
  const [user, setUser] = useState()

  useEffect(() => {
    const getUser = async () => {
      try {
        const userDocRef = doc(db, "users", userId)
        const userDocSnap = await getDoc(userDocRef)

        setUser(userDocSnap.data())
      } catch (e) {
        console.log(e)
      }
    }

    getUser()
  }, [])
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => router.back()}
      >
        <Ionicons
          name="arrow-back"
          size={30}
          color={colors.white}
        />
      </TouchableOpacity>
      <View style={styles.headerImg}>
        <Image
          source={{ uri: user?.avatar }}
          style={{ height: 50, width: "100%" }}
          resizeMode="contain"
        />
      </View>
      <Text
        style={styles.headerTitle}
        numberOfLines={1}
      >
        {user?.username}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: colors.secondary,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 30,
    gap: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "800",
    textTransform: "capitalize",
    color: colors.white,
  },
  headerImg: {
    overflow: "hidden",
    width: 50,
    borderRadius: 50,
    aspectRatio: "1/1",
  },
})

export default ChatHeader
