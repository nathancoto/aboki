import React, {Component} from 'react'
import {Text, View, StyleSheet, Image, FlatList, ScrollView} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';

import * as G from '../service/global'

// Largeur des items
const size = G.wSC / G.numColumns - 10;

// Import des emojis
const emojis = [
    {
        id: "Danse",
        emoji: "🩰"
    },
    {
        id: "Basketball",
        emoji: "🏀"
    },
    {
        id: "Volleyball",
        emoji: "🏐"
    },
    {
        id: "Badminton",
        emoji: "🏸"
    },
    {
        id: "Jeux-vidéos",
        emoji: "🎮"
    },
    {
        id: "Ski",
        emoji: "🎿"
    },
    {
        id: "Skateboard",
        emoji: "🛹"
    },
]

export default class HobbyCard extends Component {
    constructor(props) {
        super(props);

        // Etats
        this.state = {
            country: '',
            level: ''
        }
    }

    render() {
        const hobby = this.props.hobby;
        // console.log(hobby);

        let emoji;
        emojis.forEach((el, i) => {
            if(el.id == hobby) {
                emoji = el.emoji;
            }
        });

        return(
            <TouchableOpacity activeOpacity={.8} style={[styles.languageCard, this.props.appTheme == "Dark" ? darkTheme.languageCard : null]}>
                <View style={[styles.iconWrapper, this.props.appTheme == "Dark" ? darkTheme.iconWrapper : null]}>
                    <Text style={[styles.icon, this.props.appTheme == "Dark" ? darkTheme.icon : null]}>{emoji}</Text>
                </View>
                <Text style={[styles.text, this.props.appTheme == "Dark" ? darkTheme.text : null]}>{hobby}</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    languageCard: {
        width: 139,
        height: 53,
        padding: 10,
        marginRight: 20,
        backgroundColor: 'white',
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 10
    },

    iconWrapper: {
        backgroundColor: '#F6B675',
        width: 35,
        height: 35,
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10
    },

    text: {
        fontSize: 14
    }
})

const darkTheme = StyleSheet.create({
    languageCard: {
        backgroundColor: '#0d0f15',
        shadowColor: "#fff",
    },

    iconWrapper: {
        backgroundColor: '#F6B675',
    },

    text: {
        color: 'white'
    }
})