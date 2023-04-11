import { View, Text, Image } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import Home from "../src/Home";
import Sports from "../src/Sports";
import Entertainment from "../src/Entertainment";
import Search from "../src/Search";

export default function Navigation() {
  const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "black",
          tabBarInactiveTintColor: "black",
        }}
      >
        <Tab.Screen
          name="Headlines"
          component={Home}
          options={{
            tabBarIcon: ({ color }) => (
              <Ionicons name="md-newspaper" size={24} color="black" />
            ),
          }}
        />
        <Tab.Screen
          name="IPL"
          component={Sports}
          options={{
            tabBarIcon: ({ color }) => (
              <Image
                source={require("../assets/ipl.jpg")}
                style={{ height: 30, width: 30, borderRadius: 20 }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Entertainment"
          component={Entertainment}
          options={{
            tabBarIcon: ({ color }) => (
              <Feather name="tv" size={24} color="black" />
            ),
          }}
        />
        <Tab.Screen
          name="Search"
          component={Search}
          options={{
            tabBarIcon: ({ color }) => (
              <FontAwesome5 name="search" size={24} color="black" />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
