
import React from "react"
import {Text} from "react-native"
import {useFonts} from "expo-font"

const HeaderText = ({children}) => {
    const [loaded] = useFonts({
        MontserratBold: require('../../../assets/fonts/Montserrat-ExtraBold.otf'),
    })
    if(!loaded){
        return null
    } 
    return (
        <Text style={{color: "#3455AE", fontSize: 40, fontFamily: "MontserratBold", alignSelf: "center"}}>{children}</Text>
    )
}

export default HeaderText
