import React, {Component} from 'react'
import {Text, View, StyleSheet, TextInput, TouchableOpacity, FlatList} from 'react-native'
import MessagePreview from '../components/MessagePreview';

import axios from 'axios';
import * as G from '../service/global'
import * as Services from '../service/Api';

// Largeur des items
const size = G.wSC / G.numColumns - 10;

export default class Messages extends Component {
    constructor(props) {
        super(props);

        // Etats
        this.state = {
            messages: []
        }
    }
    
    parseUserData() {
        this.setState({
            userData: JSON.parse(this.props.userData)
        }, () => {
            this.getConversations();
        });
    }
    
    componentDidMount() {
        this.parseUserData();
    }

    onChangeSearch = (text) => {
        this.setState({inputSearch:text})
    }
    onFocusSearch = () => {
        this.setState({inputSearch: ''})
    }

    onSelectMessage = (message) => {
        this.props.navigation.navigate('MessageDetail', {message: message});
    }

    getConversations() {
        const bddUrl = 'https://dev-aboki.pantheonsite.io/wp-content/plugins/aboki-data-handler/aboki-data-handler.php';

        axios.post(bddUrl,
                {
                    friend_user: this.state.userData.id
                },
                {timeout: 10000})
            .then((response) => {
                response.data.forEach(el => {
                    let elJson = JSON.parse(el);
                    Services.findProfileByID(elJson.friend_id).then(json => {
                        let messages = this.state.messages;

                        let timeOrigin = parseInt(elJson.friend_date);
                        let timeDiff = (new Date() - new Date(timeOrigin)) / 1000;
                        
                        if(timeDiff < 60) { // less than 1 min
                            timeDiff = Math.round(timeDiff) + 's';
                        } else if(timeDiff < 3600) { // less than 1 hour
                            timeDiff = Math.round(timeDiff / 60) + 'min';
                        } else if(timeDiff < 86400) { // less than 1 day
                            timeDiff = Math.round(timeDiff / 3600) + 'h';
                        } else if(timeDiff < 604800) { // less than 1 week
                            timeDiff = Math.round(timeDiff / 86400) + 'j';
                        } else {
                            timeDiff = Math.round(timeDiff / 604800) + 'semaines';
                        }

                        messages.push({
                            id: elJson.friend_id,
                            image: json.acf.photo_de_profil,
                            name: json.acf.surname + ' ' + json.acf.name,
                            mail: json.acf.adresse_mail,
                            message: elJson.friend_message,
                            timeDiff: timeDiff,
                            read: true
                        })
                        this.setState({
                            messages: messages
                        })
                    });
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        return(
            <View style={[styles.container, this.props.appTheme == "Dark" ? darkTheme.container : null]}>
                <View style={[styles.inputWrapper, this.props.appTheme == "Dark" ? darkTheme.inputWrapper : null]}>
                    <View style={[styles.inputContainer, this.props.appTheme == "Dark" ? darkTheme.inputContainer : null]}>
                        <TextInput
                                style={styles.input}
                                placeholder={'Rechercher'}
                                placeholderTextColor={this.props.appTheme == "Dark" ? 'white' : 'black'}

                                // Valeur à afficher par défaut dans le champ de recherche
                                value={this.state.inputSearch}

                                // Events
                                onChangeText = {this.onChangeSearch}
                                onFocus = {this.onFocusSearch}/>
                    </View>
                </View>
                <FlatList
                    data={this.state.messages}
                    renderItem={({item, index}) => <MessagePreview message={item} index={index} onSelectMessage={this.onSelectMessage} appTheme={this.props.appTheme}/>}
                    keyExtractor={(item, index) => index.toString()}
                    style={{overflow: 'visible', alignSelf: 'flex-start'}}
                    showsVerticalScrollIndicator={false}
                />
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

    inputWrapper: {
        width: '100%',
        backgroundColor: 'white',
        height: 103,
        marginBottom: 23,
        paddingTop: 50,
        paddingHorizontal: 0,
        zIndex: 9
    },

    inputContainer: {
        width: 'auto',
        height: 53,
        paddingHorizontal: 20,
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
})

const darkTheme = StyleSheet.create({
    container: {
        backgroundColor: "#0d0f15",
    },

    inputWrapper: {
        backgroundColor: '#0d0f15',
    },

    inputContainer: {
        backgroundColor: '#0d0f15',
        shadowColor: "#fff",
    },

    input: {
        color: 'white',
    },
})