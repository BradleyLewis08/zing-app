import React, {useState, useContext} from 'react'
import {View, StyleSheet, Text} from "react-native"
import {SearchBar} from "react-native-elements"
import UserList from "../../components/UserList"
import { firebase } from '../../../firebase/config'
import {UserContext} from '../../navigation/UserProvider'
import {USER_COLLECTION_REF} from '../../db'

const AddRecipientScreen = ({navigation}) => {
  const {currentUser} = useContext(UserContext)
  const [search, setSearch] = useState('')
  const [users, setUsers] = useState([])
  const getUserFromSearch = async (searchTerm) => {
        const snapshot = await USER_COLLECTION_REF.where('username', '>=', searchTerm).where('username', '<=', searchTerm + '\uf8ff').get()
        const userList = snapshot.docs.map((doc) => {
            return doc.data()
        })
        setUsers(userList)
  }

  const handleSearchChange = (search) => {
      setSearch(search)
      getUserFromSearch(search)
  }
  return (
    <View styles={styles.container}>
        <SearchBar round lightTheme placeholder="Add recipients..." value={search} onChangeText={(search) => handleSearchChange(search)}></SearchBar>
        <UserList currentUser={currentUser} navigation={navigation} users={users}/>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'red',
        alignItems: "center",
        justifyContent: "center"
    },

})
  
export default AddRecipientScreen
