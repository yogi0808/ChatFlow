import {
  Text,
  TouchableOpacity,
  StyleSheet,
  TouchableNativeFeedback,
  ActivityIndicator,
} from "react-native"
import React from "react"
import { colors } from "../constants"
import { Ionicons } from "@expo/vector-icons"

const CustomButton = ({
  text,
  wFull,
  sm,
  containerStyles,
  onPress,
  disabled,
  loading,
  icon,
}) => {
  const styles = StyleSheet.create({
    container: {
      width: wFull ? "100%" : "auto",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.primary,
      paddingHorizontal: sm ? 14 : 24,
      paddingVertical: sm ? 8 : 12,
      borderRadius: 8,
      ...containerStyles,
    },
    text: {
      color: colors.white,
      textTransform: "capitalize",
      fontWeight: sm ? "600" : "800",
      fontSize: sm ? 14 : 18,
    },
  })

  return (
    <TouchableOpacity
      background={TouchableNativeFeedback.Ripple("#ffffffa1")}
      activeOpacity={0.7}
      onPress={onPress}
      disabled={loading || disabled}
      style={styles.container}
    >
      {loading ? (
        <ActivityIndicator
          color={colors.white}
          size={24}
        />
      ) : icon ? (
        <Ionicons
          name={icon}
          size={sm ? 14 : 18}
          color={colors.white}
        />
      ) : (
        <Text style={styles.text}>{text}</Text>
      )}
    </TouchableOpacity>
  )
}

export default CustomButton
