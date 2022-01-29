import React, {Component} from 'react'
import {Text, View, StyleSheet, Image, FlatList, ScrollView} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';

import * as G from '../service/global'

// Largeur des items
const size = G.wSC / G.numColumns - 10;

export default class GroupCard extends Component {
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
            <TouchableOpacity activeOpacity={.8} style={styles.groupCard}>
                <Image source={{uri: group.image}} style={styles.image} />
                <Text style={[styles.text, styles.title]} numberOfLines={1}>{group.name}</Text>
                <Text style={styles.text} numberOfLines={1}>{group.nbParticipants} Participant(s)</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    groupCard: {
        width: 130,
        height: 180,
        padding: 10,
        marginRight: 20,
        backgroundColor: 'white',
        borderRadius: 15,

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
        width: 110,
        height: 110,
        borderRadius: 10,
        marginBottom: 10
    },

    text: {
        fontSize: 12,
        marginVertical: 2,
        textAlign: 'center'
    },

    title: {
        fontWeight: 'bold'
    }
})