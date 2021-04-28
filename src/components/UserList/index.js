import React from 'react'
import {View, StyleSheet, Text} from "react-native"
import { ListItem, Avatar } from 'react-native-elements'
import CustomAvatar from '../CustomAvatar'

const UserList = ({users, navigation, currentUser}) => {
  users = users.filter((user) => (
      user.uid != currentUser.uid
  ))
  return users.length == 0 ? (
    null
    ) : 
    (
    <View>
        {
            users.map((user, i) => (
                <ListItem onPress={() => {navigation.navigate("Send", {
                    user: user
                })}} key={i}>
                    <CustomAvatar user={user}></CustomAvatar>
                    <ListItem.Content>
                        <ListItem.Title style={{fontFamily: "Montserrat"}}>{`${user.firstName} ${user.lastName}`}</ListItem.Title>
                        <ListItem.Subtitle style={{fontFamily: "Montserrat"}}>{`${user.username}`}</ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem>
            ))
        }
    </View>
  )
}

const styles = StyleSheet.create({
    Avatar: {
        backgroundColor: "orange"
    }
})

export default UserList