import React, {Component} from 'react'
import {Text, View, StyleSheet, TextInput, TouchableOpacity, FlatList} from 'react-native'

import * as G from '../service/global'
import MemberCard from '../components/MemberCard';
import GroupCard from '../components/GroupCard';

// Largeur des items
const size = G.wSC / G.numColumns - 10;

export default class Search extends Component {
    constructor(props) {
        super(props);

        // Etats
        this.state = {
            inputSearch: '',
            members: [
                {
                    id: 1,
                    image: 'https://nextbigwhat.com/wp-content/uploads/2019/02/AI-thispersondoesnotexist.jpg',
                    name: 'Eli',
                    surname: 'Hahnemann',
                    age: '22',
                    langues: [
                        '😀',
                        '🤣',
                        '🥱'
                    ],
                    study: 'DUT Génie Mécanique',
                    place: 'Dijon'
                },
                {
                    id: 2,
                    image: 'https://static.wikia.nocookie.net/inazuma-eleven/images/5/51/KazemaruwithRaimon.png/revision/latest?cb=20130525085733&path-prefix=fr',
                    name: 'Nathan',
                    surname: 'Swift',
                    age: '19',
                    langues: [
                        '🌴',
                        '🎨'
                    ],
                    study: 'Licence Chimie',
                    place: 'Auxerre'
                },
                {
                    id: 3,
                    image: 'https://i.imgur.com/jt3KtM8.jpeg',
                    name: 'Angelica',
                    surname: 'Brown',
                    age: '23',
                    langues: [
                        '🦒',
                        '👽'
                    ],
                    study: 'FAC de Science',
                    place: 'Nevers'
                }
            ],
            groups: [
                {
                    id: 1,
                    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Logo_Crous_vectoris%C3%A9.svg/800px-Logo_Crous_vectoris%C3%A9.svg.png',
                    name: 'Crous Dijon',
                    nbParticipants: 147
                },
                {
                    id: 2,
                    image: 'https://iutdijon.u-bourgogne.fr/www/wp-content/uploads/2021/10/DL_LP_site_IUT.png',
                    name: 'LP MN DDIM',
                    nbParticipants: 14
                },
                {
                    id: 3,
                    image: 'https://www.lacanau.fr/wp-content/uploads/2020/06/Tournoi-de-tennis-945x630.jpg',
                    name: 'Tennis Club Dijon',
                    nbParticipants: 78
                }
            ]
        }
    }

    onChangeSearch = (text) => {
        this.setState({inputSearch:text})
    }
    onFocusSearch = () => {
        this.setState({inputSearch: ''})
    }

    onSelectMember = () => {
        // TODO
    }
    onSelectGroup = () => {
        // TODO
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
                    <TouchableOpacity style={styles.buttonContainer} activeOpacity={.8}>
                        <Text style={styles.buttonText}>Personnes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonContainer} activeOpacity={.8}>
                        <Text style={styles.buttonText}>Groupes</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.subtitleText}>Personnes qui pourraient vous aider</Text>
                <View style={styles.membersContainer}>
                    <FlatList
                        data={this.state.members}
                        renderItem={({item, index}) => <MemberCard member={item} index={index} onSelectMember={this.onSelectMember}/>}
                        keyExtractor={item => item.id}
                        horizontal={true}
                        style={{overflow: 'visible', alignSelf: 'flex-start'}}
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
                <Text style={styles.subtitleText}>Groupes qui pourraient vous intéresser</Text>
                <View style={styles.groupsContainer}>
                    <FlatList
                        data={this.state.groups}
                        renderItem={({item, index}) => <GroupCard group={item} index={index} onSelectGroup={this.onSelectGroup}/>}
                        keyExtractor={item => item.id}
                        horizontal={true}
                        style={{overflow: 'visible', alignSelf: 'flex-start'}}
                        showsHorizontalScrollIndicator={false}
                    />
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

    buttonText: {
        color: '#EF835E',
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
    }
})