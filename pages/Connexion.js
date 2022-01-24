import React, {Component} from 'react'
import {Text, View, StyleSheet, TextInput, TouchableOpacity} from 'react-native'
import {LinearGradient} from 'expo-linear-gradient';
import BouncyCheckbox from "react-native-bouncy-checkbox";

import Logo from '../assets/logo-typo.svg';

import * as G from '../service/global'

// Largeur des items
const size = G.wSC / G.numColumns - 10;

export default class Connexion extends Component {
    constructor(props) {
        super(props);

        // Etats
        this.state = {
            inputLogin: '',
            inputPassword: '',
            isChecked: false
        }
    }

    onChangeLogin = (text) => {
        this.setState({inputLogin:text})
    }
    onFocusLogin = () => {
        this.setState({inputLogin: ''})
    }

    onChangePassword = (text) => {
        this.setState({inputPassword:text})
    }
    onFocusPassword = () => {
        this.setState({inputPassword: ''})
    }

    onSubmit = () => {
        // TODO
    }

    render() {
        return(
            <>
            <LinearGradient
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}
                    colors={['#EF835E', '#FABB5B']}
                    style={styles.container}>
                <Logo width={200} height={120} style={styles.logo}/>

                <View style={styles.containerLogin}>
                    <TextInput
                        style={styles.input}
                        placeholder="Mail"
                        placeholderTextColor={'white'}

                        // Valeur à afficher par défaut dans le champ de recherche
                        value={this.state.inputValue}

                        // Events
                        onChangeText = {this.onChangeLogin}
                        onFocus = {this.onFocusLogin}
                        onSubmitEditing = {this.onSubmit}/>

                    <TextInput
                        style={styles.input}
                        placeholder="Mot de passe"
                        placeholderTextColor={'white'}
                        secureTextEntry={true}

                        // Valeur à afficher par défaut dans le champ de recherche
                        value={this.state.inputValue}

                        // Events
                        onChangeText = {this.onChangePassword}
                        onFocus = {this.onFocusPassword}
                        onSubmitEditing = {this.onSubmit}/>

                    <BouncyCheckbox
                        size={20}
                        fillColor="#EF835E"
                        unfillColor="white"
                        text="Rester connecté"
                        iconStyle={{borderColor: 'white'}}
                        textStyle={{ color: 'white', textDecorationLine: "none" }}
                        onPress={(isChecked: boolean) => {
                            this.setState({isChecked: isChecked})
                        }}
                        style={{alignSelf: 'left', marginLeft: 40, marginTop: 10}}
                    />

                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            // TODO
                        }}
                        activeOpacity={.7}
                    >
                        <Text style={styles.buttonText}>Se connecter</Text>
                    </TouchableOpacity>
                </View>

                <View style={{
                    flexDirection: 'row',
                    position: 'absolute',
                    bottom: 50
                }}>
                    <Text
                        style={{
                            marginRight: 5,
                            color: 'white'
                        }}>
                            Vous n'avez pas de compte ?
                        </Text>
                    <Text
                        style={{
                            fontWeight: 'bold',
                            color: 'white'
                        }}>
                            Créer un compte
                    </Text>
                </View>
            </LinearGradient>
            </>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#ff0000',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    containerLogin: {
        width: '100%',
        alignItems: 'center'
    },

    logo: {
        marginBottom: 50
    },

    input: {
        width: '80%',
        height: 53,
        paddingHorizontal: 20,
        margin: 10,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: 'white',
        color: 'white',
        fontSize: 14
    },

    button: {
        width: '80%',
        height: 53,
        marginTop: 60,
        borderRadius: 10,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },

    buttonText: {
        color: '#EF835E',
        fontWeight: 'bold'
    }
})