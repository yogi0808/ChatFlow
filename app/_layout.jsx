import { useEffect } from "react"
import { StatusBar } from "expo-status-bar"
import { onAuthStateChanged } from "firebase/auth"
import { router, SplashScreen, Stack } from "expo-router"

// Files
import { colors } from "../constants"
import { auth } from "../firebase"

SplashScreen.preventAutoHideAsync()

const RootLayout = () => {
  useEffect(() => {
    const unSub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        router.replace("home-screen")
        await SplashScreen.hideAsync()
      } else {
        await SplashScreen.hideAsync()
      }
    })

    return () => unSub()
  }, [])

  return (
    <>
      <Stack>
        <Stack.Screen
          name="index"
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="(auth)"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="(tabs)"
          options={{ headerShown: false }}
        />
        <Stack.Screen name="chat/[query]" />
      </Stack>
      <StatusBar
        backgroundColor={colors.secondary}
        style="light"
      />
    </>
  )
}

export default RootLayout
