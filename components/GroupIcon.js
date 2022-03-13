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
        const id = this.props.id;
        // console.log(group);

        return(
            <View>
                <TouchableOpacity style={[styles.groupIcon, this.props.appTheme == "Dark" ? darkTheme.groupIcon : null]} activeOpacity={.7} onPress={() => {this.props.onSelectGroup(id)}}>
                    <Image source={{uri: group.photo_de_profil_du_groupe}} style={[styles.image, this.props.appTheme == "Dark" ? darkTheme.image : null]} />
                </TouchableOpacity>
                <Text style={[styles.textGroup, this.props.appTheme == "Dark" ? darkTheme.textGroup : null]} numberOfLines={1}>{group.nom_du_groupe}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    groupIcon: {
        position: 'relative',
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 10,
        backgroundColor: '#EF835E',
        borderColor: '#EF835E',
        borderWidth: 2
    },

    image: {
        position: 'absolute',
        top: 0,
        left: 0,
        borderRadius: 30,
        borderColor: '#ffffff',
        borderWidth: 2,
        backgroundColor: 'white',
        resizeMode: 'contain',
        height: 56,
        width: 56,
        resizeMode: 'cover'
    },

    textGroup: {
        marginVertical: 5,
        textAlign: 'center',
        maxWidth: 60
    }
})

const darkTheme = StyleSheet.create({
    groupIcon: {
        backgroundColor: '#EF835E',
        borderColor: '#EF835E'
    },

    image: {
        borderColor: '#0d0f15',
        backgroundColor: '#0d0f15'
    },

    textGroup: {
        color: 'white'
    }
})