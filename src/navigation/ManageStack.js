import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import ManageScreen from '../screens/ManageScreen'

const ManageStack = () => {
  const Stack = createStackNavigator()
  return (
    <Stack.Navigator>
      <Stack.Screen component={ManageScreen} name="Transactions" options={{header: () => null}}/>
    </Stack.Navigator>
  )
} 
export default ManageStack