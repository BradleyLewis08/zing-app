import React, {createContext, useState, useContext} from "react"
import {firebase} from '../firebase/config'

export const AuthContext = createContext()

const AuthProvider = ({children}) => {
    const [user, setUser] = useState()
    return (
        <AuthContext.Provider value={{
            user,
            setUser,
            login: async (email, password) => {
                try {
                    await firebase.auth().signInWithEmailAndPassword(email, password)
                } catch(error) {
                    setUser(null)
                    console.log(error)
                }
            },
            signup: async (email, password, firstName, lastName, username) => {
                try {
                    const userCreateResponse = await firebase.auth().createUserWithEmailAndPassword(email, password)
                    const addUserResponse = await firebase.firestore().collection('users').doc(userCreateResponse.user.uid).set({
                        email: email,
                        username: username,
                        firstName: firstName,
                        lastName: lastName,
                        balance: 0.00,
                        profilePictureAddress: "default",
                        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                        uid: userCreateResponse.uid
                    })
                    return null
                } catch(error) {
                    console.log(error)
                    return error
                }
            },
            signOut: async () => {
                try {
                    await firebase.auth().signOut()
                } catch (error) {
                    console.log(error)
                }
            }
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider