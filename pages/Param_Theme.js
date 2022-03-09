import React, {Component} from 'react'
import {Text, View, StyleSheet, Image, FlatList, ScrollView} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';

import * as G from '../service/global'

// Import des icônes
import GoBack from '../assets/arrow-left.svg';
import Check from '../assets/check.svg';

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
        this.setState({selectedTheme: theme})
        this.onSave(theme);
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
                    <Text style={styles.name}>Thème</Text>
                    <View style={{width: 45}} />
                </View>

                <View style={{flexDirection: 'column', width: '100%'}}>
                    <TouchableOpacity
                        style={this.state.selectedTheme == "Default" ? styles.themeContainerSelected : styles.themeContainer}
                        onPress={() => { this.changeTheme("Default") }}
                        activeOpacity={0.8}>
                        <Text style={[this.state.selectedTheme == "Default" ? styles.themeTextSelected : styles.themeText, {fontWeight: 'bold'}]}>Défaut système</Text>
                        <View>
                            {this.state.selectedTheme == "Default" && <View style={styles.checkIconContainer}><Check width={17} style={styles.checkIcon}/></View>}
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={this.state.selectedTheme == "Light" ? styles.themeContainerSelected : styles.themeContainer}
                        onPress={() => { this.changeTheme("Light") }}
                        activeOpacity={0.8}>
                        <Text style={[this.state.selectedTheme == "Light" ? styles.themeTextSelected : styles.themeText, {fontWeight: 'bold'}]}>Clair</Text>
                        <View>
                            {this.state.selectedTheme == "Light" && <View style={styles.checkIconContainer}><Check width={17} style={styles.checkIcon}/></View>}
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={this.state.selectedTheme == "Dark" ? styles.themeContainerSelected : styles.themeContainer}
                        onPress={() => { this.changeTheme("Dark") }}
                        activeOpacity={0.8}>
                        <Text style={[this.state.selectedTheme == "Dark" ? styles.themeTextSelected : styles.themeText, {fontWeight: 'bold'}]}>Sombre</Text>
                        <View>
                            {this.state.selectedTheme == "Dark" && <View style={styles.checkIconContainer}><Check width={17} style={styles.checkIcon}/></View>}
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