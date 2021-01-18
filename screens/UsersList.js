import React, {useEffect, useState} from 'react'
import { View, Text, ScrollView, StyleSheet } from "react-native";
import firebase from "../database/firebase";
import { ListItem, Avatar, Button } from "react-native-elements";

export const UsersList = (props) => {

    const [users, setUsers] = useState([])

    useEffect(() =>  {
        firebase.db.collection('users').onSnapshot(querySnapshot => {

            const users = [];

            querySnapshot.docs.forEach(doc => {
                const {firstName, lastName, date, time} = doc.data()
                users.push({
                    id: doc.id,
                    firstName,
                    lastName,
                    date,
                    time
                })
            })

            setUsers(users)
        })
    }, [])


    return (
        <ScrollView>
            <Button title="Create User"
            onPress={() => props.navigation.navigate('CreateUser')}/>

            {
                users.map(user => {
                    return <ListItem
                    key={user.id} bottomDivider
                    onPress={() => props.navigation.navigate('UserDetails', {userId: user.id})}>
                        <ListItem.Chevron/>
                        <Avatar source={{uri: 'https://www.flaticon.es/svg/vstatic/svg/1077/1077114.svg?token=exp=1610920631~hmac=d01476a4e6e68415224077164b555cfe'}}/>
                        <ListItem.Content>
                            <ListItem.Title>
                                {user.firstName}
                            </ListItem.Title>
                        </ListItem.Content>
                    </ListItem>
                })
            }
        </ScrollView>
    )
    const styles = StyleSheet.create({
        menu: {
          flex: 1,
          backgroundColor: '#fff',
          alignItems: 'center',
          justifyContent: 'center',
        },
      });
}
