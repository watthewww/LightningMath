import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from '../screens/HomeScreen'
import GameScreen from '../screens/GameScreen'
import EndScreen from '../screens/EndScreen'


const Stack = createNativeStackNavigator();
export default function Navigate() {
    return (
    <NavigationContainer>
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                gestureEnabled: false,
            }}
        >
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Game" component={GameScreen} />
            <Stack.Screen name="End" component={EndScreen} />
        </Stack.Navigator>
    </NavigationContainer>
    )
}