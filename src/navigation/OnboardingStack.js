import React from "react"
import {createStackNavigator} from "@react-navigation/stack"
import SignupScreen from "../screens/SignupScreen"
const Stack = createStackNavigator()


const OnboardingStack = ({navigation}) => {
    return (
        <Stack.Navigator initialRouteName="signUp">
            <Stack.Screen name="signUp" component={SignupScreen}></Stack.Screen>
            <Stack.Screen name="UsernameEntry" component={UsernameEntry}></Stack.Screen>
            <Stack.Screen name="NameEntry" component={NameEntry}></Stack.Screen>
        </Stack.Navigator>
    )
}

export default OnboardingStack