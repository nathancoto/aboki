import React, {Component} from 'react'
import {Text, View, StyleSheet, TextInput, TouchableOpacity} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as G from '../service/global'

// Import des icônes
import ParametersIcon from '../assets/parameters.svg';
import UserIcon from '../assets/user.svg';

// Largeur des items
const size = G.wSC / G.numColumns - 10;

export default class Parameters extends Component {
    constructor(props) {
        super(props);

        // Etats
        this.state = {
            needConnection: false
        }
    }

    async onDisconnect() {
        await AsyncStorage.removeItem('user');
        
        // Add a method that will delete user_meta token of the user from the server. 
        // await deleteUserMetaToken(PARAM_USER_ID); 
        
        this.props.navigation.navigate('Connexion');
    }

    render() {
        return(
            <View style={styles.container}>
                <View style={styles.userContainer}>
                    <View style={styles.image} />
                    <Text style={styles.name}>Eliza Myers</Text>

                    <TouchableOpacity style={styles.button} activeOpacity={.8}>
                        <UserIcon style={styles.icon} />
                        <Text style={styles.buttonText}>Mon compte</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            this.props.navigation.navigate('EditParameters');
                        }}
                        activeOpacity={.8}>
                        <ParametersIcon style={styles.icon} />
                        <Text style={styles.buttonText}>Paramètres</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    style={styles.disconnectButton}
                    onPress={() => {
                        if(this.state.needConnection) {
                            this.onDisconnect();
                        }
                    }}
                    activeOpacity={.8}>
                    <Text style={styles.disconnectButtonText}>Déconnexion</Text>
                </TouchableOpacity>
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

    userContainer: {
        width: '100%',
        alignItems: 'center',
        marginBottom: '80%'
    },

    image: {
        backgroundColor: '#EF835E',
        width: 82,
        height: 82,
        borderRadius: 41
    },

    name: {
        fontSize: 20,
        marginTop: 10,
        marginBottom: 20
    },

    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 9,
        borderWidth: 3,
        borderColor: '#EF835E',
        width: '100%',
        padding: 10,
        marginVertical: 10
    },

    icon: {
        height: 20,
        width: 20,
        color: '#EF835E',
        marginRight: 10
    },

    buttonText: {
        color: '#EF835E',
        fontWeight: '600',
        fontSize: 16
    },

    disconnectButton: {
        position: 'absolute',
        bottom: 110,
        width: '100%',
        padding: 10,
        backgroundColor: '#EF835E',
        borderRadius: 9
    },

    disconnectButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center'
    }
})