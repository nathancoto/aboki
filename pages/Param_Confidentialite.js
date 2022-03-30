import React, {Component} from 'react'
import {Text, View, StyleSheet, Image, FlatList, ScrollView} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';

import * as G from '../service/global'

// Import des icônes
import GoBack from '../assets/arrow-left.svg';
import Check from '../assets/check.svg';
import AngleRight from '../assets/angle-right.svg';
import Lock from '../assets/lock.svg';
import Unlock from '../assets/unlock.svg';
import UserBlocked from '../assets/user-blocked.svg';
import GroupBlocked from '../assets/group-blocked.svg';

// Largeur des items
const size = G.wSC / G.numColumns - 10;

export default class Param_Confidentialite extends Component {
    constructor(props) {
        super(props);

        // Etats
        this.state = {
            userData: props.userData,
            selectedVisibleContent: ''
        }
    }

    parseUserData() {
        this.setState({
            userData: JSON.parse(this.state.userData)
        });
    }

    changeVisibleContent(visibleContent) {
        // TODO
        this.setState({
            selectedVisibleContent: visibleContent
        });
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
                    <Text style={[styles.name, this.props.appTheme == "Dark" ? darkTheme.name : null]}>Confidentialité</Text>
                    <View style={{width: 45}} />
                </View>

                <View style={[styles.category, this.props.appTheme == "Dark" ? darkTheme.category : null]}>
                    <Text style={[styles.subtitle, this.props.appTheme == "Dark" ? darkTheme.subtitle : null]}>Bloquer</Text>
                    <TouchableOpacity
                        style={[styles.visibleContentContainer, this.props.appTheme == "Dark" ? darkTheme.visibleContentContainer : null]}
                        onPress={() => {  }}
                        activeOpacity={0.8}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <UserBlocked height={22} style={[styles.buttonIcon, this.props.appTheme == "Dark" ? darkTheme.buttonIcon : null]} />
                            <Text style={[styles.visibleContentText, {fontWeight: 'bold'}, this.props.appTheme == "Dark" ? darkTheme.visibleContentText : null]}>Comptes bloqués</Text>
                        </View>
                        <View>
                            <AngleRight width={20} style={[styles.angleRightIcon, this.props.appTheme == "Dark" ? darkTheme.angleRightIcon : null]}/>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.visibleContentContainer, this.props.appTheme == "Dark" ? darkTheme.visibleContentContainer : null]}
                        onPress={() => {  }}
                        activeOpacity={0.8}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <GroupBlocked height={22} style={[styles.buttonIcon, this.props.appTheme == "Dark" ? darkTheme.buttonIcon : null]} />
                            <Text style={[styles.visibleContentText, {fontWeight: 'bold'}, this.props.appTheme == "Dark" ? darkTheme.visibleContentText : null]}>Groupes bloqués</Text>
                        </View>
                        <View>
                            <AngleRight width={20} style={[styles.angleRightIcon, this.props.appTheme == "Dark" ? darkTheme.angleRightIcon : null]}/>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={[styles.category, this.props.appTheme == "Dark" ? darkTheme.category : null]}>
                    <Text style={[styles.subtitle, this.props.appTheme == "Dark" ? darkTheme.subtitle : null]}>Contenu visible</Text>
                    <TouchableOpacity
                        style={this.state.selectedVisibleContent == "Public" ? (this.props.appTheme == "Dark" ? darkTheme.visibleContentContainerSelected : styles.visibleContentContainerSelected) : (this.props.appTheme == "Dark" ? darkTheme.visibleContentContainer : styles.visibleContentContainer)}
                        onPress={() => { this.changeVisibleContent("Public") }}
                        activeOpacity={0.8}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Unlock height={22} style={this.state.selectedVisibleContent == "Public" ? (this.props.appTheme == "Dark" ? darkTheme.buttonIconSelected : styles.buttonIconSelected) : (this.props.appTheme == "Dark" ? darkTheme.buttonIcon : styles.buttonIcon)} />
                            <Text style={[this.state.selectedVisibleContent == "Public" ? (this.props.appTheme == "Dark" ? darkTheme.visibleContentTextSelected : styles.visibleContentTextSelected) : (this.props.appTheme == "Dark" ? darkTheme.visibleContentText : styles.visibleContentText), {fontWeight: 'bold'}]}>Compte public</Text>
                        </View>
                        <View>
                            {this.state.selectedVisibleContent == "Public" && <View style={[styles.checkIconContainer, this.props.appTheme == "Dark" ? darkTheme.checkIconContainer : null]}><Check width={17} style={[styles.checkIcon, this.props.appTheme == "Dark" ? darkTheme.checkIcon : null]}/></View>}
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={this.state.selectedVisibleContent == "Private" ? (this.props.appTheme == "Dark" ? darkTheme.visibleContentContainerSelected : styles.visibleContentContainerSelected) : (this.props.appTheme == "Dark" ? darkTheme.visibleContentContainer : styles.visibleContentContainer)}
                        onPress={() => { this.changeVisibleContent("Private") }}
                        activeOpacity={0.8}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Lock height={22} style={this.state.selectedVisibleContent == "Private" ? (this.props.appTheme == "Dark" ? darkTheme.buttonIconSelected : styles.buttonIconSelected) : (this.props.appTheme == "Dark" ? darkTheme.buttonIcon : styles.buttonIcon)} />
                            <Text style={[this.state.selectedVisibleContent == "Private" ? (this.props.appTheme == "Dark" ? darkTheme.visibleContentTextSelected : styles.visibleContentTextSelected) : (this.props.appTheme == "Dark" ? darkTheme.visibleContentText : styles.visibleContentText), {fontWeight: 'bold'}]}>Compte privé</Text>
                        </View>
                        <View>
                            {this.state.selectedVisibleContent == "Private" && <View style={[styles.checkIconContainer, this.props.appTheme == "Dark" ? darkTheme.checkIconContainer : null]}><Check width={17} style={[styles.checkIcon, this.props.appTheme == "Dark" ? darkTheme.checkIcon : null]}/></View>}
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={[styles.footer, this.props.appTheme == "Dark" ? darkTheme.footer : null]}>
                    <View style={[styles.footerBorder, this.props.appTheme == "Dark" ? darkTheme.footerBorder : null]} />
                    <Text style={[styles.footerTitle, this.props.appTheme == "Dark" ? darkTheme.footerTitle : null]}>En savoir plus sur la confidentialité sur Aboki</Text>
                    <TouchableOpacity
                        style={[styles.footerButton, this.props.appTheme == "Dark" ? darkTheme.footerButton : null]}
                        onPress={() => {  }}
                        activeOpacity={0.8}>
                            <Text style={this.props.appTheme == "Dark" ? darkTheme.footerText : null}>Politique de confidentialité</Text>
                            <AngleRight width={16} style={[styles.angleRightIcon, this.props.appTheme == "Dark" ? darkTheme.angleRightIcon : null]}/>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.footerButton, this.props.appTheme == "Dark" ? darkTheme.footerButton : null]}
                        onPress={() => {  }}
                        activeOpacity={0.8}>
                            <Text style={this.props.appTheme == "Dark" ? darkTheme.footerText : null}>Nous contacter</Text>
                            <AngleRight width={16} style={[styles.angleRightIcon, this.props.appTheme == "Dark" ? darkTheme.angleRightIcon : null]}/>
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

    subtitle: {
        fontSize: 18,
        marginBottom: 5
    },

    category: {
        flexDirection: 'column',
        width: '100%',
        marginVertical: 10
    },

    visibleContentContainer: {
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

    visibleContentContainerSelected: {
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

    visibleContentText: {

    },

    visibleContentTextSelected: {
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
    },

    angleRightIcon: {
        color: 'black',
        width: 20,
        height: 20
    },

    buttonIcon: {
        color: 'black',
        height: 20,
        width: 20,
        marginRight: 20
    },

    buttonIconSelected: {
        color: '#EF835E',
        height: 20,
        width: 20,
        marginRight: 20
    },

    footer: {
        position: 'absolute',
        bottom: 50,
        flexDirection: 'column',
        width: '100%'
    },

    footerBorder: {
        position: 'relative',
        left: '-10%',
        width: '200%',
        height: 1,
        backgroundColor: 'black',
        marginBottom: 10
    },

    footerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5
    },

    footerButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 5
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

    subtitle: {
        color: 'white'
    },

    category: {
        
    },

    visibleContentContainer: {
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

    visibleContentContainerSelected: {
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

    visibleContentText: {
        color: 'white'
    },

    visibleContentTextSelected: {
        color: '#EF835E'
    },

    checkIconContainer: {
        backgroundColor: '#EF835E',
    },

    checkIcon: {
        color: '#0d0f15',
    },

    angleRightIcon: {
        color: 'white',
    },

    buttonIcon: {
        color: 'white',
        height: 20,
        width: 20,
        marginRight: 20
    },

    buttonIconSelected: {
        color: '#EF835E',
        height: 20,
        width: 20,
        marginRight: 20
    },

    footer: {
        
    },

    footerBorder: {
        backgroundColor: 'white',
    },

    footerTitle: {
        color: 'white'
    },

    footerText: {
        color: 'white'
    },

    footerButton: {
        
    }
})