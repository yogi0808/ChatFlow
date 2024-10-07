import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { doc, getDoc } from "firebase/firestore"
import React, { useEffect, useState } from "react"
import { SafeAreaView } from "react-native-safe-area-context"

// Files
import { colors } from "../../constants"
import { auth, db } from "../../firebase"
import useAuthHook from "../../hooks/useAuthHook"

const ProfileScreen = () => {
  const [user, setUser] = useState(null)
  const { loading, logout } = useAuthHook()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, "users", auth.currentUser.uid)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
          setUser(docSnap.data())
        } else {
          console.log("No such document!")
        }
      } catch (e) {
        console.error("Error fetching document: ", e)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <SafeAreaView
      style={{
        height: "100%",
        paddingHorizontal: 10,
        backgroundColor: colors.secondary,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={styles.titleText}>Profile</Text>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={logout}
        >
          {loading ? (
            <ActivityIndicator
              color={colors.white}
              size={30}
            />
          ) : (
            <Ionicons
              name="log-out-outline"
              size={32}
              color={colors.white}
            />
          )}
        </TouchableOpacity>
      </View>
      {isLoading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator
            size={70}
            color={colors.white}
          />
        </View>
      ) : (
        <View style={styles.main}>
          <View style={styles.imgContainer}>
            {user?.avatar ? (
              <Image
                source={{ uri: user?.avatar }}
                style={{ height: 100, width: 100 }}
                resizeMode="contain"
              />
            ) : (
              <Ionicons
                name="person"
                size={50}
                color={colors.white}
              />
            )}
          </View>
          <Text style={styles.userText}>{user?.username}</Text>
        </View>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  titleText: {
    color: colors.white,
    fontSize: 32,
    marginVertical: 10,
    fontWeight: "800",
  },
  main: {
    alignItems: "center",
  },
  userText: {
    color: colors.white,
    fontSize: 24,
    marginVertical: 10,
    fontWeight: "500",
  },
  imgContainer: {
    backgroundColor: colors.secondary2,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    aspectRatio: "1/1",
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#ffffffcc",
  },
})

export default ProfileScreen
