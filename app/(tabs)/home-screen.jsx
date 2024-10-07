import { router } from "expo-router"
import { doc, getDoc, onSnapshot } from "firebase/firestore"
import { SafeAreaView } from "react-native-safe-area-context"
import React, { useCallback, useEffect, useState } from "react"
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native"

// Files
import { debounce } from "../../utils/healper"
import { auth, db } from "../../firebase"
import ChatTile from "../../components/ChatTile"
import { colors, EmptyText } from "../../constants"
import SearchInput from "../../components/SearchInput"
import CustomButton from "../../components/CustomButton"

const HomeScreen = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [filteredData, setFilteredData] = useState([])

  const search = useCallback(
    debounce((text) => {
      if (text.trim() === "") {
        setFilteredData(data)
        return
      }
      const filtered = data.filter((item) =>
        item.user.username.toLowerCase().startsWith(text.toLowerCase())
      )
      setFilteredData(filtered)
    }, 300),
    []
  )

  const onChange = (text) => {
    search(text)
  }

  useEffect(() => {
    const unSub = onSnapshot(
      doc(db, "userchats", auth.currentUser.uid),
      async (res) => {
        try {
          const items = res.data()?.chats
          const promises = items.map(async (item) => {
            const userDocRef = doc(db, "users", item.receiverId)
            const userDocSnap = await getDoc(userDocRef)

            const userSnap = userDocSnap.data()

            return { ...item, user: userSnap }
          })

          const chatData = await Promise.all(promises)
          setData(chatData.sort((a, b) => b.updatedAt - a.updatedAt))
        } catch (e) {
          console.log(e.message)
        } finally {
          setLoading(false)
        }
      }
    )
    return () => unSub()
  }, [])

  return (
    <SafeAreaView style={{ height: "100%", backgroundColor: colors.secondary }}>
      <View style={{ paddingHorizontal: 10 }}>
        <Text style={styles.titleText}>Chat Flow</Text>
        <SearchInput onChange={onChange} />
      </View>
      {loading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator
            size={70}
            color={colors.white}
          />
        </View>
      ) : (
        <FlatList
          data={filteredData.length < 1 ? data : filteredData}
          keyExtractor={(item) => item.chatId}
          renderItem={(item) => <ChatTile chat={item.item} />}
          ListEmptyComponent={() => (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>{EmptyText.chat}</Text>
              <CustomButton
                text="Add friends"
                onPress={() => router.push("/add-friend-screen")}
              />
            </View>
          )}
        />
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  titleText: {
    fontSize: 32,
    fontWeight: "800",
    marginVertical: 10,
    color: colors.white,
  },
  emptyContainer: {
    gap: 100,
    marginVertical: "40%",
    paddingHorizontal: 10,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "400",
    color: "#FFFFFFA1",
    textAlign: "center",
  },
})

export default HomeScreen
