import React, {Component} from 'react'
import {Text, View, StyleSheet, Image, FlatList, ScrollView} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';

import * as G from '../service/global'

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
        // console.log(member);

        let languages = member.langues.map((language, index) => {
            if(index < 2) {
                return (
                    <Text>{language}</Text>
                )
            }
        });

        return(
            <TouchableOpacity activeOpacity={.8} style={styles.memberCard}>
                <Image source={{uri: member.image}} style={styles.image} />
                <View style={styles.nameContainer} numberOfLines={1}>
                    <Text style={[styles.text, styles.name]}>{member.name} {member.surname},</Text>
                    <Text style={styles.text}>{member.age}</Text>
                </View>
                <View style={styles.languagesContainer}>
                    {languages}
                    {member.langues.length > 2 ?
                        <Text style={[styles.text, styles.name]}> +{member.langues.length - 2}</Text>
                        : null    
                    }
                </View>
                <Text style={{fontSize: 10, textAlign: 'center'}} numberOfLines={1}>{member.study}</Text>
                <Text style={{fontSize: 10, textAlign: 'center'}} numberOfLines={1}>{member.place}</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    memberCard: {
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
    }
})