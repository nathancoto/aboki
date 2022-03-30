import React, {Component} from 'react'
import {Text, View, StyleSheet, Image, FlatList, ScrollView} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';

import * as G from '../service/global'

// Largeur des items
const size = G.wSC / G.numColumns - 10;

export default class GroupProfileCard extends Component {
    constructor(props) {
        super(props);

        // Etats
        this.state = {
            
        }
    }

    render() {
        const group = this.props.group;
        // console.log(group);

        return(
            <TouchableOpacity activeOpacity={.8} style={[styles.groupCard, this.props.appTheme == "Dark" ? darkTheme.groupCard : null]}>
                <Image source={{uri: group.image}} style={[styles.image, this.props.appTheme == "Dark" ? darkTheme.image : null]} />
                <Text style={[styles.text, styles.title, this.props.appTheme == "Dark" ? darkTheme.text : null]} numberOfLines={1}>{group.name}</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    groupCard: {
        width: 90,
        height: 100,
        padding: 8,
        marginRight: 20,
        backgroundColor: 'white',
        borderRadius: 15,
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

    image: {
        width: 70,
        height: 70,
        borderRadius: 10,
        marginBottom: 2
    },

    text: {
        fontSize: 12,
        marginVertical: 0,
        textAlign: 'center'
    },

    title: {
        fontWeight: 'bold'
    }
})

const darkTheme = StyleSheet.create({
    groupCard: {
        backgroundColor: '#0d0f15',
        shadowColor: "#fff",
    },

    image: {
        
    },

    text: {
        color: 'white'
    },

    title: {
        
    }
})