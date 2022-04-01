import React, {Component} from 'react'
import {Text, View, StyleSheet, Image, FlatList, ScrollView} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';

import * as G from '../service/global'
import i18n from 'i18n-js';

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
        const id = this.props.id;
        // console.log(group);

        return(
            <TouchableOpacity
                activeOpacity={.8}
                onPress={() => {
                    this.props.onSelectGroup(id);
                }}
                style={[styles.groupCard, this.props.appTheme == "Dark" ? darkTheme.groupCard : null]}>
                <Image source={{uri: group.photo_de_profil_du_groupe}} style={[styles.image, this.props.appTheme == "Dark" ? darkTheme.image : null]} />
                <Text style={[styles.text, styles.title, this.props.appTheme == "Dark" ? darkTheme.text : null]} numberOfLines={1}>{group.nom_du_groupe}</Text>
                <Text style={[styles.text, this.props.appTheme == "Dark" ? darkTheme.text : null]} numberOfLines={1}>{group.nb_participants} {i18n.t('members')}</Text>
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