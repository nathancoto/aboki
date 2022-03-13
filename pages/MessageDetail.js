import React, {Component} from 'react'
import {Text, View, StyleSheet, Image, FlatList, ScrollView, Dimensions} from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';

import * as G from '../service/global'
import MessageItem from '../components/MessageItem';
import axios from 'axios';
import * as Services from '../service/Api';

// Import des icônes
import GoBack from '../assets/arrow-left.svg';
import Phone from '../assets/phone.svg';
import Info from '../assets/info.svg';
import SendMessage from '../assets/send-message.svg';

// Largeur des items
const size = G.wSC / G.numColumns - 10;
const screenWidth = Dimensions.get('window').width;
const screenWidthPadding = Dimensions.get('window').width - (Dimensions.get('window').width / 10);

export default class MessageDetail extends Component {
    constructor(props) {
        super(props);

        this.message = this.props.route.params.message;

        // Etats
        this.state = {
            inputMessage: '',
            accepted: true,
            hasAccepted: true,
            messages: []
        }
    }
    
    componentDidMount() {
        this.parseUserData();
    }

    parseUserData() {
        this.setState({
            userData: JSON.parse(this.props.userData)
        }, () => {
            this.getConversation();
        });
    }

    getConversation() {
        const bddUrl = 'https://dev-aboki.pantheonsite.io/wp-content/plugins/aboki-data-handler/aboki-data-handler.php';

        axios.post(bddUrl,
                {
                    conversation_sender: this.state.userData.mail,
                    conversation_receiver: this.message.mail
                },
                {timeout: 10000})
            .then((response) => {
                response.data.forEach(el => {
                    let messages = this.state.messages;
                    messages.push({
                        message: el.message,
                        fromMe: el.sender == this.state.userData.mail ? true : false,
                        date: el.date
                    })
                    this.setState({
                        messages: messages
                    })
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    onChangeMessage = (text) => {
        this.setState({inputMessage:text})
    }
    onFocusMessage = () => {
        this.setState({inputMessage: ''})
    }

    renderMessages = () => {
        if(this.state.messages.length == 0) {
            return(
                <View style={[accepted.infoContainer, this.props.appTheme == "Dark" ? acceptedDark.infoContainer : null]}>
                    <Image source={{uri: this.message.image}} style={[hasToAccept.image, this.props.appTheme == "Dark" ? hasToAcceptDark.image : null]} />
                    <Text style={[hasToAccept.name, this.props.appTheme == "Dark" ? hasToAcceptDark.name : null]}>{this.message.name}</Text>
                    <Text style={[hasToAccept.text, this.props.appTheme == "Dark" ? hasToAcceptDark.text : null]}>
                        {this.state.hasAccepted == true ?
                            'Vous avez accepté l\'invitation, bonne discussion !'
                            :
                            'Cette personne a accepté votre invitation, bonne discussion !'
                        }
                    </Text>
                </View>
            )
        } else {
            return(
                <View style={[styles.listContainer, this.props.appTheme == "Dark" ? darkTheme.listContainer : null]}>
                    <FlatList
                        data={this.state.messages}
                        renderItem={({item, index}) => <MessageItem message={item} index={index} otherData={this.message} appTheme={this.props.appTheme}/>}
                        keyExtractor={(item, index) => index.toString()}
                        showsVerticalScrollIndicator={false}
                        style={{overflow: 'visible'}}
                        contentContainerStyle={{
                            flexDirection: 'column-reverse',
                            justifyContent: 'flex-end'
                        }}
                        inverted={true}
                    />
                </View>
            )
        }
    }

    sendMessage = () => {
        if(this.state.inputMessage !== "") {
            const bddUrl = 'https://dev-aboki.pantheonsite.io/wp-content/plugins/aboki-data-handler/aboki-data-handler.php';
    
            axios.post(bddUrl,
                    {
                        message: this.state.inputMessage,
                        sender: this.state.userData.mail,
                        receiver: this.message.mail,
                        date: Date.now()
                    },
                    {timeout: 10000})
                .then((response) => {
                    if(this.state.inputMessage !== '') {
                        this.setState({
                            messages: [
                                ...this.state.messages,
                                {
                                    id: this.state.messages.length + 1,
                                    message: this.state.inputMessage,
                                    fromMe: true
                                }
                            ],
                            inputMessage: ''
                        })
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }

    render() {
        return(
            <View style={[styles.container, this.props.appTheme == "Dark" ? darkTheme.container : null]}>
                <View style={[styles.header, this.props.appTheme == "Dark" ? darkTheme.header : null]}>
                    <View style={[styles.headerSide, this.props.appTheme == "Dark" ? darkTheme.headerSide : null]}>
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
                        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}} activeOpacity={0.8} onPress={() => { this.props.navigation.navigate('Profil', {id: this.message.id}); }}>
                            <Image source={{uri: this.message.image}} style={[styles.image, this.props.appTheme == "Dark" ? darkTheme.image : null]} />
                            <Text style={[styles.name, this.props.appTheme == "Dark" ? darkTheme.name : null]}>{this.message.name}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.headerSide, this.props.appTheme == "Dark" ? darkTheme.headerSide : null]}>
                        <TouchableOpacity
                            style={[styles.backButtonContainer, {marginHorizontal: 10}, this.props.appTheme == "Dark" ? darkTheme.backButtonContainer : null]}
                            onPress={() => {
                                // TODO
                            }}
                            activeOpacity={0.8}>
                            <View style={[styles.backButton, this.props.appTheme == "Dark" ? darkTheme.backButton : null]}>
                                <Phone style={[styles.backButtonIcon, this.props.appTheme == "Dark" ? darkTheme.backButtonIcon : null]} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.backButtonContainer, this.props.appTheme == "Dark" ? darkTheme.backButtonContainer : null]}
                            onPress={() => {
                                // TODO
                            }}
                            activeOpacity={0.8}>
                            <View style={[styles.backButton, this.props.appTheme == "Dark" ? darkTheme.backButton : null]}>
                                <Info style={[styles.backButtonIcon, this.props.appTheme == "Dark" ? darkTheme.backButtonIcon : null]} />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                {this.state.accepted == true ?
                    <View style={[accepted.container, this.props.appTheme == "Dark" ? acceptedDark.container : null]}>
                        {this.renderMessages()}
                        <View style={[accepted.inputWrapper, this.props.appTheme == "Dark" ? acceptedDark.container : null]}>
                            <View style={[accepted.inputContainer, this.props.appTheme == "Dark" ? acceptedDark.inputContainer : null]}>
                                <TextInput
                                    style={[accepted.input, this.props.appTheme == "Dark" ? acceptedDark.input : null]}
                                    placeholder={'Message ...'}
                                    placeholderTextColor={this.props.appTheme == "Dark" ? 'white' : 'black'}

                                    // Valeur à afficher par défaut dans le champ de recherche
                                    value={this.state.inputMessage}

                                    // Events
                                    onChangeText = {this.onChangeMessage}
                                    onFocus = {this.onFocusMessage}/>
                                <TouchableOpacity
                                    style={[accepted.sendMessageIconContainer, this.props.appTheme == "Dark" ? acceptedDark.sendMessageIconContainer : null]}
                                    onPress={() => {
                                        this.sendMessage()
                                    }}
                                    activeOpacity={0.8}
                                >
                                    <SendMessage style={[accepted.sendMessageIcon, this.props.appTheme == "Dark" ? acceptedDark.sendMessageIcon : null]} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    :
                    <View style={[hasToAccept.container, this.props.appTheme == "Dark" ? hasToAcceptDark.container : null]}>
                        <Image source={{uri: this.message.image}} style={[hasToAccept.image, this.props.appTheme == "Dark" ? hasToAcceptDark.image : null]} />
                        <Text style={[hasToAccept.name, this.props.appTheme == "Dark" ? hasToAcceptDark.name : null]}>{this.message.name}</Text>
                        <Text style={[hasToAccept.text, this.props.appTheme == "Dark" ? hasToAcceptDark.text : null]}>Cette personne souhaite discuter avec vous.</Text>
                        <TouchableOpacity
                            style={[hasToAccept.buttonOutline, this.props.appTheme == "Dark" ? hasToAcceptDark.buttonOutline : null]}
                            onPress={() => {
                                // TODO
                            }}
                            activeOpacity={.8}>
                            <Text style={[hasToAccept.buttonOutlineText, this.props.appTheme == "Dark" ? hasToAcceptDark.buttonOutlineText : null]}>Voir son profil</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[hasToAccept.buttonFill, this.props.appTheme == "Dark" ? hasToAcceptDark.buttonFill : null]}
                            onPress={() => {
                                this.setState({
                                    accepted: true
                                });
                            }}
                            activeOpacity={.8}>
                            <Text style={[hasToAccept.buttonFillText, this.props.appTheme == "Dark" ? hasToAcceptDark.buttonFillText : null]}>Accepter l'invitation</Text>
                        </TouchableOpacity>
                    </View>
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
        paddingHorizontal: '5%',
        zIndex: 9
    },

    header: {
        paddingHorizontal: '5%',
        paddingTop: 40,
        width: screenWidth,
        height: '15%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        zIndex: 9,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 10
    },

    headerSide: {
        flexDirection: 'row',
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

    image: {
        width: 38,
        height: 38,
        borderRadius: 18,
        marginHorizontal: 10
    },

    name: {
        fontWeight: 'bold',
        fontSize: 16
    },

    listContainer: {
        height: '90%'
    }
})

const hasToAccept = StyleSheet.create({
    container: {
        width: '100%',
        height: '75%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: '5%'
    },

    image: {
        width: 62,
        height: 62,
        borderRadius: 31
    },

    name: {
        fontSize: 16,
        fontWeight: 'bold',
        marginVertical: 10
    },

    text: {
        fontSize: 14,
        marginVertical: 10,
        textAlign: 'center'
    },

    buttonOutline: {
        borderRadius: 9,
        borderWidth: 3,
        borderColor: '#EF835E',
        width: screenWidthPadding,
        padding: 10,
        marginVertical: 10
    },

    buttonOutlineText: {
        color: '#EF835E',
        fontWeight: '600',
        fontSize: 16,
        textAlign: 'center'
    },

    buttonFill: {
        width: screenWidthPadding,
        padding: 12,
        backgroundColor: '#EF835E',
        borderRadius: 9
    },

    buttonFillText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center'
    }
})

const accepted = StyleSheet.create({
    container: {
        width: '100%',
        height: '85%',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },

    infoContainer: {
        width: '100%',
        height: '40%',
        marginBottom: '50%',
        alignItems: 'center',
        justifyContent: 'center'
    },

    image: {
        width: 62,
        height: 62,
        borderRadius: 31
    },

    name: {
        fontSize: 16,
        fontWeight: 'bold',
        marginVertical: 10
    },

    text: {
        fontSize: 14,
        marginVertical: 10
    },

    inputWrapper: {
        width: '110%',
        height: 99,
        backgroundColor: 'white',
        alignItems: 'center'
    },

    inputContainer: {
        width: '92%',
        height: 49,
        paddingHorizontal: 20,
        borderRadius: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',

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
        width: '92%',
        height: '100%',
        color: 'black',
        fontSize: 14
    },

    sendMessageIconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 34,
        height: 34,
        borderRadius: 17,
        backgroundColor: '#EF835E',
        paddingRight: 2,
        overflow: 'hidden'
    },

    sendMessageIcon: {
        width: 15,
        height: 15,
        color: 'white'
    }
})

const darkTheme = StyleSheet.create({
    container: {
        backgroundColor: "#0d0f15",
    },

    header: {
        backgroundColor: '#0d0f15',
        shadowColor: "#fff",
    },

    headerSide: {
        
    },

    backButtonContainer: {
        
    },

    backButton: {
        backgroundColor: '#EF835E',
    },

    backButtonIcon: {
        color: '#0d0f15'
    },

    image: {
        
    },

    name: {
        color: 'white'
    },

    listContainer: {
        
    }
})

const hasToAcceptDark = StyleSheet.create({
    container: {
        
    },

    image: {
        
    },

    name: {
        color: 'white'
    },

    text: {
        color: 'white'
    },

    buttonOutline: {
        borderColor: '#EF835E',
    },

    buttonOutlineText: {
        color: '#EF835E',
    },

    buttonFill: {
        backgroundColor: '#EF835E',
    },

    buttonFillText: {
        color: '#0d0f15',
    }
})

const acceptedDark = StyleSheet.create({
    container: {
        backgroundColor: '#0d0f15'
    },

    infoContainer: {
        
    },

    image: {
        
    },

    name: {
        color: 'white'
    },

    text: {
        color: 'white'
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

    sendMessageIconContainer: {
        backgroundColor: '#EF835E',
    },

    sendMessageIcon: {
        color: '#0d0f15'
    }
})