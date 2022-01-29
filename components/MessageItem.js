import React, {Component} from 'react'
import {Text, View, StyleSheet, Image, FlatList, ScrollView, Dimensions} from 'react-native'

import * as G from '../service/global'

// Import des icônes
import Translate from '../assets/translate.svg';
import { TouchableOpacity } from 'react-native-gesture-handler';

// Largeur des items
const size = G.wSC / G.numColumns - 10;
const screenWidth = Dimensions.get('window').width;
const screenWidthPadding = Dimensions.get('window').width - (Dimensions.get('window').width / 10);

export default class MessageItem extends Component {
    constructor(props) {
        super(props);

        // Etats
        this.state = {
            
        }
    }

    render() {
        const message = this.props.message;
        const otherData = this.props.otherData;
        // console.log(message);

        return(
            <View style={message.fromMe ? fromMe.wrapper : received.wrapper}>
                {!message.fromMe ?
                    <Image source={{uri: otherData.image}} style={received.image} />
                    : null
                }
                <View style={message.fromMe ? fromMe.container : received.container}>
                    <Text style={message.fromMe ? fromMe.text : received.text}>
                        {message.message}
                    </Text>
                </View>
                {!message.fromMe ?
                    <TouchableOpacity style={received.translateIconContainer} activeOpacity={0.8}>
                        <Translate style={received.translateIcon} />
                    </TouchableOpacity>
                    : null
                }
            </View>
        )
    }
}

const fromMe = StyleSheet.create({
    wrapper: {
        width: screenWidthPadding,
        height: 'auto',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginVertical: 10
    },
    
    container: {
        width: 'auto',
        height: 'auto',
        backgroundColor: '#EF835E',
        padding: 10,
        borderRadius: 10
    },

    text: {
        color: 'white',
        fontSize: 14
    }
})

const received = StyleSheet.create({
    wrapper: {
        width: screenWidthPadding,
        height: 'auto',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    
    container: {
        width: 'auto',
        height: 'auto',
        backgroundColor: '#F3F3F3',
        padding: 10,
        borderRadius: 10
    },

    image: {
        width: 32,
        height: 32,
        borderRadius: 16,
        marginRight: 10
    },

    text: {
        fontSize: 14
    },

    translateIconContainer: {
        width: 36,
        height: 36,
        backgroundColor: '#F3F3F3',
        marginLeft: 10,
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center'
    },

    translateIcon: {
        width: 20,
        height: 20,
        color: 'black'
    }
})