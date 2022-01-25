import React, {Component} from 'react'
import {Text, View, StyleSheet, Image, FlatList, ScrollView, TouchableOpacity} from 'react-native'

import * as G from '../service/global'

// Largeur des items
const size = G.wSC / G.numColumns - 10;

export default class GroupIcon extends Component {
    constructor(props) {
        super(props);

        // Etats
        this.state = {
            
        }
    }

    render() {
        const group = this.props.group;
        console.log(group);

        return(
            <TouchableOpacity style={styles.groupIcon} activeOpacity={.7}>
                <Text>{group.title.rendered}</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    groupIcon: {
        width: 60,
        height: 60,
        borderRadius: 30,
        borderColor: '#EF835E',
        borderWidth: 3
    }
})