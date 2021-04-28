import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from '@react-navigation/stack'
import LoginScreen from '../screens/LoginScreen'
import SignupScreen from '../screens/SignupScreen'
import OnboardingStack from './OnboardingStack'

const Stack = createStackNavigator()

const AuthStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{header: () => null}}
            />
            <Stack.Screen 
                name="Signup"
                component={SignupScreen}
                options={{header: () => null}}
            />
        </Stack.Navigator>
    )
}

export default AuthStack



