import React from 'react'
import {Avatar} from 'react-native-elements'
import {StyleSheet} from 'react-native'
 
const CustomAvatar = ({user}) => {
  
  return user.profilePictureAddress == "default" ? (
    <Avatar containerStyle={styles.avatar} rounded title={`${user.firstName[0]}${user.lastName[0]}`}></Avatar>
  ) : <Avatar rounded title="TBC"></Avatar>
}

const styles = StyleSheet.create({
    avatar : {
        backgroundColor: "#3455AE"
    }
})

export default CustomAvatar