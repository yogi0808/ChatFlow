import React from "react"
import { Stack } from "expo-router"
import { StatusBar } from "expo-status-bar"

// Files
import { colors } from "../../constants"

const AuthLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="login-screen"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="register-screen"
          options={{ headerShown: false }}
        />
      </Stack>
      <StatusBar
        backgroundColor={colors.secondary}
        style="light"
      />
    </>
  )
}

export default AuthLayout
