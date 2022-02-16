import React, {Component} from 'react'
import {Text, View, StyleSheet, Image, FlatList, ScrollView} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';

import * as G from '../service/global'

// Import des icônes
import GoBack from '../assets/arrow-left.svg';

// Largeur des items
const size = G.wSC / G.numColumns - 10;

export default class EditParameters extends Component {
    constructor(props) {
        super(props);

        // Etats
        this.state = {
            userData: props.userData
        }
    }

    parseUserData() {
        this.setState({
            userData: JSON.parse(this.state.userData)
        });
    }

    render() {
        if(typeof this.state.userData !== 'object') {
            this.parseUserData();
        }
        return(
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.backButtonContainer}
                        onPress={() => {
                            this.props.navigation.goBack();
                        }}
                        activeOpacity={0.8}>
                        <View style={styles.backButton}>
                            <GoBack style={styles.backButtonIcon} />
                        </View>
                    </TouchableOpacity>
                    <Text style={styles.name}>{this.state.userData.user_name}</Text>
                    <View style={{width: 45}} />
                </View>

                <View style={styles.category}>
                    <Text style={styles.title}>Compte</Text>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            this.props.navigation.navigate('Param_Langue');
                        }}
                        activeOpacity={0.8}>
                        <Text style={styles.buttonText}>Langue de l'application</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.category}>
                    <Text style={styles.title}>Apparence</Text>
                    <TouchableOpacity style={styles.button} activeOpacity={0.8}>
                        <Text style={styles.buttonText}>Thème</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.category}>
                    <Text style={styles.title}>Sécurité</Text>
                    <TouchableOpacity style={styles.button} activeOpacity={0.8}>
                        <Text style={styles.buttonText}>Confidentialité</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} activeOpacity={0.8}>
                        <Text style={styles.buttonText}>Notifications</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.category}>
                    <Text style={styles.title}>Autre</Text>
                    <TouchableOpacity style={styles.button} activeOpacity={0.8}>
                        <Text style={styles.buttonText}>Reporter un bug</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: "#fff",
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: '5%'
    },

    header: {
        position: 'absolute',
        top: 0,
        left: '5%',
        paddingTop: 50,
        width: '100%',
        height: 100,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    backButtonContainer: {
        width: 38,
        height: 38,
        borderRadius: 18,
        overflow: 'hidden'
    },

    backButton: {
        width: '100%',
        height: '100%',
        backgroundColor: '#EF835E',
        alignItems: 'center',
        justifyContent: 'center'
    },

    backButtonIcon: {
        width: 18,
        height: 18,
        color: 'white'
    },

    name: {
        textAlign: 'center',
        fontSize: 20
    },

    category: {
        width: '100%',
        marginVertical: 20
    },

    title: {
        fontSize: 18
    },

    button: {
        width: '100%',
        backgroundColor: '#EF835E',
        padding: 15,
        borderRadius: 10,
        marginVertical: 10
    },

    buttonText: {
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 14
    }
})