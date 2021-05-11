import React, {useContext, useCallback, useState, useEffect} from 'react'
import {View, StyleSheet} from 'react-native'
import {ListItem} from 'react-native-elements'
import {UserContext} from '../../navigation/UserProvider'
import {getPaymentMethods} from '../../utils/callableFunctions'
const PaymentMethodsList = ({}) => {
    const {currentUser} = useContext(UserContext)
    const fetchPaymentMethods = useCallback(async () => {
        const paymentMethodsFromServer = await getPaymentMethods(currentUser.uid)
    })
    const [paymentMethods, setPaymentMethods] = useState(null)
    useEffect(() =>{
        
    }, [])
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
export default PaymentMethodsList