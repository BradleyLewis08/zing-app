import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import ManageStack from './ManageStack'
import PaymentStack from './PaymentStack'
import ProfileScreen from '../screens/ProfileScreen'
import LogoutScreen from '../screens/LogoutScreen'

const HomeStack = () => {
  const Stack = createStackNavigator()
    return (
        <Stack.Navigator>
            <Stack.Screen component={ProfileScreen} name="Profile" options={{header: () => null}} />
            <Stack.Screen component={PaymentStack} name="New Payment" />
            <Stack.Screen component={ManageStack} name="Manage" />
            <Stack.Screen component={LogoutScreen} name="Logout" /> 
        </Stack.Navigator>    
    )
} 
export default HomeStack