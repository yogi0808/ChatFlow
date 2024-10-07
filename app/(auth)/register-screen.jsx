import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native"
import { useState } from "react"
import { Link } from "expo-router"
import { Ionicons } from "@expo/vector-icons"
import * as ImagePicker from "expo-image-picker"
import { SafeAreaView } from "react-native-safe-area-context"

// Files
import { colors } from "../../constants"
import useAuthHook from "../../hooks/useAuthHook"
import InputField from "../../components/InputField"
import CustomButton from "../../components/CustomButton"

const RegisterScreen = () => {
  const [form, setForm] = useState({
    avatar: null,
    username: "",
    email: "",
    password: "",
  })

  // Function for get profile photo from gallery
  const openPicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    })

    if (!result.canceled) {
      setForm({ ...form, avatar: result.assets[0] })
    }
  }

  const { loading, register } = useAuthHook()

  return (
    <SafeAreaView style={{ height: "100%", backgroundColor: colors.secondary }}>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.titleText}>Register</Text>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={openPicker}
            style={styles.imgContainer}
          >
            {form.avatar ? (
              <Image
                source={{ uri: form.avatar.uri }}
                style={{ width: 100, height: 100 }}
                resizeMode="contain"
              />
            ) : (
              <Ionicons
                name="person"
                size={50}
                color={colors.white}
              />
            )}
          </TouchableOpacity>
          <InputField
            title="Username"
            value={form.username}
            textChange={(t) => setForm({ ...form, username: t })}
            placeholder="Enter your username."
          />
          <InputField
            title="E-mail"
            value={form.email}
            textChange={(t) => setForm({ ...form, email: t })}
            placeholder="Enter your e-mail."
          />
          <InputField
            title="Password"
            value={form.password}
            textChange={(t) => setForm({ ...form, password: t })}
            placeholder="Enter your password."
          />
          <Text style={styles.text}>
            Already have an Account{" "}
            <Link
              href="/login-screen"
              style={{ color: colors.primary }}
            >
              Login.
            </Link>
          </Text>
          <CustomButton
            text="Register"
            containerStyles={{ marginTop: 50 }}
            onPress={() => register(form)}
            loading={loading}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    gap: 15,
    paddingTop: 100,
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
  titleText: {
    fontSize: 50,
    marginBottom: 20,
    color: colors.white,
    fontWeight: "800",
  },
  text: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "500",
  },
})

export default RegisterScreen
