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
import i18n from 'i18n-js';

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
                    <Text style={styles.name}>{i18n.t('confidentiality')}</Text>
                    <View style={{width: 45}} />
                </View>

                <View style={styles.category}>
                    <Text style={styles.subtitle}>{i18n.t('bloked')}</Text>
                    <TouchableOpacity
                        style={styles.visibleContentContainer}
                        onPress={() => {  }}
                        activeOpacity={0.8}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <UserBlocked height={22} style={styles.buttonIcon} />
                            <Text style={[styles.visibleContentText, {fontWeight: 'bold'}]}>{i18n.t('blockedAccounts')}</Text>
                        </View>
                        <View>
                            <AngleRight width={20} style={styles.angleRightIcon}/>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.visibleContentContainer}
                        onPress={() => {  }}
                        activeOpacity={0.8}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <GroupBlocked height={22} style={styles.buttonIcon} />
                            <Text style={[styles.visibleContentText, {fontWeight: 'bold'}]}>{i18n.t('blockedGroups')}</Text>
                        </View>
                        <View>
                            <AngleRight width={20} style={styles.angleRightIcon}/>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.category}>
                    <Text style={styles.subtitle}>{i18n.t('visibleContent')}</Text>
                    <TouchableOpacity
                        style={this.state.selectedVisibleContent == "Default" ? styles.visibleContentContainerSelected : styles.visibleContentContainer}
                        onPress={() => { this.changeVisibleContent("Default") }}
                        activeOpacity={0.8}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Unlock height={22} style={this.state.selectedVisibleContent == "Default" ? styles.buttonIconSelected : styles.buttonIcon} />
                            <Text style={[this.state.selectedVisibleContent == "Default" ? styles.visibleContentTextSelected : styles.visibleContentText, {fontWeight: 'bold'}]}>{i18n.t('publicAccount')}</Text>
                        </View>
                        <View>
                            {this.state.selectedVisibleContent == "Default" && <View style={styles.checkIconContainer}><Check width={17} style={styles.checkIcon}/></View>}
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={this.state.selectedVisibleContent == "Light" ? styles.visibleContentContainerSelected : styles.visibleContentContainer}
                        onPress={() => { this.changeVisibleContent("Light") }}
                        activeOpacity={0.8}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Lock height={22} style={this.state.selectedVisibleContent == "Light" ? styles.buttonIconSelected : styles.buttonIcon} />
                            <Text style={[this.state.selectedVisibleContent == "Light" ? styles.visibleContentTextSelected : styles.visibleContentText, {fontWeight: 'bold'}]}>{i18n.t('privateAccount')}</Text>
                        </View>
                        <View>
                            {this.state.selectedVisibleContent == "Light" && <View style={styles.checkIconContainer}><Check width={17} style={styles.checkIcon}/></View>}
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.footer}>
                    <View style={styles.footerBorder} />
                    <Text style={styles.footerTitle}>{i18n.t('learnMorePrivacyAboki')}</Text>
                    <TouchableOpacity
                        style={styles.footerButton}
                        onPress={() => {  }}
                        activeOpacity={0.8}>
                            <Text>{i18n.t('privacyPolicy')}</Text>
                            <AngleRight width={16} style={styles.angleRightIcon}/>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.footerButton}
                        onPress={() => {  }}
                        activeOpacity={0.8}>
                            <Text>{i18n.t('contactUs')}</Text>
                            <AngleRight width={16} style={styles.angleRightIcon}/>
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