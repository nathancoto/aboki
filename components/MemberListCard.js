import React, {Component} from 'react'
import {Text, View, StyleSheet, Image, FlatList, ScrollView} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';

import * as G from '../service/global'

// Import des icônes
import AddFriend from '../assets/user-plus.svg';

// Largeur des items
const size = G.wSC / G.numColumns - 10;

export default class MemberListCard extends Component {
    constructor(props) {
        super(props);

        // Etats
        this.state = {
            
        }
    }

    render() {
        const member = this.props.member;
        const id = this.props.id;
        // console.log(member);
        var data = require('../service/languages.json');

        let languages = member.langues.map((language, index) => {
            if(index < 2) {
                let flag = data.languages.find(lang => lang.id === language).flag;
                return (
                    <Text key={index}>{flag}</Text>
                )
            }
        });

        return(
            <TouchableOpacity
                activeOpacity={.8}
                style={styles.memberCard}
                onPress={() => {this.props.onSelectMember(id)}}>
                <View style={{flexDirection: 'row'}}>
                    <Image source={{uri: member.photo_de_profil}} style={styles.image} />
                    <View style={styles.memberDetails}>
                        <View style={styles.nameContainer} numberOfLines={1}>
                            <Text style={[styles.text, styles.name]}>{member.surname} {member.name}, </Text>
                            <Text style={styles.text}>{member.age}</Text>
                        </View>
                        <Text style={{fontSize: 10, marginVertical: 2}} numberOfLines={1}>{member.formation}</Text>
                        <View style={styles.languagesContainer}>
                            {languages}
                            {member.langues.length > 2 ?
                                <Text style={[styles.text, styles.name]}> +{member.langues.length - 2}</Text>
                                : null    
                            }
                        </View>
                    </View>
                </View>
                <TouchableOpacity style={styles.addFriendContainer} activeOpacity={0.8}>
                    <AddFriend height={23} style={styles.addFriend} />
                </TouchableOpacity>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    memberCard: {
        position: 'relative',
        width: '100%',
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

    nameContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 2
    },

    memberDetails: {

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
        justifyContent: 'flex-start',
        marginBottom: 5
    },

    addFriendContainer: {
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

    addFriend: {
        width: 23,
        height: 23,
        color: "#EF835E"
    }
})