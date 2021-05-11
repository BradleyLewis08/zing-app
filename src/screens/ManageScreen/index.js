import React, {useContext} from 'react'
import {View, StyleSheet, Text, SafeAreaView, ScrollView} from 'react-native'
import TransactionList from '../../components/TransactionList'
import {UserContext} from '../../navigation/UserProvider'
import {formCurrencyString} from '../../utils'

const ManageScreen = ({navigation}) => {
  const {currentUser} = useContext(UserContext)
  return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.amount}>{formCurrencyString(currentUser.balance)}</Text>
        </View>
        <ScrollView style={styles.scrollView}>
          <View style={styles.transactions}>
              <Text style={styles.heading}>Your Zings</Text>
              <TransactionList />
          </View>
        </ScrollView>
      </SafeAreaView>    
  )
} 
const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignContent: 'center',
      backgroundColor: "#fff"
  },
  header: {
    width: "100%",
    height: "30%",
    backgroundColor: "#274C77",
    justifyContent: "center",
    alignContent: "center",
  },
  amount: {
    fontFamily: "Montserrat", 
    fontSize: 40,
    color: "#fff", 
    alignSelf: "center"
  },
  heading: {
    fontFamily: "Montserrat", 
    fontSize: 25,
    color: "black", 
    alignSelf: "flex-start",
    paddingBottom: 10
  },
  transactions: {
    flex: 1,
    height: "100%",
    marginTop: "10%",
    alignSelf: "center",
    width: "90%"
  }
})
export default ManageScreen