import React from "react"
import { Tabs } from "expo-router"
import { StatusBar } from "expo-status-bar"

// Files
import { colors } from "../../constants"
import TabIcon from "../../components/TabIcon"

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#ffffff",
          tabBarInactiveTintColor: "#ffffff4d",
          tabBarStyle: {
            height: 84,
            borderTopWidth: 1,
            borderTopColor: "#ffffff1a",
            backgroundColor: colors.secondary,
          },
        }}
      >
        <Tabs.Screen
          name="home-screen"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <TabIcon
                icon="chatbox-ellipses-outline"
                color={color}
                title="Chats"
              />
            ),
          }}
        />
        <Tabs.Screen
          name="add-friend-screen"
          options={{
            title: "Add Friends",
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <TabIcon
                icon="person-add-outline"
                color={color}
                title="Add Friends"
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profile-screen"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <TabIcon
                icon="person-circle-outline"
                color={color}
                title="Profile"
              />
            ),
          }}
        />
      </Tabs>
      <StatusBar
        backgroundColor={colors.secondary}
        style="light"
      />
    </>
  )
}

export default TabsLayout
