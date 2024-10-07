import { useState } from "react"
import { router } from "expo-router"
import { Alert } from "react-native"
import { doc, setDoc } from "firebase/firestore"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth"

// Files
import { auth, db } from "../firebase"
import { uploadImage } from "../utils/healper"

const useAuthHook = () => {
    const [loading, setLoading] = useState(false)

    const register = async (form) => {
        setLoading(true)
        try {
            const avatarUir = await uploadImage(form.avatar.uri)

            const res = await createUserWithEmailAndPassword(
                auth,
                form.email,
                form.password
            )

            const userRef = doc(db, "users", res.user.uid)
            const userChatRef = doc(db, "userchats", res.user.uid)

            await setDoc(userRef, {
                id: res.user.uid,
                avatar: avatarUir,
                username: form.username,
                email: form.email,
            })

            await setDoc(userChatRef, {
                chats: [],
            })

            router.replace("home-screen")
        } catch (e) {
            Alert.alert("Error", e.message)
            console.error("Error signing up:", e.code, e.message)
        } finally {
            setLoading(false)
        }
    }

    const login = async (form) => {
        setLoading(true)
        try {
            const res = await signInWithEmailAndPassword(
                auth,
                form.email,
                form.password
            )

            if (res.user) {
                router.replace("home-screen")
            }
        } catch (e) {
            Alert.alert("Error", e.message)
            console.error("Error signing up:", e.code, e.message)
        } finally {
            setLoading(false)
        }
    }

    const logout = () => {
        Alert.alert("Logout Confirmation", "Are you sure you want to logout?", [
            {
                text: "Cancel",
                style: "cancel", // This will make the cancel button have a cancel style
            },
            {
                text: "Logout",
                onPress: async () => {
                    setLoading(true)
                    try {
                        await signOut(auth)
                        router.replace("login-screen")
                    } catch (error) {
                        console.error("Error signing out:", error)
                    } finally {
                        setLoading(false)
                    }
                },
            },
        ])
    }

    return { loading, register, login, logout }
}

export default useAuthHook