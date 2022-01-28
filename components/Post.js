import React, {Component} from 'react'
import {Text, View, StyleSheet, Image, FlatList, ScrollView, TouchableOpacity} from 'react-native'

import * as G from '../service/global'
import { findGroupByID } from '../service/Api';

// Largeur des items
const size = G.wSC / G.numColumns - 10;

export default class Post extends Component {
    constructor(props) {
        super(props);

        // Etats
        this.state = {
            width: 50,
            height: 50,
            group: {
                name: '',
                avatar: ''
            }
        }
    }

    componentDidMount = () => {
        Image.getSize(this.props.post.acf.image_de_publication, (width, height) => {
           this.setState({width, height});
        });

        findGroupByID(this.props.post.acf.groupe.ID).then(json => {
            this.setState({
                group: {
                    name: json.acf.nom_du_groupe,
                    avatar: json.acf.photo_de_profil_du_groupe
                }
            })
        });
     }

    render() {
        const post = this.props.post;
        // console.log(post);

        let timeCreated = post.date;
        let timeDiff = (new Date() - new Date(timeCreated)) / 1000;
        let timeDiffElement;
        
        if(timeDiff < 60) { // less than 1 min
            timeDiffElement = <Text style={styles.timeDiff}>{Math.round(timeDiff)}s</Text>
        } else if(timeDiff < 3600) { // less than 1 hour
            timeDiffElement = <Text style={styles.timeDiff}>{Math.round(timeDiff / 60)}min</Text>
        } else if(timeDiff < 86400) { // less than 1 day
            timeDiffElement = <Text style={styles.timeDiff}>{Math.round(timeDiff / 3600)}h</Text>
        } else if(timeDiff < 604800) { // less than 1 week
            timeDiffElement = <Text style={styles.timeDiff}>{Math.round(timeDiff / 86400)}j</Text>
        } else {
            timeDiffElement = <Text style={styles.timeDiff}>{Math.round(timeDiff / 604800)} semaines</Text>
        }

        return(
            <TouchableOpacity style={styles.wrapper} activeOpacity={.5}>
                <View style={styles.postContainer}>
                    <View style={[styles.side, styles.sideUp]}>
                        <View style={styles.postHeader}>
                            {this.state.group.avatar !== '' ? 
                                <Image source={{uri: this.state.group.avatar}} style={styles.headerImage}/>
                                : <View style={styles.headerImage} />
                            }
                            <Text style={styles.title}>{this.state.group.name}</Text>
                            {timeDiffElement}
                        </View>
                        <Text style={styles.text}>{post.acf.texte_de_la_publication}</Text>
                    </View>
                    <View style={[styles.side, styles.sideDown]}>
                        <Image source={{uri: post.acf.image_de_publication}} style={[styles.image, {aspectRatio: this.state.height !== null ? this.state.width / this.state.height : 1}]}/>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        paddingVertical: 10
    },

    postContainer: {
        width: '90%',
        marginLeft: '5%',
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderRadius: 20,
        backgroundColor: 'white',

        flexDirection: 'column',

        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 0,
        },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 10
    },

    side: {
        flex: 1,
        marginHorizontal: 10
    },

    sideUp: {
        marginVertical: 0
    },

    sideDown: {
        marginVertical: 10
    },

    postHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginBottom: 10
    },

    headerImage: {
        borderRadius: 15,
        width: 30,
        height: 30,
        borderWidth: 1,
        borderColor: '#EF835E',
        marginRight: 5
    },

    title: {
        fontSize: 15
    },

    timeDiff: {
        position: 'absolute',
        right: 0,
        color: 'grey'
    },

    text: {
        fontSize: 12,
        color: 'black',
        width: '100%'
    },

    image: {
        borderRadius: 10,
        resizeMode: 'contain'
    }
})