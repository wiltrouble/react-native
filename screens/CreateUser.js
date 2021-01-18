import React, {useState} from 'react'
import { View, Button, TextInput, ScrollView, StyleSheet } from "react-native";
import firebase from "../database/firebase";



export const CreateUser = (props) => {

    const [state, setState] = useState({
        firstName: '',
        lastName: '',
        date: '',
        time: ''
        
    })
    
    const handleChangeText = (name, value) => {
        setState({...state, [name]: value})
    }

    const setDate = () => {
        var date = new Date().toLocaleDateString('en-US')
        return date;
    }

    const setTime = () => {
        var hour = new Date().getHours();
        var minute = new Date().getMinutes();
        return hour+':'+minute
    }

    const saveUser = async () => {
        if (state.firstname === '' || state.lastName === '') {
            alert('enter data')
        } else {
            try {
                await firebase.db.collection('users').add({
                    firstName: state.firstName,
                    lastName: state.lastName,
                    date: setDate(),
                    time: setTime()
    
                })
                props.navigation.navigate('UsersList')
            } catch {
                console.log(error)
            }
        }
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.inputGroup}>
                <TextInput placeholder="Firstname"
                onChangeText={(value) => handleChangeText('firstName', value)}/>
            </View>
            <View style={styles.inputGroup}>
                <TextInput placeholder="LastName"
                onChangeText={(value) => handleChangeText('lastName', value)}/>
            </View>

            <View style={styles.inputGroup}>
                <Button style={styles.button} title='Save'
                onPress={() => saveUser()}/>
            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    inputGroup: {
        flex: 1,
        padding: 0,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc'
    },
    container: {
        flex: 1,
        padding: 35,
    },
    button:{
        borderColor: '#FFC300'
    }
})
 
