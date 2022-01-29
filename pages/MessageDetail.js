import React, {Component} from 'react'
import {Text, View, StyleSheet, Image, FlatList, ScrollView, Dimensions} from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';

import * as G from '../service/global'
import MessageItem from '../components/MessageItem';

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

        // Récupère le film passé en paramètre de la navigation (route)
        this.message = this.props.route.params.message;

        // Etats
        this.state = {
            inputMessage: '',
            accepted: true,
            hasAccepted: true,
            messages: [
                {
                    id: 1,
                    message: 'Salut ça va ?',
                    fromMe: false
                },
                {
                    id: 2,
                    message: 'Bien et toi ?',
                    fromMe: true
                }
            ]
        }
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
                <View style={accepted.infoContainer}>
                    <Image source={{uri: this.message.image}} style={hasToAccept.image} />
                    <Text style={hasToAccept.name}>{this.message.name}</Text>
                    <Text style={hasToAccept.text}>
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
                <View style={styles.listContainer}>
                    <FlatList
                        data={this.state.messages}
                        renderItem={({item, index}) => <MessageItem message={item} index={index} otherData={this.message}/>}
                        keyExtractor={item => item.id}
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
    }

    render() {
        return(
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.headerSide}>
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
                        <Image source={{uri: this.message.image}} style={styles.image} />
                        <Text style={styles.name}>{this.message.name}</Text>
                    </View>
                    <View style={styles.headerSide}>
                        <TouchableOpacity
                            style={[styles.backButtonContainer, {marginHorizontal: 10}]}
                            onPress={() => {
                                // TODO
                            }}
                            activeOpacity={0.8}>
                            <View style={styles.backButton}>
                                <Phone style={styles.backButtonIcon} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.backButtonContainer}
                            onPress={() => {
                                // TODO
                            }}
                            activeOpacity={0.8}>
                            <View style={styles.backButton}>
                                <Info style={styles.backButtonIcon} />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                {this.state.accepted == true ?
                    <View style={accepted.container}>
                        {this.renderMessages()}
                        <View style={accepted.inputWrapper}>
                            <View style={accepted.inputContainer}>
                                <TextInput
                                    style={accepted.input}
                                    placeholder={'Message ...'}
                                    placeholderTextColor={'black'}

                                    // Valeur à afficher par défaut dans le champ de recherche
                                    value={this.state.inputMessage}

                                    // Events
                                    onChangeText = {this.onChangeMessage}
                                    onFocus = {this.onFocusMessage}/>
                                <TouchableOpacity
                                    style={accepted.sendMessageIconContainer}
                                    onPress={() => {
                                        this.sendMessage()
                                    }}
                                    activeOpacity={0.8}
                                >
                                    <SendMessage style={accepted.sendMessageIcon} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    :
                    <View style={hasToAccept.container}>
                        <Image source={{uri: this.message.image}} style={hasToAccept.image} />
                        <Text style={hasToAccept.name}>{this.message.name}</Text>
                        <Text style={hasToAccept.text}>Cette personne souhaite discuter avec vous.</Text>
                        <TouchableOpacity
                            style={hasToAccept.buttonOutline}
                            onPress={() => {
                                // TODO
                            }}
                            activeOpacity={.8}>
                            <Text style={hasToAccept.buttonOutlineText}>Voir son profil</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={hasToAccept.buttonFill}
                            onPress={() => {
                                this.setState({
                                    accepted: true
                                });
                            }}
                            activeOpacity={.8}>
                            <Text style={hasToAccept.buttonFillText}>Accepter l'invitation</Text>
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