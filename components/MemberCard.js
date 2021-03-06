import React, {Component} from 'react'
import {Text, View, StyleSheet, Image, FlatList, ScrollView} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';

import * as G from '../service/global'

// Import des icônes
import AddFriend from '../assets/user-plus.svg';

// Largeur des items
const size = G.wSC / G.numColumns - 10;

export default class MemberCard extends Component {
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
            <TouchableOpacity
                activeOpacity={.8}
                style={[styles.memberCard, this.props.appTheme == "Dark" ? darkTheme.memberCard : null]}
                onPress={() => {this.props.onSelectMember(id)}}>
                <Image source={{uri: member.photo_de_profil}} style={[styles.image, this.props.appTheme == "Dark" ? darkTheme.image : null]} />
                <View style={[styles.nameContainer, this.props.appTheme == "Dark" ? darkTheme.nameContainer : null]} numberOfLines={1}>
                    <Text style={[styles.text, styles.name, this.props.appTheme == "Dark" ? darkTheme.text : null]}>{member.surname} {member.name}, </Text>
                    <Text style={[styles.text, this.props.appTheme == "Dark" ? darkTheme.text : null]}>{member.age}</Text>
                </View>
                <View style={[styles.languagesContainer, this.props.appTheme == "Dark" ? darkTheme.postContainer : null]}>
                    {languages}
                    {member.langues.length > 2 ?
                        <Text style={[styles.text, styles.name, this.props.appTheme == "Dark" ? darkTheme.text : null]}> +{member.langues.length - 2}</Text>
                        : null    
                    }
                </View>
                <Text style={[{fontSize: 10, textAlign: 'center'}, this.props.appTheme == "Dark" ? darkTheme.text : null]} numberOfLines={1}>{member.formation}</Text>
                <Text style={[{fontSize: 10, textAlign: 'center'}, this.props.appTheme == "Dark" ? darkTheme.text : null]} numberOfLines={1}>{member.place}</Text>
                <TouchableOpacity style={[styles.addFriendContainer, this.props.appTheme == "Dark" ? darkTheme.addFriendContainer : null]} activeOpacity={0.8}>
                    <AddFriend height={15} style={[styles.addFriend, this.props.appTheme == "Dark" ? darkTheme.addFriend : null]} />
                </TouchableOpacity>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    memberCard: {
        position: 'relative',
        width: 130,
        height: 200,
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
        justifyContent: 'center',
        marginBottom: 5
    },

    addFriendContainer: {
        position: 'absolute',
        bottom: -20,
        right: -20,
        width: 32,
        height: 32,
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
        width: 15,
        height: 15,
        color: "#EF835E"
    }
})

const darkTheme = StyleSheet.create({
    memberCard: {
        backgroundColor: '#0d0f15',
        shadowColor: "#fff",
    },

    image: {
        
    },

    nameContainer: {
        
    },

    text: {
        color: 'white'
    },

    name: {
        
    },

    languagesContainer: {
        
    },

    addFriendContainer: {
        backgroundColor: "#0d0f15",
        shadowColor: "#fff",
    },

    addFriend: {
        color: "#EF835E"
    }
})