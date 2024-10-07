import { useState } from "react"
import { Link } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"
import { View, Text, StyleSheet, ScrollView } from "react-native"

// Files
import { colors } from "../../constants"
import useAuthHook from "../../hooks/useAuthHook"
import InputField from "../../components/InputField"
import CustomButton from "../../components/CustomButton"

const LoginScreen = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  })

  const { loading, login } = useAuthHook()

  return (
    <SafeAreaView style={{ height: "100%", backgroundColor: colors.secondary }}>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.titleText}>Login</Text>
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
            Don't have an Account{" "}
            <Link
              href="/register-screen"
              style={{ color: colors.primary }}
            >
              Register.
            </Link>
          </Text>
          <CustomButton
            text="Login"
            containerStyles={{ marginTop: 50 }}
            onPress={() => login(form)}
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

export default LoginScreen
