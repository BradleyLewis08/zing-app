import React, {useContext, useState, useEffect} from 'react'
import {View, StyleSheet} from 'react-native'
import { firebase } from '../../firebase/config' 
import {ListItem} from 'react-native-elements'
import { USER_COLLECTION_REF } from '../../db'
import {UserContext} from '../../navigation/UserProvider'
import {formCurrencyString} from '../../utils'

const TransactionList = ({}) => {
  const [transactions, setTransactions] = useState([])
  const { currentUser } = useContext(UserContext)
  const getUserTransactions = async () => {
      const transactionSnapshot = await firebase.firestore().collection('transactions').where("transactionUsers", "array-contains", currentUser.uid).orderBy("createdAt").get()
      const transactions = transactionSnapshot.docs.map((doc) => {
        if(doc.data().recipient.uid == currentUser.uid) {
          return (
            { 
              ...doc.data(), 
              type: "inbound"
            }
          )
        } else {
          return (
            { 
              ...doc.data(), 
              type: "outbound"
            }
          )
        }
        
      })
      setTransactions(transactions)
      console.log(transactions[0])
    }
  
  useEffect(() => {
      getUserTransactions()
  }, [])
  return (
    <View>
        {
            transactions.map((transaction, i) => transaction.type == "inbound" ? (
                <ListItem key={i} containerStyle={styles.inboundTransaction}>
                    <ListItem.Content containerStyle={styles.listItemContent}>
                        <ListItem.Title style={styles.transactionTitle}>{`${transaction.sender.firstName} paid you`}</ListItem.Title>
                        <ListItem.Subtitle style={{fontFamily:"Montserrat", marginTop: 10}}>{transaction.message}</ListItem.Subtitle>
                        <ListItem.Title style={{alignSelf: "flex-end", fontFamily: "Montserrat"}}>{`+ ${formCurrencyString(transaction.amount)}`}</ListItem.Title>
                    </ListItem.Content>
                </ListItem>
            ) : <ListItem key={i} containerStyle={styles.outboundTransaction}>
            <ListItem.Content containerStyle={styles.listItemContent}>
                <ListItem.Title style={styles.transactionTitle}>{`You paid ${transaction.recipient.username}`}</ListItem.Title>
                <ListItem.Subtitle style={{fontFamily: "Montserrat", marginTop:10}}>{transaction.message}</ListItem.Subtitle>
                <ListItem.Title style={{alignSelf: "flex-end", fontFamily: "Montserrat"}}>{`- ${formCurrencyString(transaction.amount)}`}</ListItem.Title>
            </ListItem.Content>
        </ListItem> )
        }
    </View>
  )
} 
const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignContent: 'center',
      justifyContent: 'center',
  },
  inboundTransaction: {
    marginBottom: 10,
    borderRadius: 15,
    backgroundColor: "#67E0A3",
    width: 350,
    height: 100,
    alignContent: "center",
    alignSelf: "center"
  },
  outboundTransaction: {
    marginBottom: 10,
    borderRadius: 15,
    backgroundColor: "#ffcccb",
    width: 350,
    height: 100,
    alignContent: "center",
    alignSelf: "center"
  },
  listItemContent: {
    alignContent: "center"
  },
  transactionTitle: {
    fontSize: 14,
    fontFamily:"MontserratBold",
    marginTop: 10,
  }
})
export default TransactionList