import React, {useState} from 'react'
import {View, StyleSheet} from 'react-native'
import {Button} from 'react-native-elements'
import {CreditCardInput} from 'react-native-credit-card-input' 
import axios from 'axios'
import {firebase} from '../../firebase/config'
import {createPaymentMethodFunction} from '../../utils/callableFunctions'
import {createCardToken} from '../../utils/stripe'

const AddCardScreen = ({}) => { 
  //const createPaymentMethodFunction = firebase.functions().httpsCallable('createPaymentMethod')
  const [cardForm, setCardForm] = useState()
  const [canSubmit, setCanSubmit] = useState(false)


  const formatCardFormData = () => {
    const dates = cardForm["values"]["expiry"].split("/")
    const expiryMonth = dates[0]
    const expiryYear = dates[1]
    return {
        cardNumber: cardForm["values"]["number"],
        expiryMonth,
        expiryYear,
        cvc: cardForm["values"]["cvc"],
        brand: "visa"
    }
  }

  const createPaymentMethod = async () => {
      const cardDetails = formatCardFormData()
      const token = await createCardToken(payload)
      console.log(token)
      // const response = await createPaymentMethodFunction({data: payload})
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
        <Button disabled={!canSubmit} title="Add Card" style={{marginTop: 20}} onPress={() => createPaymentMethod()}></Button>
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