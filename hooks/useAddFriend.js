import { useState } from "react"
import { arrayUnion, collection, doc, serverTimestamp, setDoc, updateDoc, } from "firebase/firestore"

// Files
import { auth, db } from "../firebase"

const useAddFriend = () => {
    const [loading, setLoading] = useState(false)

    const addFriend = async (user) => {
        setLoading(true)
        try {
            const chatRef = collection(db, "chats")
            const userChatRef = collection(db, "userchats")

            const newChatRef = doc(chatRef)

            await setDoc(newChatRef, {
                createdAt: serverTimestamp(),
                messages: [],
            })

            await updateDoc(doc(userChatRef, user.id), {
                chats: arrayUnion({
                    chatId: newChatRef.id,
                    lastMessage: "",
                    receiverId: auth.currentUser.uid,
                    updatedAt: new Date(),
                }),
            })

            await updateDoc(doc(userChatRef, auth.currentUser.uid), {
                chats: arrayUnion({
                    chatId: newChatRef.id,
                    lastMessage: "",
                    receiverId: user.id,
                    updatedAt: new Date(),
                }),
            })
        } catch (e) {
            console.log(e)
        } finally {
            setLoading(false)
        }
    }

    return { loading, addFriend }
}

export default useAddFriend
