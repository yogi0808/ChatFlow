import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native"
import React, { useState } from "react"
import { Ionicons } from "@expo/vector-icons"

// Files
import { colors } from "../constants"

const InputField = ({ title, placeholder, value, onSubmit, textChange }) => {
  const [isShow, setIsShow] = useState(false)
  return (
    <View style={styles.wrapper}>
      {title ? <Text style={styles.title}>{title}</Text> : ""}
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          autoCapitalize={title === "E-mail" ? "none" : ""}
          autoComplete={title === "E-mail" ? "email" : ""}
          placeholder={placeholder}
          value={value}
          onChangeText={textChange}
          placeholderTextColor="#ffffffa1"
          onSubmitEditing={onSubmit}
          cursorColor="#ffffffcc"
          secureTextEntry={title === "Password" && !isShow}
        />
        {title === "Password" && (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setIsShow(!isShow)}
          >
            <Ionicons
              name={isShow ? "eye-off-outline" : "eye-outline"}
              size={20}
              color={colors.white}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    gap: 5,
    flex: 1,
  },
  container: {
    flexDirection: "row",
    backgroundColor: "#ffffff1a",
    alignItems: "center",
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#ffffffcc",
  },
  title: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "500",
  },
  input: {
    fontSize: 16,
    fontWeight: "500",
    flex: 1,
    paddingVertical: 8,
    color: colors.white,
  },
})

export default InputField
