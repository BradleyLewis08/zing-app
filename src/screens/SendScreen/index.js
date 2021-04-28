import React, { useReducer, useState, useContext } from 'react'
import {TouchableOpacity} from "react-native"
import {View, StyleSheet, Text} from "react-native"
import {Input, Button} from "react-native-elements"
import HeaderText from "../../components/HeaderText"
import NumericInput from "@wwdrew/react-native-numeric-textinput"
import { firebase } from '../../firebase/config'
import {UserContext} from '../../navigation/UserProvider'


const SendScreen = ({route, navigation}) =>  {
    const { currentUser } = useContext(UserContext)

    const getUserData = async (senderRef, recipientRef) => {
        const senderResponse = await senderRef.get()
        const recipientResponse = await recipientRef.get()
        return [senderResponse.data(), recipientResponse.data()]
    }
    const sendFunds = async () => {
        try { 
            const senderUserRef = firebase.firestore().collection('users').doc(currentUser.uid)
            const recipientUserRef = firebase.firestore().collection('users').doc(user.uid)
            const values = await getUserData(senderUserRef, recipientUserRef)
            const senderData = values[0]
            const recipientData = values[1]
            const senderNewBalance = senderData.balance - (amount * 100)
            const recipientNewBalance = recipientData.balance + (amount * 100)
            await senderUserRef.update({
                balance: senderNewBalance
            })
            await recipientUserRef.update({
                balance: recipientNewBalance
            })
            const transactionPayload = {
                amount: amount * 100,
                transactionUsers: [senderData.uid, recipientData.uid],
                recipient: {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    uid: user.uid,
                    username: user.username
                },
                sender: {
                    firstName: currentUser.firstName,
                    lastName: currentUser.lastName,
                    uid: currentUser.uid,
                    username: currentUser.username,
                },
                message: message,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            }
            await firebase.firestore().collection('transactions').add(transactionPayload)
        }
        catch(error) {
            console.log(error)
        }
    }
    const handleSend = async () => {
        await sendFunds()
        navigation.navigate("Profile")
    }
    const { user } = route.params
    const [amount, setAmount] = useState()
    const [message, setMessage] = useState('')
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <HeaderText>Send</HeaderText>
            </View>
            <View style={styles.form}>
                <Text style={{ color:"#3455AE", fontSize: 15, fontFamily:"Montserrat", marginBottom: 5, marginLeft: 50}}>Recipient</Text>
                <View style={styles.recipientField}>
                    <Text style={{ marginLeft: 15, fontFamily: "Montserrat", fontSize: 15}}>{user.username}</Text>
                </View>
                <View style={styles.formInput}>
                    <Text style={{ color:"#3455AE", fontSize: 15, fontFamily:"Montserrat", marginBottom: 5, marginLeft: 50}}>Amount</Text>
                    <NumericInput placeholder="MYR 0.00" style={styles.amountField} type="currency" currency="MYR" value={amount} onUpdate={(value) => setAmount(value)} />
                </View>
                <View style={styles.formInput}>
                    <Text style={{ color:"#3455AE", fontSize: 15, fontFamily:"Montserrat", marginBottom: 5, marginLeft: 50}}>Your Message</Text>
                    <Input style={{fontFamily: "Montserrat", fontSize: 15}} containerStyle={styles.messageField} inputContainerStyle={{borderBottomWidth: 0, fontFamily: "Montserrat"}} value={message} onChangeText={(value) => setMessage(value)} />
                </View>
                <View style={styles.sendButton}>
                    <Button onPress={() => handleSend()} titleStyle={styles.buttonText} buttonStyle={styles.button} title="Send"></Button>
                </View>
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    header: {
        height: 170,
        width: "100%",
        alignContent: "center",
        justifyContent: "center",
        color: "#5271ff",
    },
    form: {
        flex: 1,
    },
    input: {
        width: 300,
        borderWidth: 1,
        borderColor: "#5271ff",
        borderRadius: 70,
        marginBottom: 40,
        height: 50,
        fontSize: 10,
        alignSelf: "center",
        alignContent: "center",
    },
    placeholderText: {
        flex: 1,
        alignContent: "center",
        backgroundColor: "red"
    },
    inputContainer: {
        borderBottomWidth: 0
    },  
    recipientField: {
        borderRadius: 15,
        width: 300,
        height: 50,
        alignSelf: "center",
        borderColor: "#3455AE",
        borderWidth: 1,
        alignContent: "center",
        justifyContent: "center"
    },
    amountField: { 
        borderRadius: 15,
        width: 300,
        height: 50,
        alignSelf: "center",
        borderColor: "#3455AE",
        borderWidth: 1,
        fontFamily: "Montserrat",
        paddingLeft: 10
    },
    messageField: { 
        borderRadius: 15,
        width: 300,
        height: 150,
        alignSelf: "center",
        borderColor: "#3455AE",
        borderWidth: 1,
        fontFamily: "Montserrat",
        paddingLeft: 10,
        paddingTop: 5,
        fontWeight: "normal"
    },
    formInput: {
        marginTop: 20
    },
    button: {
        marginTop: 77,
        padding: 20,
        width: "100%",
        backgroundColor: "#3455AE",
    },
    buttonText: {
        fontFamily: "MontserratBold"
    },
    
})

export default SendScreen