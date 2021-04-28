import React, {useMemo, useState, useContext} from 'react'
import { View, Text, StyleSheet } from 'react-native'
import StripeContext from '../../navigation/StripeProvider'
import Button from '../../tipsi/components/Button'
import stripe from 'tipsi-stripe'

const CardFormScreen = () => {
  stripe.setOptions({
    publishableKey: 'pk_test_iuRP76gOvAKecoDW94ZcVQNw00UW51q2CS'
  })
  const [loading, setLoading] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState(null)

  const handleCardPayPress = async () => {
    try {
      setLoading(true)
      setPaymentMethod(null)
      const paymentMethodFromStripe = await stripe.paymentRequestWithCardForm(null)

      setLoading(false)
      setPaymentMethod(paymentMethodFromStripe)
    } catch (error) {
      setLoading(false)
    }
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Card Form Example</Text>
        <Text style={styles.instruction}>Click button to show Card Form dialog.</Text>
        <Button
          text="Enter your card and pay"
          loading={loading}
          onPress={handleCardPayPress}
        />
        <View style={styles.paymentMethod}>
          {paymentMethod && (
            <Text style={styles.instruction}>Payment Method: {JSON.stringify(paymentMethod)}</Text>
          )}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instruction: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  paymentMethod: {
    height: 20,
  },
})

export default CardFormScreen