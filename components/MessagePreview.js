import React, {Component} from 'react'
import {Text, View, StyleSheet, Image, FlatList, ScrollView, Dimensions} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';

import * as G from '../service/global'

// Largeur des items
const size = G.wSC / G.numColumns - 10;
const width = Dimensions.get('window').width - (Dimensions.get('window').width / 10);

export default class MessagePreview extends Component {
    constructor(props) {
        super(props);

        // Etats
        this.state = {
            
        }
    }

    render() {
        const message = this.props.message;
        // console.log(message);

        return(
            <TouchableOpacity
                style={[styles.messageContainer, this.props.appTheme == "Dark" ? darkTheme.messageContainer : null]}
                onPress={() => {
                    this.props.onSelectMessage(message)
                }}
                activeOpacity={.8}>
                <Image source={{uri: message.image}} style={[styles.image, this.props.appTheme == "Dark" ? darkTheme.image : null]} />
                <View style={styles.details}>
                    <Text style={[styles.text, styles.title, this.props.appTheme == "Dark" ? darkTheme.text : null]} numberOfLines={1}>{message.name}</Text>
                    <View style={[styles.messageContent, this.props.appTheme == "Dark" ? darkTheme.messageContent : null]}>
                        <Text style={[styles.text, message.read == false ? styles.noRead : styles.text, this.props.appTheme == "Dark" ? darkTheme.text : null]} numberOfLines={1}>{message.message}</Text>
                        <Text style={[styles.text, message.read == false ? styles.noRead : styles.text, this.props.appTheme == "Dark" ? darkTheme.text : null]} numberOfLines={1}> - {message.timeDiff}</Text>
                    </View>
                </View>
                {!message.read ?
                    <View style={[styles.noReadNotification, this.props.appTheme == "Dark" ? darkTheme.noReadNotification : null]} />
                    : null
                }
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    messageContainer: {
        position: 'relative',

        width: width,
        height: 50,
        marginBottom: 20,

        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'stretch'
    },

    image: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 15
    },

    details: {
        maxWidth: '66%'
    },

    text: {
        fontSize: 12,
    },

    noRead: {
        fontWeight: 'bold'
    },

    title: {
        fontSize: 14,
        fontWeight: 'bold'
    },

    messageContent: {
        flexDirection: 'row'
    },

    noReadNotification: {
        position: 'absolute',
        top: 18,
        right: 0,
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: '#EF835E'
    }
})

const darkTheme = StyleSheet.create({
    messageContainer: {
        
    },

    image: {
        
    },

    details: {
        
    },

    text: {
        color: 'white'
    },

    noRead: {
        
    },

    title: {
        
    },

    messageContent: {
        
    },

    noReadNotification: {
        backgroundColor: '#EF835E'
    }
})