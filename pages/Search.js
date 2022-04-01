import React, {Component} from 'react'
import {Text, View, StyleSheet, TextInput, TouchableOpacity, FlatList} from 'react-native'

import * as G from '../service/global'
import * as Services from '../service/Api';

import MemberCard from '../components/MemberCard';
import MemberListCard from '../components/MemberListCard';
import GroupCard from '../components/GroupCard';
import GroupListCard from '../components/GroupListCard';
import i18n from 'i18n-js';

// Largeur des items
const size = G.wSC / G.numColumns - 10;

export default class Search extends Component {
    constructor(props) {
        super(props);

        // Etats
        this.state = {
            inputSearch: '',
            displayUsers: false,
            displayGroups: false,
            members: [],
            groups: []
        }

        this.findUsers();
        this.findGroups();
    }

    findUsers() {
        let users = [];
        Services.findAllProfiles().then(json => {
            json.forEach(element => {
                users.push({id: element.id, member: element.acf});
            });
            this.setState({
                members: users
            });
        })
    }

    findGroups() {
        let groups = [];
        Services.findAllGroups().then(json => {
            json.forEach(element => {
                groups.push({id: element.id, group: element.acf});
            });
            this.setState({
                groups: groups
            });
        })
    }

    onChangeSearch = (text) => {
        this.setState({inputSearch:text})
    }
    onFocusSearch = () => {
        this.setState({inputSearch: ''})
    }

    onSelectMember = (id) => {
        this.props.navigation.navigate('Profil', {id: id});
    }

    onSelectGroup = (id) => {
        this.props.navigation.navigate('Group', {id: id, navigation: this.props.navigation});
    }

    displayUsers = () => {
        if(this.state.displayUsers == true) {
            this.setState({
                displayUsers: false,
                displayGroups: false
            });
        } else {
            this.setState({
                displayUsers: true,
                displayGroups: false
            });
        }
    }

    displayGroups = () => {
        if(this.state.displayGroups == true) {
            this.setState({
                displayUsers: false,
                displayGroups: false
            });
        } else {
            this.setState({
                displayUsers: false,
                displayGroups: true
            });
        }
    }

