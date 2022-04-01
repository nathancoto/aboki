import React, {Component} from 'react'
import {Text, View, StyleSheet, Image, FlatList, ScrollView} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';

import * as G from '../service/global'
import i18n from 'i18n-js'

// Import des icônes
import GoBack from '../assets/arrow-left.svg';
import Check from '../assets/check.svg';
import i18n from 'i18n-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Import des drapeaux
const flags = [
    {
        id: "Français",
        img: require('../assets/flags/French.png')
    },
    {
        id: "Anglais",
        img: require('../assets/flags/United-kingdom.png')
    },
    {
        id: "Allemand",
        img: require('../assets/flags/Deutschland.png')
    },
    {
        id: "Chinois",
        img: require('../assets/flags/China.png')
    },
    {
        id: "Italien",
        img: require('../assets/flags/Italia.png')
    },
    {
        id: "Portugais",
        img: require('../assets/flags/Portugal.png')
    },
    {
        id: "Russe",
        img: require('../assets/flags/Russia.png')
    },
    {
        id: "Espagnol",
        img: require('../assets/flags/Spain.png')
    },
];

// Largeur des items
const size = G.wSC / G.numColumns - 10;

export default class Param_Langue extends Component {
    constructor(props) {
        super(props);

        // Etats
        this.state = {
            userData: props.userData,
            selectedLang: ''
        }

        this.getLang();
    }

    parseUserData() {
        this.setState({
            userData: JSON.parse(this.state.userData)
        });
    }

    changeLang(langi18n) {
        i18n.locale = langi18n.toLowerCase();
        this.setState({
            selectedLang: langi18n
        });
        AsyncStorage.setItem('selectedLang', langi18n);
    }

    getLang = async () => {
        try {
            const selectedLang = await AsyncStorage.getItem('selectedLang');
            if(selectedLang !== null) {
                this.setState({
                    selectedLang: selectedLang
                });
            }
        } catch(e) {
            return false;
        }
    }

    render() {
        if(typeof this.state.userData !== 'object') {
            this.parseUserData();
        }

        var data = require('../service/languages.json');

        let languagesSelector = data.languages.map((language, index) => {
            let langText = language.appParam;
            let langTrad = language.id;
            let langi18n = language.i18n;
            let flag;

            flags.forEach((el, i) => {
                if(el.id == langTrad) {
                    flag = el.img;
                }
            });

            return (
                <TouchableOpacity
                    style={this.state.selectedLang == langi18n ? (this.props.appTheme == "Dark" ? darkTheme.languageContainerSelected : styles.languageContainerSelected) : (this.props.appTheme == "Dark" ? darkTheme.languageContainer : styles.languageContainer)}
                    onPress={() => { this.changeLang(langi18n) }}
                    activeOpacity={0.8}
                    key={index}>
                    <View style={{flexDirection: 'row'}}>
                        <Image source={flag} style={[styles.flag, this.props.appTheme == "Dark" ? darkTheme.flag : null]} />
                        <View>
                            <Text style={[this.state.selectedLang == langi18n ? (this.props.appTheme == "Dark" ? darkTheme.langTextSelected : styles.langTextSelected) : (this.props.appTheme == "Dark" ? darkTheme.langText : styles.langText), {fontWeight: 'bold'}]}>{langText}</Text>
                            <Text style={this.state.selectedLang == langi18n ? (this.props.appTheme == "Dark" ? darkTheme.langTextSelected : styles.langTextSelected) : (this.props.appTheme == "Dark" ? darkTheme.langText : styles.langText)}>{langTrad}</Text>
                        </View>
                    </View>
                    <View>
                        {this.state.selectedLang == langi18n &&
                            <View style={[styles.checkIconContainer, this.props.appTheme == "Dark" ? darkTheme.checkIconContainer : null]}>
                                <Check width={17} style={[styles.checkIcon, this.props.appTheme == "Dark" ? darkTheme.checkIcon : null]}/>
                            </View>
                        }
                    </View>
                </TouchableOpacity>
            )
        });

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
                    <Text style={[styles.name, this.props.appTheme == "Dark" ? darkTheme.name : null]}>{i18n.t('appLanguage')}</Text>
                    <View style={{width: 45}} />
                </View>

                <View style={{flexDirection: 'column', width: '100%'}}>
                    {languagesSelector}
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
        justifyContent: 'flex-start',
        paddingHorizontal: '5%'
    },

    header: {
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

    languageContainer: {
        width: '100%',
        height: 53,
        marginVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 10
    },

    languageContainerSelected: {
        width: '100%',
        height: 53,
        marginVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        borderColor: '#EF835E',
        borderWidth: 2
    },

    flag: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#EF835E',
        marginRight: 20
    },

    langText: {

    },

    langTextSelected: {
        color: '#EF835E'
    },

    checkIconContainer: {
        width: 33,
        height: 33,
        borderRadius: 17,
        backgroundColor: '#EF835E',
        alignItems: 'center',
        justifyContent: 'center'
    },

    checkIcon: {
        color: 'white',
        width: 17,
        height: 17
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

    languageContainer: {
        width: '100%',
        height: 53,
        marginVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#0d0f15',
        borderRadius: 10,
        padding: 10,

        shadowColor: "#fff",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 10
    },

    languageContainerSelected: {
        width: '100%',
        height: 53,
        marginVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#0d0f15',
        borderRadius: 10,
        padding: 10,
        borderColor: '#EF835E',
        borderWidth: 2
    },

    flag: {
        backgroundColor: '#EF835E',
    },

    langText: {
        color: 'white'
    },

    langTextSelected: {
        color: '#EF835E'
    },

    checkIconContainer: {
        backgroundColor: '#EF835E',
    },

    checkIcon: {
        color: '#0d0f15',
    }
})