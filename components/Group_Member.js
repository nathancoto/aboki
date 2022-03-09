import React, {Component} from 'react'
import {Text, View, StyleSheet, Image, FlatList, ScrollView} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';

import * as G from '../service/global'

// Largeur des items
const size = G.wSC / G.numColumns - 10;

export default class Group_Member extends Component {
    constructor(props) {
        super(props);

        // Etats
        this.state = {
            
        }
    }

    render() {
        const member = this.props.member;
        // console.log(member);
        var data = require('../service/languages.json');

        let languages = member.langues.map((language, index) => {
            if(index < 2) {
                let flag;
                if(data.languages.find(lang => lang.id === language)) {
                    flag = data.languages.find(lang => lang.id === language).flag;
                }
                return (
                    <Text key={index}>{flag !== null ? flag : language}</Text>
                )
            }
        });

        return(
            <TouchableOpacity activeOpacity={.8} style={styles.memberCard}>
                <Image source={{uri: member.photo_de_profil}} style={styles.image} />
                <View style={styles.nameContainer} numberOfLines={1}>
                    <Text style={[styles.text, styles.name]} numberOfLines={1}>{member.surname} {member.name}</Text>
                </View>
                <View style={styles.languagesContainer}>
                    {languages}
                    {member.langues.length > 2 ?
                        <Text style={[styles.text, styles.name]}> +{member.langues.length - 2}</Text>
                        : null    
                    }
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    memberCard: {
        position: 'relative',
        width: 76,
        height: 100,
        paddingHorizontal: 10,
        paddingVertical: 5,
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
        width: 43,
        height: 43,
        borderRadius: 10
    },

    nameContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5
    },

    text: {
        fontSize: 12
    },

    name: {
        fontWeight: 'bold'
    },

    languagesContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
})