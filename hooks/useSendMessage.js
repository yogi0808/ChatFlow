import { arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore'
import { useState } from 'react'
import { auth, db } from '../firebase'

const useSendMessage = () => {
    const [loading, setLoading] = useState(false)

    const sendMessage = async (message, chatId, receiverId) => {
        setLoading(true)
        if (message.trim() === "") return

        try {
            await updateDoc(doc(db, "chats", chatId), {
                messages: arrayUnion({
                    senderId: auth.currentUser.uid,
                    text: message,
                    createdAt: new Date(),
                }),
            })

            const userIDs = [auth.currentUser.uid, receiverId]

            const updateUserChatsPromises = userIDs.map(async (id) => {
                const userChatsRef = doc(db, "userchats", id)
                const userChatsSnapshot = await getDoc(userChatsRef)

                if (userChatsSnapshot.exists()) {
                    const userChatsData = userChatsSnapshot.data()
                    const chatIndex = userChatsData.chats.findIndex(
                        (c) => c.chatId === chatId
                    )

                    if (chatIndex !== -1) {
                        userChatsData.chats[chatIndex] = {
                            ...userChatsData.chats[chatIndex],
                            lastMessage: message,
                            updatedAt: new Date(),
                        }

                        await updateDoc(userChatsRef, {
                            chats: userChatsData.chats,
                        })
                    }
                }
            })

            // Execute all update operations concurrently
            await Promise.all(updateUserChatsPromises)
        } catch (e) {
            console.error("Error sending message:", e)
        } finally {
            setLoading(false)
        }
    }

    return { loading, sendMessage }
}

export default useSendMessage