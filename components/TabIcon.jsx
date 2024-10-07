import React from "react"
import { Ionicons } from "@expo/vector-icons"
import { View, Text, StyleSheet } from "react-native"

const TabIcon = ({ color, title, icon }) => {
  return (
    <View style={styles.container}>
      <Ionicons
        name={icon}
        size={24}
        color={color}
      />
      <Text style={{ color, fontWeight: "500" }}>{title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
})

export default TabIcon
