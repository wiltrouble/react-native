import React, { useEffect, useState} from 'react'
import { View, Text, StyleSheet, TextInput, Button, ScrollView, ActivityIndicator, Alert } from "react-native";
import firebase from "../database/firebase";



export const UserDetails = (props) => {

    const initialState = {
        id: '',
        firstName: '',
        lastName: '',
    }

    const [user, setUser] = useState(initialState)

    const [loading, setLoading] = useState(true)

    const getUserById = async (id) => {
        const dbRef = firebase.db.collection('users').doc(id)
        const doc = await dbRef.get();
        const user = doc.data();
        setUser({
            ...user,
            id: doc.id
        })
        setLoading(false)
    }

    useEffect(() => {
        getUserById(props.route.params.userId)
    }, [])

    const handleChangeText = (name, value) => {
        setUser({...user, [name]: value})
    }

    const deleteUser = async () => {
        const dbRef = firebase.db.collection('users').doc(props.route.params.userId);
        await dbRef.delete();
        props.navigation.navigate('UsersList')    
    }

    const updateUser = () => {
        const dbRef = firebase.db.collection('users').doc(user.id)
        await dbRef.set({
            lastName: user.lastName,
            firstName: user.firstName
        })
        setUser(initialState)
        props.navigation.navigate('UsersList')
    }

    const openConfirmationAlert = () => {
        Alert.alert("Remove User", "Are you sure?", [
            {text: 'Yes', onPress: () => deleteUser()},
            {text: 'No', onPress: () => console.log('false')}
        ])
    }

    if(loading) {
        return (
            <View>
                <ActivityIndicator size="large" color="#9e9e9e"/>
            </View>
        )
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.inputGroup}>
                <TextInput placeholder="Firstname"
                value={user.firstName}
                onChangeText={(value) => handleChangeText('firstName', value)}/>
            </View>
            <View style={styles.inputGroup}>
                <TextInput placeholder="LastName"
                value={user.lastName}
                onChangeText={(value) => handleChangeText('lastName', value)}/>
            </View>

            <View style={styles.inputGroup}>
                <Button color="#E37399" style={styles.button} title='Update User'
                    onPress={() => updateUser()}/>
            </View>
            <View>
                <Button style={styles.button} title='Delete'
                    onPress={() => openConfirmationAlert()}/>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    inputGroup: {
        flex: 1,
        padding: 0,
        marginBottom: 15,
        borderColor: 1,
        borderBottomColor: '#e76f51'
    },
    container: {
        flex: 1,
        padding: 35,
    },
    button:{
        borderColor: '#FFC300'
    }
})
 