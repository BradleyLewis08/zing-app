import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen'
import PaymentStack from '../navigation/PaymentStack'
import SendScreen from '../screens/SendScreen'
import ManageScreen from '../screens/ManageScreen'
import AddCardScreen from '../screens/AddCardScreen'
// import TransactionScreen from '../screens/ManageScreen'

const Tab = createBottomTabNavigator()
const AppStack = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen component={HomeScreen} name="Home" options={{header: () => null}} />
            <Tab.Screen component={PaymentStack} name="Profile" options={{header: () => null}} />
            <Tab.Screen component={AddCardScreen} name="Add Card" options={{header: () => null}} />
        </Tab.Navigator>
    )
}

export default AppStack
