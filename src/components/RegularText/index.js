
import React from "react"
import {Text} from "react-native"
import {useFonts} from "expo-font"

const RegularText = ({children}) => {
    const [loaded] = useFonts({
        Montserrat: require('../../../assets/fonts/Montserrat-Regular.otf'),
    })
    return (
        <Text style={{fontSize: 20, fontFamily: "Montserrat"}}>{children}</Text>
    )
}

export default RegularText
