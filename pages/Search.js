import React, {Component} from 'react'
import {Text, View, StyleSheet, TextInput, TouchableOpacity} from 'react-native'
import {LinearGradient} from 'expo-linear-gradient';

import * as G from '../service/global'

// Largeur des items
const size = G.wSC / G.numColumns - 10;

export default class Search extends Component {
    constructor(props) {
        super(props);

        // Etats
        this.state = {
            
        }
    }

    render() {
        return(
            <View style={styles.container}>
                <Text>Search Page</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
})