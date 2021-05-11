import React, {useContext, useEffect, useState} from "react"
import AuthStack from './AuthStack'
import AppStack from './AppTabs'
import { NavigationContainer } from '@react-navigation/native';
import {AuthContext} from './AuthProvider'
import {firebase} from '../../firebase/config'

const Routes = () => {
    const {user, setUser} = useContext(AuthContext)
    const [initializing, setInitializing] = useState(true)
    
    const onAuthStateChanged = (user) => {
        setUser(user)
        if(initializing){
            setInitializing(false)
        }
    }
    
useEffect(() => {
        const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; 
    }, []);
    
    if(initializing){
        return null
    }

    return (
        <NavigationContainer>
            {user ? <AppStack /> : <AuthStack />}
        </NavigationContainer>
    )
}

export default Routes