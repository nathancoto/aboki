import React, {Component} from 'react'
import {Text, View, StyleSheet, TextInput, TouchableOpacity, FlatList} from 'react-native'
import MessagePreview from '../components/MessagePreview';

import * as G from '../service/global'

// Largeur des items
const size = G.wSC / G.numColumns - 10;

export default class Messages extends Component {
    constructor(props) {
        super(props);

        // Etats
        this.state = {
            messages: [
                {
                    id: 1,
                    image: 'https://nextbigwhat.com/wp-content/uploads/2019/02/AI-thispersondoesnotexist.jpg',
                    name: 'Eli Hahnemann',
                    message: 'ok, à plus tard !',
                    timeDiff: '3h',
                    read: true
                },
                {
                    id: 2,
                    image: 'https://static.wikia.nocookie.net/inazuma-eleven/images/5/51/KazemaruwithRaimon.png/revision/latest?cb=20130525085733&path-prefix=fr',
                    name: 'Nathan Swift',
                    message: 'i will do that later, for sure',
                    timeDiff: '5h',
                    read: false
                },
                {
                    id: 3,
                    image: 'https://i.imgur.com/jt3KtM8.jpeg',
                    name: 'Angelica Brown',
                    message: 'Invitation à discuter',
                    timeDiff: '3j',
                    read: true
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

    // Afficher la page de détail du film
    onSelectMessage = (message) => {
        this.props.navigation.navigate('MessageDetail', {message: message});
    }

    render() {
        return(
            <View style={styles.container}>
                <View style={styles.inputWrapper}>
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
                </View>
                <FlatList
                        data={this.state.messages}
                        renderItem={({item, index}) => <MessagePreview message={item} index={index} onSelectMessage={this.onSelectMessage}/>}
                        keyExtractor={item => item.id}
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