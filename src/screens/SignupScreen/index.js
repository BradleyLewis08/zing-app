import React, {useState, useContext} from 'react'
import { View, StyleSheet } from 'react-native'
import { Image, Input, Button, Text } from 'react-native-elements'
import {AuthContext} from '../../navigation/AuthProvider'


const LoginScreen = ({navigation}) => {
    const [errors, setErrors] = useState(null)
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()
    const [username, setUsername] = useState()
    const {signup} = useContext(AuthContext)
    const handleSignup = async () => {
        const response = await signup(email, password, firstName, lastName, username)
        if(response){
            console.log(response)
            setErrors(response)
        }
    }
    return (
        <View style={styles.container}>
            <Image source={require("../../assets/ZingLogo.png")} style={styles.image} />
            {/* {errors ? <Text>{errors}</Text> : null} */}
            <Input onChangeText={value => setEmail(value)} inputContainerStyle={styles.inputContainer} containerStyle={styles.input} placeholder="Email address" leftIcon={{type: 'font-awesome', name: 'envelope-square'}} />
            <Input onChangeText={value => setPassword(value)} inputContainerStyle={styles.inputContainer} containerStyle={styles.input} placeholder="Password" secureTextEntry={true} leftIcon={{type: 'font-awesome', name: 'unlock-alt'}}/>
            <Input onChangeText={value => setFirstName(value)} inputContainerStyle={styles.inputContainer} containerStyle={styles.input} placeholder="First Name" leftIcon={{type: 'font-awesome', name: 'envelope-square'}} />
            <Input onChangeText={value => setLastName(value)} inputContainerStyle={styles.inputContainer} containerStyle={styles.input} placeholder="Last Name" leftIcon={{type: 'font-awesome', name: 'unlock-alt'}}/>
            <Input onChangeText={value => setUsername(value)} inputContainerStyle={styles.inputContainer} containerStyle={styles.input} placeholder="Username" leftIcon={{type: 'font-awesome', name: 'envelope-square'}} />
            <Button style={{fontFamily: "Montserrat"}} onPress={async () => handleSignup()} containerStyle={styles.buttonContainer} buttonStyle={styles.button} title="Sign Up"></Button>
            <Text style={styles.text}>Got an account? <Text onPress={() => {navigation.navigate("Login")}} style={{...styles.signupText, textDecorationLine: 'underline'}}>Login</Text></Text>
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
        fontFamily: "Montserrat",
    },
    text: {
        color: "#3455AE",
        fontSize: 15,
        marginTop: 20,
        fontFamily: "Montserrat"
    }
})