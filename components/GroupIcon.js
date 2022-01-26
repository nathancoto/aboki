import React, {Component} from 'react'
import {Text, View, StyleSheet, Image, FlatList, ScrollView, TouchableOpacity} from 'react-native'

import * as G from '../service/global'

// Largeur des items
const size = G.wSC / G.numColumns - 10;

export default class GroupIcon extends Component {
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
            <TouchableOpacity style={styles.groupIcon} activeOpacity={.7}>
                <Image source={{uri: group.acf.photo_de_profil_du_groupe}} style={styles.image} />
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    groupIcon: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 10,
        backgroundColor: '#EF835E'
    },

    image: {
        borderRadius: 30,
        borderColor: '#EF835E',
        borderWidth: 3,
        backgroundColor: 'white',
        resizeMode: 'contain',
        height: 60,
        width: 60,
        resizeMode: 'cover'
    }
})