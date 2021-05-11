import React, {useContext, useEffect} from "react"
import {Text, StyleSheet, SafeAreaView, ScrollView, View, ImageBackground, Image, TouchableOpacity} from "react-native"
import {Avatar} from "react-native-elements"
import {UserContext} from '../../navigation/UserProvider'
import {AuthContext} from '../../navigation/AuthProvider'
import { useFonts } from 'expo-font'
import {firebase} from '../../../firebase/config'


const ProfileScreen = ({navigation}) => {
    const {user} = useContext(AuthContext)
    const {currentUser, setCurrentUser} = useContext(UserContext)
    const getAndHandlerUserData = async (uid) => {
        await firebase.firestore().collection('users').doc(uid).onSnapshot((doc) =>{
            setCurrentUser(doc.data())
        })
    }
    useEffect(() => {
        getAndHandlerUserData(user.uid)
    }, [])
    const [fontsLoaded] = useFonts({
        Montserrat: require('../../../assets/fonts/Montserrat-Regular.otf'),
        MontserratBold: require('../../../assets/fonts/Montserrat-Bold.otf')
    })

    if(!fontsLoaded || !currentUser) {
        return null;
    }
    return (
        <ImageBackground source={require('../../../assets/profile-background.png')} style={styles.background}>    
        <SafeAreaView style={styles.container}>
            <View style={styles.profileContainer}>
                <Avatar containerStyle={styles.avatar} onPress={() => console.log("Changed!")} activeOpacity={0.0} size="xlarge" rounded title={currentUser.firstName[0] + currentUser.lastName[0]} />
                <Text style={{ color: "#fff", fontFamily: "MontserratBold", fontSize: 35}}>{currentUser.firstName + " " + currentUser.lastName}</Text>
                <Text style={{ color: "#fff", fontFamily: "Montserrat", fontSize: 20, marginTop: 5}}>{`@${currentUser.username}`}</Text>
                <Text style={{ color: "#fff", fontFamily: "MontserratBold", fontSize: 20, marginTop: 10}}>{`RM${(currentUser.balance / 100).toFixed(2)}`}</Text>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => {navigation.navigate("New Payment")}} style={styles.sendButton}>
                    <Image style={styles.buttonImage} source={require('../../../assets/send.png')}></Image>
                    <Text style={styles.actionText}>Send</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {navigation.navigate("Manage")}} style={styles.manageButton}>
                    <Image style={styles.buttonImage} source={require('../../../assets/manage.png')}></Image>
                    <Text style={styles.actionText}>Manage</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
      fontFamily: "Helvetica Neue",
      flex: 1,
    },
    background: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },  
    avatar: {
        backgroundColor: "#3455AE",
        marginBottom: 15, fontFamily:"Montserrat",
        fontFamily: "MontserratBold"
    },
    profileContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: "20%",
        marginBottom: "12%",
        height: 300,
        flex: 1
    },
    buttonContainer: {
        flex: 2,
        height: 400,
        justifyContent: "space-around",
        alignItems: "center",
        flexDirection: "row",
        textAlign: "center",
        marginTop: 200
    },
    sendButton: {
        height: 150,
        width: 150,
        backgroundColor: "#3455AE",
        borderRadius: 20,
        alignContent: "center",
        justifyContent: "center"
    },
    manageButton: {
        height: 150,
        width: 150,
        marginRight: 10,
        backgroundColor: "#67E0A3",
        borderRadius: 20,
        alignContent: "center",
        justifyContent: "center"

    },
    buttonImage: {
        height: 80,
        width: 80,
        marginLeft: 35,
        marginBottom: 20
    },
    actionText: {
        alignSelf: "center",
        fontFamily: "MontserratBold", 
        color: "#fff", 
        fontSize: 15
    }


  });
  
export default ProfileScreen