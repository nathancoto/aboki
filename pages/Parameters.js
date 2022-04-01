import React, {Component} from 'react'
import {Text, View, StyleSheet, TextInput, TouchableOpacity, Image} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as G from '../service/global'
import i18n from 'i18n-js'

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
            needConnection: true,
            userData: props.userData
        }

        this.getLang();
    }
    
    componentDidMount() {
        if(typeof this.state.userData !== 'object') {
            this.parseUserData();
        }
    }

    parseUserData() {
        this.setState({
            userData: JSON.parse(this.state.userData)
        });
    }

    getLang = async () => {
        try {
            const selectedLang = await AsyncStorage.getItem('selectedLang');
            if(selectedLang !== null) {
                i18n.locale = selectedLang.toLowerCase();
                this.setState({
                    selectedLang: selectedLang
                });
            }
        } catch(e) {
            return false;
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
            <View style={[styles.container, this.props.appTheme == "Dark" ? darkTheme.container : null]}>
                <View style={[styles.userContainer, this.props.appTheme == "Dark" ? darkTheme.userContainer : null]}>
                    <View style={[styles.imageContainer, this.props.appTheme == "Dark" ? darkTheme.imageContainer : null]}>
                        <Image source={{uri: this.state.userData.photo_profil}} style={[styles.image, this.props.appTheme == "Dark" ? darkTheme.image : null]} />
                    </View>
                    <Text style={[styles.name, this.props.appTheme == "Dark" ? darkTheme.name : null]}>{this.state.userData.surname} {this.state.userData.name}</Text>

                    <TouchableOpacity
                        style={[styles.button, this.props.appTheme == "Dark" ? darkTheme.button : null]}
                        onPress={() => {
                            this.props.navigation.navigate('Profil', {isMe: true});
                        }}
                        activeOpacity={.8}>
                        <UserIcon style={[styles.icon, this.props.appTheme == "Dark" ? darkTheme.icon : null]} />
                        <Text style={[styles.buttonText, this.props.appTheme == "Dark" ? darkTheme.buttonText : null]}>{i18n.t('myAccount')}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.button, this.props.appTheme == "Dark" ? darkTheme.button : null]}
                        onPress={() => {
                            this.props.navigation.navigate('EditParameters');
                        }}
                        activeOpacity={.8}>
                        <ParametersIcon style={[styles.icon, this.props.appTheme == "Dark" ? darkTheme.icon : null]} />
                        <Text style={[styles.buttonText, this.props.appTheme == "Dark" ? darkTheme.buttonText : null]}>{i18n.t('parameters')}</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    style={[styles.disconnectButton, this.props.appTheme == "Dark" ? darkTheme.disconnectButton : null]}
                    onPress={() => {
                        if(this.state.needConnection) {
                            this.onDisconnect();
                        }
                    }}
                    activeOpacity={.8}>
                    <Text style={[styles.disconnectButtonText, this.props.appTheme == "Dark" ? darkTheme.disconnectButtonText : null]}>{i18n.t('disconnect')}</Text>
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

    imageContainer: {
        width: 82,
        height: 82,
        borderRadius: 41,
        borderColor: '#EF835E',
        borderWidth: 2,
        borderStyle: 'dashed'
    },

    image: {
        backgroundColor: '#EF835E',
        width: 78,
        height: 78,
        borderRadius: 39,
        borderColor: 'white',
        borderWidth: 2
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

const darkTheme = StyleSheet.create({
    container: {
        backgroundColor: "#0d0f15",
    },

    userContainer: {

    },

    imageContainer: {
        borderColor: '#EF835E',
    },

    image: {
        backgroundColor: '#EF835E',
        borderColor: '#0d0f15',
    },

    name: {
        color: 'white'
    },

    button: {
        borderColor: '#EF835E',
    },

    icon: {
        color: '#EF835E',
    },

    buttonText: {
        color: '#EF835E',
    },

    disconnectButton: {
        backgroundColor: '#EF835E',
    },

    disconnectButtonText: {
        color: '#0d0f15',
    }
})