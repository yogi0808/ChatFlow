import React, { useCallback, useState } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { View, Text, StyleSheet, FlatList } from "react-native"
import {
  collection,
  endAt,
  getDocs,
  orderBy,
  query,
  startAt,
} from "firebase/firestore"

// Files
import { db } from "../../firebase"
import { debounce } from "../../utils/healper"
import { colors, EmptyText } from "../../constants"
import SearchInput from "../../components/SearchInput"
import AddFriendTile from "../../components/AddFriendTile"

const AddFriendScreen = () => {
  const [users, setUsers] = useState([])

  const searchUsers = useCallback(
    debounce(async (searchTerm) => {
      if (searchTerm.trim() === "") return setUsers([])

      try {
        const usersRef = collection(db, "users")

        // const q = query(usersRef, where("username", "==", searchTerm.trim()))
        const q = query(
          usersRef,
          orderBy("username"),
          startAt(searchTerm),
          endAt(searchTerm + "\uf8ff")
        )

        const querySnapshot = await getDocs(q)

        const usersData = []

        if (querySnapshot.docs.length < 1) {
          return setUsers([])
        }

        querySnapshot.forEach((doc) => {
          usersData.push(doc.data())
        })

        setUsers(usersData)
      } catch (error) {
        console.error("Error searching users: ", error)
      }
    }, 300),
    []
  )

  const onChange = (text) => {
    searchUsers(text)
  }

  return (
    <SafeAreaView style={{ height: "100%", backgroundColor: colors.secondary }}>
      <View style={{ paddingHorizontal: 10 }}>
        <Text style={styles.titleText}>Add a New Friend</Text>
        <SearchInput
          onChange={onChange}
          onSubmit={(t) => searchUsers(t.nativeEvent.text)}
        />
      </View>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={(user) => <AddFriendTile user={user.item} />}
        ListEmptyComponent={() => (
          <Text style={styles.emptyText}>{EmptyText.search}</Text>
        )}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  emptyText: {
    color: "#FFFFFFA1",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "400",
    marginTop: 30,
    paddingHorizontal: 10,
  },
  titleText: {
    color: colors.white,
    fontSize: 32,
    marginVertical: 10,
    fontWeight: "800",
  },
})

export default AddFriendScreen
