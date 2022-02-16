import React, {Component} from 'react'
import {Text, View, StyleSheet, Image, FlatList, ScrollView} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';

import * as G from '../service/global'

// Import des icônes
import GoBack from '../assets/arrow-left.svg';
import Check from '../assets/check.svg';

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
    }

    parseUserData() {
        this.setState({
            userData: JSON.parse(this.state.userData)
        });
    }

    changeLang(lang) {
        // TODO
        console.log(lang.langTrad);
        this.setState({
            selectedLang: lang.langTrad
        });
    }

    render() {
        if(typeof this.state.userData !== 'object') {
            this.parseUserData();
        }

        var data = require('../service/languages.json');

        let languagesSelector = data.languages.map((language, index) => {
            let flag = language.flag;
            let langText = language.appParam;
            let langTrad = language.id;

            return (
                <TouchableOpacity
                    style={this.state.selectedLang == langTrad ? styles.languageContainerSelected : styles.languageContainer}
                    onPress={() => { this.changeLang({langTrad}) }}
                    activeOpacity={0.8}
                    key={index}>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={styles.flag}>{flag}</Text>
                        <View>
                            <Text style={[this.state.selectedLang == langTrad ? styles.langTextSelected : styles.langText, {fontWeight: 'bold'}]}>{langText}</Text>
                            <Text style={this.state.selectedLang == langTrad ? styles.langTextSelected : styles.langText}>{langTrad}</Text>
                        </View>
                    </View>
                    <View>
                        {this.state.selectedLang == langTrad && <View style={styles.checkIconContainer}><Check width={17} style={styles.checkIcon}/></View>}
                    </View>
                </TouchableOpacity>
            )
        });

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
                    <Text style={styles.name}>Langue de l'application</Text>
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
        overflow: 'hidden',
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