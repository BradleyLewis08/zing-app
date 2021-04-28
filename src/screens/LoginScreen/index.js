import React, {useState, useContext} from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Image, Input, Button, Text } from 'react-native-elements'
import {AuthContext} from '../../navigation/AuthProvider'


const LoginScreen = ({navigation}) => {
    const {login} = useContext(AuthContext)
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    return (
        <View style={styles.container}>
            <Image source={require("../../assets/ZingLogo.png")} style={styles.image} />
            <View style={styles.inputContainer}>
                <Input onChangeText={value => setEmail(value)} inputContainerStyle={styles.inputContainer} containerStyle={styles.input} placeholder="Email address" leftIcon={{type: 'font-awesome', name: 'envelope-square'}} />
                <Input onChangeText={value => setPassword(value)} inputContainerStyle={styles.inputContainer} containerStyle={styles.input} placeholder="Password" secureTextEntry={true} leftIcon={{type: 'font-awesome', name: 'unlock-alt'}}/>
            </View>
            <Button onPress={() => login(email, password)} containerStyle={styles.buttonContainer} buttonStyle={styles.button} title="Login"></Button>
            <Text style={styles.text}>New around here? <Text onPress={() => {navigation.navigate("Signup")}} style={{...styles.signupText, textDecorationLine: 'underline'}}>Sign Up</Text></Text>
        </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: "center",
        justifyContent: "center"
    },
    image: {
        height: 200,
        width: 400,
    },
    input: {
        width: 300,
        marginLeft: 20,
        borderWidth: 1,
        borderColor: "#3455AE",
        borderRadius: 15,
        marginBottom: 10,
        height: 50,
        fontSize: 10
    },
    inputContainer: {
        borderBottomWidth: 0
    },
    button: {
        backgroundColor: "#3455AE",
        width: 150
    },
    buttonContainer: {
        borderRadius: 40,
    },
    text: {
        color: "#3455AE",
        fontSize: 15,
        marginTop: 20,
        fontFamily: "Montserrat"
    }
})