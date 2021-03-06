import React, {Component} from 'react'
import {Text, View, StyleSheet, Image, FlatList, ScrollView} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';

import * as G from '../service/global'

// Import des icônes
import SeeGroup from '../assets/arrow-right.svg';

// Largeur des items
const size = G.wSC / G.numColumns - 10;

export default class GroupListCard extends Component {
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
            <TouchableOpacity activeOpacity={.8} style={[styles.groupCard, this.props.appTheme == "Dark" ? darkTheme.groupCard : null]} onPress={() => {this.props.onSelectGroup(id)}}>
                <View style={{flexDirection: 'row'}}>
                    <Image source={{uri: group.photo_de_profil_du_groupe}} style={[styles.image, this.props.appTheme == "Dark" ? darkTheme.image : null]} />
                    <View style={{flexDirection: 'column', justifyContent: 'center'}}>
                        <Text style={[styles.text, styles.title, this.props.appTheme == "Dark" ? darkTheme.text : null]} numberOfLines={1}>{group.nom_du_groupe}</Text>
                        <Text style={[styles.text, this.props.appTheme == "Dark" ? darkTheme.text : null]} numberOfLines={1}>{group.nb_participants} Participant(s)</Text>
                    </View>
                </View>
                <TouchableOpacity style={[styles.seeGroupContainer, this.props.appTheme == "Dark" ? darkTheme.seeGroupContainer : null]} activeOpacity={0.8}>
                    <SeeGroup height={23} style={[styles.seeGroup, this.props.appTheme == "Dark" ? darkTheme.seeGroup : null]} />
                </TouchableOpacity>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    groupCard: {
        position: 'relative',
        width: "100%",
        height: 58,
        padding: 10,
        marginBottom: 20,
        backgroundColor: 'white',
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    image: {
        width: 58,
        height: 58,
        borderRadius: 29,
        marginRight: 15
    },

    text: {
        fontSize: 12,
        marginVertical: 2,
    },

    title: {
        fontWeight: 'bold'
    },

    seeGroupContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: "white",

        alignItems: 'center',
        justifyContent: 'center',

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 10
    },

    seeGroup: {
        width: 23,
        height: 23,
        color: "#EF835E"
    }
})

const darkTheme = StyleSheet.create({
    groupCard: {
        backgroundColor: '#0d0f15',
    },

    image: {
        
    },

    text: {
        color: 'white'
    },

    title: {
        
    },

    seeGroupContainer: {
        backgroundColor: "#0d0f15",
        shadowColor: "#fff",
    },

    seeGroup: {
        color: "#EF835E"
    }
})