import React, {useState,useContext} from 'react'
import {View, StyleSheet} from 'react-native'
import {Button} from 'react-native-elements' 
import {getPaymentMethods} from '../../utils/callableFunctions'
import {UserContext} from '../../navigation/UserProvider'
import DropDownPicker from 'react-native-dropdown-picker'

const PaymentMethodsScreen = ({navigation}) => {
  const {currentUser} = useContext(UserContext)
  const[items, setItems] = useState([
    {label: 'Apple', value:'apple'}
  ])
  const [open, setOpen] = useState(false)
  const getPaymentMethodsFromServer = async () => {
    const payload = {
      userId: currentUser.uid
    }
    const response = await getPaymentMethods(payload)
  }
  return (
    <View style={styles.container}>
      <Button title="Get Payment Methods" onPress={() => getPaymentMethodsFromServer()}/>
      <DropDownPicker searchable={false} setOpen={setOpen} open={open} items={items}/>
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
export default PaymentMethodsScreen