    render() {
        return(
            <View style={[styles.container, this.props.appTheme == "Dark" ? darkTheme.container : null]}>
                <View style={[styles.inputContainer, this.props.appTheme == "Dark" ? darkTheme.inputContainer : null]}>
                    <TextInput
                            style={[styles.input, this.props.appTheme == "Dark" ? darkTheme.input : null]}
                            placeholder={i18n.t('search')}
                            placeholderTextColor={this.props.appTheme == "Dark" ? 'white' : 'black'}

                            // Valeur à afficher par défaut dans le champ de recherche
                            value={this.state.inputSearch}

                            // Events
                            onChangeText = {this.onChangeSearch}
                            onFocus = {this.onFocusSearch}/>
                </View>
                <View style={[styles.buttonWrapper, this.props.appTheme == "Dark" ? darkTheme.buttonWrapper : null]}>
                    <TouchableOpacity style={this.state.displayUsers == true ? (this.props.appTheme == "Dark" ? darkTheme.buttonContainerActive : styles.buttonContainerActive) : (this.props.appTheme == "Dark" ? darkTheme.buttonContainer : styles.buttonContainer)} activeOpacity={.8} onPress={this.displayUsers}>
                        <Text style={this.state.displayUsers == true ? (this.props.appTheme == "Dark" ? darkTheme.buttonTextActive : styles.buttonTextActive) : (this.props.appTheme == "Dark" ? darkTheme.buttonText : styles.buttonText)}>{i18n.t('users')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={this.state.displayGroups == true ? (this.props.appTheme == "Dark" ? darkTheme.buttonContainerActive : styles.buttonContainerActive) : (this.props.appTheme == "Dark" ? darkTheme.buttonContainer : styles.buttonContainer)} activeOpacity={.8} onPress={this.displayGroups}>
                        <Text style={this.state.displayGroups == true ? (this.props.appTheme == "Dark" ? darkTheme.buttonTextActive : styles.buttonTextActive) : (this.props.appTheme == "Dark" ? darkTheme.buttonText : styles.buttonText)}>{i18n.t('groups')}</Text>
                    </TouchableOpacity>
                </View>
                {
                    this.state.displayUsers == true ?
                        <FlatList
                            data={this.state.inputSearch.length > 0 ? this.state.members.filter(member => member.member.surname.includes(this.state.inputSearch) || member.member.name.includes(this.state.inputSearch)) : this.state.members}
                            renderItem={({item, index}) => <MemberListCard member={item.member} id={item.id} index={index} onSelectMember={this.onSelectMember} appTheme={this.props.appTheme}/>}
                            keyExtractor={(item, index) => index.toString()}
                            style={styles.flatlist}
                            showsVerticalScrollIndicator={false}
                        />
                    : this.state.displayGroups == true ?
                        <FlatList
                            data={this.state.inputSearch.length > 0 ? this.state.groups.filter(group => group.group.nom_du_groupe.includes(this.state.inputSearch)) : this.state.groups}
                            renderItem={({item, index}) => <GroupListCard group={item.group} id={item.id} index={index} onSelectGroup={this.onSelectGroup} appTheme={this.props.appTheme}/>}
                            keyExtractor={(item, index) => index.toString()}
                            style={styles.flatlist}
                            showsVerticalScrollIndicator={false}
                        />
                    : this.state.inputSearch.length > 0 ?
                    <View style={{alignItems: 'flex-start', flexDirection: 'column', width: '100%'}}>
                        <FlatList
                            data={this.state.inputSearch.length > 0 ? this.state.members.filter(member => member.member.surname.includes(this.state.inputSearch) || member.member.name.includes(this.state.inputSearch)) : this.state.members}
                            renderItem={({item, index}) => <MemberListCard member={item.member} id={item.id} index={index} onSelectMember={this.onSelectMember} appTheme={this.props.appTheme}/>}
                            keyExtractor={(item, index) => index.toString()}
                            style={styles.flatlist}
                            showsVerticalScrollIndicator={false}
                        />
                        <FlatList
                            data={this.state.inputSearch.length > 0 ? this.state.groups.filter(group => group.group.nom_du_groupe.includes(this.state.inputSearch)) : this.state.groups}
                            renderItem={({item, index}) => <GroupListCard group={item.group} id={item.id} index={index} onSelectGroup={this.onSelectGroup} appTheme={this.props.appTheme}/>}
                            keyExtractor={(item, index) => index.toString()}
                            style={styles.flatlist}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>
                    :
                    <>
                        <Text style={[styles.subtitleText, this.props.appTheme == "Dark" ? darkTheme.subtitleText : null]}>{i18n.t('usersWhoHelpYou')}</Text>
                        <View style={[styles.membersContainer, this.props.appTheme == "Dark" ? darkTheme.membersContainer : null]}>
                            <FlatList
                                data={this.state.members}
                                renderItem={({item, index}) => <MemberCard member={item.member} id={item.id} index={index} onSelectMember={this.onSelectMember} appTheme={this.props.appTheme}/>}
                                keyExtractor={(item, index) => index.toString()}
                                horizontal={true}
                                style={{overflow: 'visible', alignSelf: 'flex-start'}}
                                showsHorizontalScrollIndicator={false}
                            />
                        </View>
                        <Text style={[styles.subtitleText, this.props.appTheme == "Dark" ? darkTheme.subtitleText : null]}>{i18n.t('groupsMightInterestYou')}</Text>
                        <View style={[styles.groupsContainer, this.props.appTheme == "Dark" ? darkTheme.groupsContainer : null]}>
                            <FlatList
                                data={this.state.groups}
                                renderItem={({item, index}) => <GroupCard group={item.group} id={item.id} index={index} onSelectGroup={this.onSelectGroup} appTheme={this.props.appTheme}/>}
                                keyExtractor={(item, index) => index.toString()}
                                horizontal={true}
                                style={{overflow: 'visible', alignSelf: 'flex-start'}}
                                showsHorizontalScrollIndicator={false}
                            />
                        </View>
                    </>
                }
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
        paddingTop: 50,
        paddingHorizontal: '5%'
    },

    inputContainer: {
        width: '100%',
        height: 53,
        paddingHorizontal: 20,
        marginBottom: 10,
        borderRadius: 10,
        backgroundColor: 'white',

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 10
    },

    input: {
        width: '100%',
        height: '100%',
        color: 'black',
        fontSize: 14
    },

    buttonWrapper: {
        width: '100%',
        height: 50,
        marginVertical: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },

    buttonContainer: {
        width: '47%',
        borderColor: '#EF835E',
        borderRadius: 8,
        borderWidth: 2,
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginHorizontal: 10
    },

    buttonContainerActive: {
        width: '47%',
        borderColor: '#EF835E',
        backgroundColor: '#EF835E',
        borderRadius: 8,
        borderWidth: 2,
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginHorizontal: 10
    },

    buttonText: {
        color: '#EF835E',
        fontWeight: 'bold',
        textAlign: 'center'
    },

    buttonTextActive: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center'
    },

    subtitleText: {
        fontSize: 16,
        fontWeight: 'bold',
        alignSelf: 'flex-start',
        marginVertical: 20
    },

    membersContainer: {
        height: 200,
        marginBottom: 20
    },

    groupsContainer: {
        height: 180
    },

    flatlist: {
        width: '100%',
        overflow: 'scroll'
    }
})

const darkTheme = StyleSheet.create({
    container: {
        backgroundColor: "#0d0f15",
    },

    inputContainer: {
        backgroundColor: '#0d0f15',
        shadowColor: "#fff",
    },

    input: {
        color: 'white',
    },

    buttonWrapper: {
        
    },

    buttonContainer: {
        width: '47%',
        borderColor: '#EF835E',
        borderRadius: 8,
        borderWidth: 2,
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginHorizontal: 10
    },

    buttonContainerActive: {
        width: '47%',
        borderColor: '#EF835E',
        backgroundColor: '#EF835E',
        borderRadius: 8,
        borderWidth: 2,
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginHorizontal: 10
    },

    buttonText: {
        color: '#EF835E',
        fontWeight: 'bold',
        textAlign: 'center'
    },

    buttonTextActive: {
        color: '#0d0f15',
        fontWeight: 'bold',
        textAlign: 'center'
    },

    subtitleText: {
        color: 'white'
    },

    membersContainer: {
        
    },

    groupsContainer: {
        
    },

    flatlist: {
        
    }
})