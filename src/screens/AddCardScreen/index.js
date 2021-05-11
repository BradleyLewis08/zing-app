import React, {useEffect, useState, useContext} from 'react'
import {View, StyleSheet} from 'react-native'
import {Button} from 'react-native-elements'
import {CreditCardInput} from 'react-native-credit-card-input' 
import axios from 'axios'
import {firebase} from '../../../firebase/config'
import {saveNewCard} from '../../utils/callableFunctions' 
import {UserContext} from '../../navigation/UserProvider'
import Toast from 'react-native-toast-message'
import {capitalize} from '../../utils'
const AddCardScreen = ({}) => { 
  //const createPaymentMethodFunction = firebase.functions().httpsCallable('createPaymentMethod')
  const [cardForm, setCardForm] = useState()
  const [canSubmit, setCanSubmit] = useState(false)
  const {currentUser} = useContext(UserContext)
  const formatCardFormData = () => {
    const dates = cardForm["values"]["expiry"].split("/")
    const expiryMonth = dates[0]
    const expiryYear = dates[1]
    return {
        cardNumber: cardForm["values"]["number"],
        expiryMonth,
        expiryYear,
        cvc: cardForm["values"]["cvc"],
    }
  }
  const showToast = (message, status) => {
    Toast.show({
      text1: capitalize(status),
      text2: message,
      topoffset: 50,
      type: status
    })
  }
  const processCard = async () => {
      const cardDetails = formatCardFormData()
      const payload = {
        userId: currentUser.uid,
        card: cardDetails
      }
      const saveCardResults = await saveNewCard(payload)
      console.log(saveCardResults)
      const message = "error" in saveCardResults.data ? "Something went wrong" : "Card saved successfully"
      const status = "error" in saveCardResults.data ? "error" : "success"
      showToast(message, status)
  }
  const handleChange = (form) => {
      if(form["valid"]){
          setCardForm(form)
          setCanSubmit(true)
      } else {
          setCanSubmit(false)
      }
  }
  return (
    <View style={styles.container}>
        <CreditCardInput onChange={handleChange}/>
        <Button disabled={!canSubmit} title="Add Card" style={{marginTop: 20}} onPress={() => processCard()}></Button>
    </View>
  )
} 
const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignContent: 'center',
      justifyContent: 'center',
  }
})
export default AddCardScreen