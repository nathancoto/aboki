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
            <View style={message.fromMe ? (this.props.appTheme == "Dark" ? fromMeDark.wrapper : fromMe.wrapper) : (this.props.appTheme == "Dark" ? receivedDark.wrapper : received.wrapper)}>
                {!message.fromMe ?
                    <Image source={{uri: otherData.image}} style={[received.image, this.props.appTheme == "Dark" ? receivedDark.image : null]} />
                    : null
                }
                <View style={message.fromMe ? (this.props.appTheme == "Dark" ? fromMeDark.container : fromMe.container) : (this.props.appTheme == "Dark" ? receivedDark.container : received.container)}>
                    <Text style={message.fromMe ? (this.props.appTheme == "Dark" ? fromMeDark.text : fromMe.text) : (this.props.appTheme == "Dark" ? receivedDark.text : received.text)}>
                        {message.message}
                    </Text>
                </View>
                {!message.fromMe ?
                    <TouchableOpacity style={[received.translateIconContainer, this.props.appTheme == "Dark" ? receivedDark.translateIconContainer : null]} activeOpacity={0.8}>
                        <Translate style={[received.translateIcon, this.props.appTheme == "Dark" ? receivedDark.translateIcon : null]} />
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
        justifyContent: 'flex-start',
        marginVertical: 10
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

const fromMeDark = StyleSheet.create({
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
        color: '#0d0f15',
        fontSize: 14
    }
})

const receivedDark = StyleSheet.create({
    wrapper: {
        width: screenWidthPadding,
        height: 'auto',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginVertical: 10
    },
    
    container: {
        width: 'auto',
        height: 'auto',
        backgroundColor: '#0d0f15',
        color: 'white',
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
        fontSize: 14,
        color: 'white'
    },

    translateIconContainer: {
        width: 36,
        height: 36,
        backgroundColor: '#0d0f15',
        marginLeft: 10,
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center'
    },

    translateIcon: {
        width: 20,
        height: 20,
        color: 'white'
    }
})