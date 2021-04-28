import React from 'react'
import {View, StyleSheet} from 'react-native'
import {UserContext} from '../../navigation/UserProvider'
 
const TransactionsScreen = ({navigation}) => {
  return (
    <View style={styles.container}></View>
  )
} 
const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignContent: 'center',
      justifyContent: 'center',
  }
})
export default TransactionsScreen