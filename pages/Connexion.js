import React, {Component} from 'react'
import {Text, View, StyleSheet, TextInput, TouchableOpacity, Image} from 'react-native'
import {LinearGradient} from 'expo-linear-gradient';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import AsyncStorage from '@react-native-async-storage/async-storage';

import Logo from '../assets/logo-typo.svg';
import Globe from '../assets/globe.svg';
import Dropdown from '../assets/dropdown.svg';

import axios from 'axios';
import * as G from '../service/global'

import i18n from 'i18n-js'
import { t } from '../service/i18n'
import App from '../App';
import Home from './Home';

// Largeur des items
const size = G.wSC / G.numColumns - 10;

export default class Connexion extends Component {
    constructor(props) {
        super(props);

        // Etats
        this.state = {
            inputMail: '',
            inputPassword: '',
            isChecked: false,
            visible: false,
            selectedLang: 'FR',
            langs: ['FR', 'EN', 'ES', 'PT', 'DE', 'IT', 'CN', 'RU'],
            validating: false,
            failedLogin: false,
            needConnection: true
        }
        
        this.getData();
    }

    onChangeMail = (text) => {
        this.setState({inputMail:text})
    }
    onFocusMail = () => {
        this.setState({inputMail: ''})
    }

    onChangePassword = (text) => {
        this.setState({inputPassword:text})
    }
    onFocusPassword = () => {
        this.setState({inputPassword: ''})
    }

    onSubmit = () => {
        this.setState({ validating: true });

        let mail = this.state.inputMail;
        let password = this.state.inputPassword;
        let type = 'login';

        axios.post('https://dev-aboki.pantheonsite.io/authentification.php',
                {
                    type: type,
                    email: mail,
                    password: password
                },
                {timeout: 10000})
            .then((response) => {
                this.checkConnection(response);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    async checkConnection(response) {
        let data = response.data;
        // console.log('Data received :');
        // console.log(data);
        
        const connected = await this.saveToStorage(data);
        if (connected){
            this.setState({
                validating: false
            });

            this.props.setUserData(data.data);
            
            /* Redirect to accounts page */
            // this.props.navigator.resetTo({
            //     title: 'App',
            //     component: Home,
            // })
            this.props.navigation.replace('App');
        } else {
            this.setState({
                failedLogin: true
            });
        }
    }

    async saveToStorage(userData){
        console.log(userData);
        if (userData && userData.status) {
            await AsyncStorage.setItem('user', JSON.stringify({
                    isLoggedIn: true,
                    authToken: userData.data.auth_token,
                    id: userData.data.user_id,
                    name: userData.data.user_login,
                    user_name: userData.data.user_name,
                    photo_profil: userData.data.photo_profil,
                    surname: userData.data.surname,
                    name: userData.data.name
                })
            );
            return true;
        } else {
            return false;
        }
    }

    getData = async () => {
        try {
            const value = await AsyncStorage.getItem('user');
            if(value !== null) {
                this.setState({
                    validating: false
                });
    
                this.props.setUserData(value);
                
                /* Redirect to accounts page */
                // this.props.navigator.resetTo({
                //     title: 'App',
                //     component: Home,
                // })
                this.props.navigation.replace('App');
            } else {
                // Not connected
            }
        } catch(e) {
            return false;
        }
    }

    toggleLangVisibility = () => {
        this.setState({visible: !this.state.visible})
    }

    onLangSelect = (lang) => {
        i18n.locale = lang.toLowerCase();
        this.setState({selectedLang: lang});
    }

    renderDropdown = () => {
        let output = [];
        for(let i=0; i<this.state.langs.length; i++) {
            if(this.state.langs[i] != this.state.selectedLang) {
                output[i] =  <TouchableOpacity onPress={() => this.onLangSelect(this.state.langs[i])} activeOpacity={.7} key={i}>
                        <Text style={styles.dropdown}>{this.state.langs[i]}</Text>
                    </TouchableOpacity>
            }
        }

        return (
            <>
            {output}
            </>
        );
    };

    render() {
        return(
            <LinearGradient
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}
                    colors={['#EF835E', '#FABB5B']}
                    style={styles.container}>
                <Logo width={200} height={120} style={styles.logo}/>

                <View style={styles.langContainer}>
                    <TouchableOpacity style={styles.selectedLangContainer} onPress={this.toggleLangVisibility} activeOpacity={.7}>
                        <Globe width={16} height={16} style={{color: 'white'}} />
                        <Text style={styles.langSelected}>{this.state.selectedLang}</Text>
                        <Dropdown width={16} height={16} style={{color: 'white'}} />
                    </TouchableOpacity>
                    {this.state.visible ? this.renderDropdown() : null}
                </View>

                {this.state.failedLogin ? <Text style={styles.failedMessage}>Mauvaise combinaison mail / mot de passe</Text> : null}

                <View style={styles.containerMail}>
                    <TextInput
                        style={styles.input}
                        placeholder={i18n.t('mail')}
                        placeholderTextColor={'white'}

                        // Valeur à afficher par défaut dans le champ de recherche
                        value={this.state.inputValue}

                        // Events
                        onChangeText = {this.onChangeMail}
                        onFocus = {this.onFocusMail}/>

                    <TextInput
                        style={styles.input}
                        placeholder={i18n.t('password')}
                        placeholderTextColor={'white'}
                        secureTextEntry={true}

                        // Valeur à afficher par défaut dans le champ de recherche
                        value={this.state.inputValue}

                        // Events
                        onChangeText = {this.onChangePassword}
                        onFocus = {this.onFocusPassword}/>

                    <BouncyCheckbox
                        size={20}
                        fillColor="#EF835E"
                        unfillColor="white"
                        text={i18n.t('stayConnected')}
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
                            if(this.state.needConnection) {
                                if(this.state.inputMail && this.state.inputPassword) {
                                    this.onSubmit();
                                }
                            } else {
                                // this.props.navigator.resetTo({
                                //     title: 'App',
                                //     component: Home,
                                // })
                                this.props.navigation.replace('App');
                            }
                        }}
                        activeOpacity={.7}
                    >
                        <Text style={styles.buttonText}>{i18n.t('connection')}</Text>
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
                            {i18n.t('noAccount')}
                        </Text>
                    <Text
                        style={{
                            fontWeight: 'bold',
                            color: 'white'
                        }}>
                            {i18n.t('createAccount')}
                    </Text>
                </View>
            </LinearGradient>
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

    langContainer: {
        position: 'absolute',
        top: 60,
        right: 30,
        alignItems: 'flex-end'
    },

    selectedLangContainer: {
        flexDirection: 'row',
    },

    langSelected: {
        color: 'white',
        marginLeft: 6,
        marginRight: 2
    },

    dropdown: {
        color: 'white',
        marginVertical: 7,
        marginRight: 18
    },

    containerMail: {
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
    },

    failedMessage: {
        marginBottom: 20,
        fontWeight: 'bold',
        color: 'white'
    }
})