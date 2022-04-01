import React, {Component} from 'react'
import {Text, View, StyleSheet, Image, FlatList, ScrollView, Linking} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';

import * as G from '../service/global'
import i18n from 'i18n-js';

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

    openParams() {
        Linking.openURL('app-settings:');
    }

    reportBug() {
        Linking.openURL('https://forms.gle/By15Yx8rj885FBue6');
    }

    render() {
        if(typeof this.state.userData !== 'object') {
            this.parseUserData();
        }
        return(
            <View style={[styles.container, this.props.appTheme == "Dark" ? darkTheme.container : null]}>
                <View style={[styles.header, this.props.appTheme == "Dark" ? darkTheme.header : null]}>
                    <TouchableOpacity
                        style={[styles.backButtonContainer, this.props.appTheme == "Dark" ? darkTheme.backButtonContainer : null]}
                        onPress={() => {
                            this.props.navigation.goBack();
                        }}
                        activeOpacity={0.8}>
                        <View style={[styles.backButton, this.props.appTheme == "Dark" ? darkTheme.backButton : null]}>
                            <GoBack style={[styles.backButtonIcon, this.props.appTheme == "Dark" ? darkTheme.backButtonIcon : null]} />
                        </View>
                    </TouchableOpacity>
                    <Text style={[styles.name, this.props.appTheme == "Dark" ? darkTheme.name : null]}>{this.state.userData.surname} {this.state.userData.name}</Text>
                    <View style={{width: 45}} />
                </View>

                <View style={[styles.category, this.props.appTheme == "Dark" ? darkTheme.category : null]}>
                    <Text style={[styles.title, this.props.appTheme == "Dark" ? darkTheme.title : null]}>{i18n.t('account')}</Text>
                    <TouchableOpacity
                        style={[styles.button, this.props.appTheme == "Dark" ? darkTheme.button : null]}
                        onPress={() => {
                            this.props.navigation.navigate('Param_Langue');
                        }}
                        activeOpacity={0.8}>
                        <Text style={[styles.buttonText, this.props.appTheme == "Dark" ? darkTheme.buttonText : null]}>{i18n.t('appLanguage')}</Text>
                    </TouchableOpacity>
                </View>

                <View style={[styles.category, this.props.appTheme == "Dark" ? darkTheme.category : null]}>
                    <Text style={[styles.title, this.props.appTheme == "Dark" ? darkTheme.title : null]}>{i18n.t('appearence')}</Text>
                    <TouchableOpacity
                        style={[styles.button, this.props.appTheme == "Dark" ? darkTheme.button : null]}
                        onPress={() => {
                            this.props.navigation.navigate('Param_Theme');
                        }}
                        activeOpacity={0.8}>
                        <Text style={[styles.buttonText, this.props.appTheme == "Dark" ? darkTheme.buttonText : null]}>{i18n.t('theme')}</Text>
                    </TouchableOpacity>
                </View>

                <View style={[styles.category, this.props.appTheme == "Dark" ? darkTheme.category : null]}>
                    <Text style={[styles.title, this.props.appTheme == "Dark" ? darkTheme.title : null]}>{i18n.t('security')}</Text>
                    <TouchableOpacity
                        style={[styles.button, this.props.appTheme == "Dark" ? darkTheme.button : null]}
                        onPress={() => {
                            this.props.navigation.navigate('Param_Confidentialite');
                        }}
                        activeOpacity={0.8}>
                        <Text style={[styles.buttonText, this.props.appTheme == "Dark" ? darkTheme.buttonText : null]}>{i18n.t('confidentiality')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, this.props.appTheme == "Dark" ? darkTheme.button : null]} activeOpacity={0.8} onPress={this.openParams}>
                        <Text style={[styles.buttonText, this.props.appTheme == "Dark" ? darkTheme.buttonText : null]}>{i18n.t('notifications')}</Text>
                    </TouchableOpacity>
                </View>

                <View style={[styles.category, this.props.appTheme == "Dark" ? darkTheme.category : null]}>
                    <Text style={[styles.title, this.props.appTheme == "Dark" ? darkTheme.title : null]}>Autre</Text>
                    <TouchableOpacity style={[styles.button, this.props.appTheme == "Dark" ? darkTheme.button : null]} activeOpacity={0.8} onPress={this.reportBug}>
                        <Text style={[styles.buttonText, this.props.appTheme == "Dark" ? darkTheme.buttonText : null]}>{i18n.t('reportBug')}</Text>
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

const darkTheme = StyleSheet.create({
    container: {
        backgroundColor: "#0d0f15",
    },

    header: {
        
    },

    backButtonContainer: {

    },

    backButton: {
        backgroundColor: '#EF835E',
    },

    backButtonIcon: {
        color: '#0d0f15'
    },

    name: {
        color: 'white'
    },

    category: {
        
    },

    title: {
        color: 'white'
    },

    button: {
        backgroundColor: '#EF835E',
    },

    buttonText: {
        color: '#0d0f15',
    }
})