import React, {Component} from 'react'
import {Text, View, StyleSheet, Image, FlatList, ScrollView} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as G from '../service/global'

// Import des icônes
import GoBack from '../assets/arrow-left.svg';
import Check from '../assets/check.svg';
import i18n from 'i18n-js';

// Largeur des items
const size = G.wSC / G.numColumns - 10;

export default class Param_Theme extends Component {
    constructor(props) {
        super(props);
        this.getData();

        // Etats
        this.state = {
            userData: props.userData,
            selectedTheme: ''
        }
    }

    parseUserData() {
        this.setState({
            userData: JSON.parse(this.state.userData)
        });
    }

    getData = async () => {
        try{
            const theme = await AsyncStorage.getItem('selectedTheme')

            if(theme !== null){
                this.setState({selectedTheme: theme})
            }
        } 
        catch(error) {
            console.log(error);
        }
    }

    onSave = async (theme) => {
        try {
            await AsyncStorage.setItem('selectedTheme', theme)
        } catch (error) {
            console.log(error)
        }
    };

    changeTheme(theme) {
        this.setState({selectedTheme: theme});
        this.onSave(theme);
        this.props.setAppTheme(theme);
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
                    <Text style={[styles.name, this.props.appTheme == "Dark" ? darkTheme.name : null]}>{i18n.t('theme')}</Text>
                    <View style={{width: 45}} />
                </View>

                <View style={{flexDirection: 'column', width: '100%'}}>
                    <TouchableOpacity
                        style={this.state.selectedTheme == "Default" ? (this.props.appTheme == "Dark" ? darkTheme.themeContainerSelected : styles.themeContainerSelected) : (this.props.appTheme == "Dark" ? darkTheme.themeContainer : styles.themeContainer)}
                        onPress={() => { this.changeTheme("Default") }}
                        activeOpacity={0.8}>
                        <Text style={[this.state.selectedTheme == "Default" ? (this.props.appTheme == "Dark" ? darkTheme.themeTextSelected : styles.themeTextSelected) : (this.props.appTheme == "Dark" ? darkTheme.themeText : styles.themeText), {fontWeight: 'bold'}]}>{i18n.t('default')}</Text>
                        <View>
                            {this.state.selectedTheme == "Default" && <View style={[styles.checkIconContainer, this.props.appTheme == "Dark" ? darkTheme.checkIconContainer : null]}><Check width={17} style={[styles.checkIcon, this.props.appTheme == "Dark" ? darkTheme.checkIcon : null]}/></View>}
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={this.state.selectedTheme == "Light" ? (this.props.appTheme == "Dark" ? darkTheme.themeContainerSelected : styles.themeContainerSelected) : (this.props.appTheme == "Dark" ? darkTheme.themeContainer : styles.themeContainer)}
                        onPress={() => { this.changeTheme("Light") }}
                        activeOpacity={0.8}>
                        <Text style={[this.state.selectedTheme == "Light" ? (this.props.appTheme == "Dark" ? darkTheme.themeTextSelected : styles.themeTextSelected) : (this.props.appTheme == "Dark" ? darkTheme.themeText : styles.themeText), {fontWeight: 'bold'}]}>{i18n.t('light')}</Text>
                        <View>
                            {this.state.selectedTheme == "Light" && <View style={[styles.checkIconContainer, this.props.appTheme == "Dark" ? darkTheme.checkIconContainer : null]}><Check width={17} style={[styles.checkIcon, this.props.appTheme == "Dark" ? darkTheme.checkIcon : null]}/></View>}
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={this.state.selectedTheme == "Dark" ? (this.props.appTheme == "Dark" ? darkTheme.themeContainerSelected : styles.themeContainerSelected) : (this.props.appTheme == "Dark" ? darkTheme.themeContainer : styles.themeContainer)}
                        onPress={() => { this.changeTheme("Dark") }}
                        activeOpacity={0.8}>
                        <Text style={[this.state.selectedTheme == "Dark" ? (this.props.appTheme == "Dark" ? darkTheme.themeTextSelected : styles.themeTextSelected) : (this.props.appTheme == "Dark" ? darkTheme.themeText : styles.themeText), {fontWeight: 'bold'}]}>{i18n.t('dark')}</Text>
                        <View>
                            {this.state.selectedTheme == "Dark" && <View style={[styles.checkIconContainer, this.props.appTheme == "Dark" ? darkTheme.checkIconContainer : null]}><Check width={17} style={[styles.checkIcon, this.props.appTheme == "Dark" ? darkTheme.checkIcon : null]}/></View>}
                        </View>
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

    themeContainer: {
        width: '100%',
        height: 53,
        marginVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 10
    },

    themeContainerSelected: {
        width: '100%',
        height: 53,
        marginVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderColor: '#EF835E',
        borderWidth: 2
    },

    themeText: {

    },

    themeTextSelected: {
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

    themeContainer: {
        width: '100%',
        height: 53,
        marginVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#0d0f15',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,

        shadowColor: "#fff",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 10
    },

    themeContainerSelected: {
        width: '100%',
        height: 53,
        marginVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#0d0f15',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderColor: '#EF835E',
        borderWidth: 2
    },

    themeText: {
        color: 'white'
    },

    themeTextSelected: {
        color: '#EF835E'
    },

    checkIconContainer: {
        backgroundColor: '#EF835E',
    },

    checkIcon: {
        color: '#0d0f15',
    }
})