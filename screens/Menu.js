import React from 'react'
import { Avatar, Button, ListItem, Card } from "react-native-elements";
import { View, Text, ScrollView, StyleSheet, Image } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

export const Menu = (props) => {
    const cards = [
        {
           name: 'brynn',
           avatar: 'https://engineering.fb.com/wp-content/uploads/2016/04/yearinreview.jpg'
        }
        
       ]
    return (
        <ScrollView>
            <View>
                <Button title="Create User"
                onPress={() => props.navigation.navigate('CreateUser')}/>
            </View>
            

            <Button title="Students"
            onPress={() => props.navigation.navigate('UsersList')}/>

            <Button
            icon={
                <Icon
                name="list"
                size={20}
                color="white"
                />
            }
            title=" Users"
            />
        </ScrollView>
    )
}
