import React from "react"
import {createStackNavigator} from "@react-navigation/stack"
import SendScreen from "../screens/SendScreen"
import ProfileScreen from "../screens/ProfileScreen"
import AddRecipientScreen from "../screens/AddRecipientScreen"
import UserList from '../components/UserList'
const Stack = createStackNavigator()
const PaymentStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen component={ProfileScreen} name="Profile" options={{header: () => null}}></Stack.Screen>
            <Stack.Screen component={AddRecipientScreen} name="Add Recipients"></Stack.Screen>
            <Stack.Screen component={SendScreen} name="Send"></Stack.Screen>
        </Stack.Navigator>
    )
}

export default PaymentStack