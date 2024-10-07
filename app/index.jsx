import { router } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"
import { Image, ScrollView, StyleSheet, Text } from "react-native"

// Files
import { colors, onBoardingText } from "../constants"
import CustomButton from "../components/CustomButton"
import Logo from "../assets/images/adaptive-icon.png"

const onBoardingScreen = () => {
  return (
    <SafeAreaView style={{ height: "100%", backgroundColor: colors.secondary }}>
      <ScrollView style={styles.main}>
        <Image
          source={Logo}
          style={styles.img}
          resizeMode="contain"
        />
        <Text style={styles.titleText}>{onBoardingText.title}</Text>
        <Text style={styles.subtitleText}>{onBoardingText.subTitle}</Text>
        <CustomButton
          text="continue with authentication"
          onPress={() => router.replace("login-screen")}
          containerStyles={{ marginTop: 250 }}
        />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  main: {
    paddingHorizontal: 10,
  },
  container: {
    flexDirection: "row",
    width: "100%",
  },
  img: {
    width: 150,
    height: 150,
  },
  titleText: {
    fontSize: 50,
    color: colors.white,
    fontWeight: "800",
  },
  subtitleText: {
    fontSize: 18,
    marginTop: 70,
    color: colors.white,
    fontWeight: "400",
  },
})

export default onBoardingScreen
