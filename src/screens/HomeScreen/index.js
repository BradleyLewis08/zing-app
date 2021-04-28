import React, {useContext, useState, useEffect} from "react"
import {View, Text, StyleSheet, ActivityIndicator} from "react-native"
import {AuthContext} from "../../navigation/AuthProvider"
import {UserContext} from "../../navigation/UserProvider"
import {Button} from "react-native-elements"
import {firebase} from "../../firebase/config"

const HomeScreen = () => {
    const {user, signOut, setUser} = useContext(AuthContext)
    const {currentUser, setCurrentUser} = useContext(UserContext)
    const getAndHandlerUserData = async (uid) => {
        await firebase.firestore().collection('users').doc(uid).onSnapshot((doc) =>{
            setCurrentUser(doc.data())
        })
    }
    useEffect(() => {
        getAndHandlerUserData(user.uid)
    }, [])
    
    if(currentUser){
        return (
            <View style={styles.container}>
                <Text>Welcome, {currentUser.firstName}.</Text>
                <Button buttonContainerStyle={styles.buttonContainer} buttonStyle={styles.button} title="Logout" onPress={() => signOut()}></Button>
            </View>
        )
    } else {
        return <View style={styles.container}><Button style={{width: 100, height: 100}} onPress={() => signOut()}>Restore</Button></View>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: "center",
        justifyContent: "center"
    },
    button: {
        backgroundColor: "#5271ff",
        width: 150
    },
    buttonContainer: {
        borderRadius: 40
    }
})

export default HomeScreen