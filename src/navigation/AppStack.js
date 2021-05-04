import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen'
import PaymentStack from '../navigation/PaymentStack'
import SendScreen from '../screens/SendScreen'
import AddCardScreen from '../screens/AddCardScreen'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

// import TransactionScreen from '../screens/ManageScreen'

const Tab = createMaterialBottomTabNavigator()
const AppStack = () => {
    return (
        <Tab.Navigator barStyle={{ backgroundColor: '#3455AE' }}>
            <Tab.Screen component={HomeScreen} name="Home" options={{header: () => null}} />
            <Tab.Screen component={PaymentStack} name="Profile" options={{header: () => null}} />
            <Tab.Screen component={AddCardScreen} name="Add Card" options={{header: () => null}} />
        </Tab.Navigator>
    )
}

export default AppStack
