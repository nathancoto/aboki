import React, {Component} from 'react'
import {Text, View, StyleSheet, TextInput, TouchableOpacity, FlatList} from 'react-native'

import * as G from '../service/global'
import * as Services from '../service/Api';

import MemberCard from '../components/MemberCard';
import MemberListCard from '../components/MemberListCard';
import GroupCard from '../components/GroupCard';
import GroupListCard from '../components/GroupListCard';

// Largeur des items
const size = G.wSC / G.numColumns - 10;

export default class Search extends Component {
    constructor(props) {
        super(props);

        // Etats
        this.state = {
            inputSearch: '',
            displayUsers: false,
            displayGroups: false
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
        this.props.navigation.navigate('Group', {id: id});
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
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    <TextInput
                            style={styles.input}
                            placeholder={'Rechercher'}
                            placeholderTextColor={'black'}

                            // Valeur à afficher par défaut dans le champ de recherche
                            value={this.state.inputSearch}

                            // Events
                            onChangeText = {this.onChangeSearch}
                            onFocus = {this.onFocusSearch}/>
                </View>
                <View style={styles.buttonWrapper}>
                    <TouchableOpacity style={this.state.displayUsers == true ? styles.buttonContainerActive : styles.buttonContainer} activeOpacity={.8} onPress={this.displayUsers}>
                        <Text style={this.state.displayUsers == true ? styles.buttonTextActive : styles.buttonText}>Personnes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={this.state.displayGroups == true ? styles.buttonContainerActive : styles.buttonContainer} activeOpacity={.8} onPress={this.displayGroups}>
                        <Text style={this.state.displayGroups == true ? styles.buttonTextActive : styles.buttonText}>Groupes</Text>
                    </TouchableOpacity>
                </View>
                {
                    this.state.displayUsers == true ?
                        <FlatList
                            data={this.state.members}
                            renderItem={({item, index}) => <MemberListCard member={item.member} id={item.id} index={index} onSelectMember={this.onSelectMember}/>}
                            keyExtractor={item => item.id}
                            style={styles.flatlist}
                            showsVerticalScrollIndicator={false}
                        />
                    : this.state.displayGroups == true ?
                        <FlatList
                            data={this.state.groups}
                            renderItem={({item, index}) => <GroupListCard group={item.group} id={item.id} index={index} onSelectGroup={this.onSelectGroup}/>}
                            keyExtractor={item => item.id}
                            style={styles.flatlist}
                            showsVerticalScrollIndicator={false}
                        />
                    :
                    <>
                        <Text style={styles.subtitleText}>Personnes qui pourraient vous aider</Text>
                        <View style={styles.membersContainer}>
                            <FlatList
                                data={this.state.members}
                                renderItem={({item, index}) => <MemberCard member={item.member} id={item.id} index={index} onSelectMember={this.onSelectMember}/>}
                                keyExtractor={(item, index) => index.toString()}
                                horizontal={true}
                                style={{overflow: 'visible', alignSelf: 'flex-start'}}
                                showsHorizontalScrollIndicator={false}
                            />
                        </View>
                        <Text style={styles.subtitleText}>Groupes qui pourraient vous intéresser</Text>
                        <View style={styles.groupsContainer}>
                            <FlatList
                                data={this.state.groups}
                                renderItem={({item, index}) => <GroupCard group={item.group} id={item.id} index={index} onSelectGroup={this.onSelectGroup}/>}
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