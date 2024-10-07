import React from "react"
import { Ionicons } from "@expo/vector-icons"
import { View, TextInput, StyleSheet } from "react-native"

// Files
import { colors } from "../constants"

const SearchInput = ({ value, onChange, onSubmit }) => {
  return (
    <View style={styles.container}>
      <Ionicons
        name="search-outline"
        size={24}
        color={colors.white}
      />
      <TextInput
        style={styles.input}
        placeholder="Search..."
        value={value}
        onChangeText={onChange}
        onSubmitEditing={onSubmit}
        placeholderTextColor="#ffffffa1"
        cursorColor="#ffffffcc"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    flexDirection: "row",
    backgroundColor: "#ffffff1a",
    alignItems: "center",
    paddingHorizontal: 12,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#ffffffcc",
    gap: 5,
  },
  input: {
    fontSize: 16,
    fontWeight: "500",
    flex: 1,
    paddingVertical: 8,
    color: colors.white,
  },
})

export default SearchInput
