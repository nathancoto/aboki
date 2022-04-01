import React, {Component} from 'react'
import {Text, View, StyleSheet, Image, FlatList, ScrollView, TouchableOpacity} from 'react-native'

import * as G from '../service/global'
import { findGroupByID } from '../service/Api';
import i18n from 'i18n-js';

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

    onSelectGroup = (ide) => {
        // console.log(ide);
        // this.props.onSelectGroup(ide);
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
            timeDiffElement = <Text style={styles.timeDiff}>{Math.round(timeDiff / 60)}{i18n.t('minutes')}</Text>
        } else if(timeDiff < 86400) { // less than 1 day
            timeDiffElement = <Text style={styles.timeDiff}>{Math.round(timeDiff / 3600)}{i18n.t('hours')}</Text>
        } else if(timeDiff < 604800) { // less than 1 week
            timeDiffElement = <Text style={styles.timeDiff}>{Math.round(timeDiff / 86400)}{i18n.t('days')}</Text>
        } else {
            timeDiffElement = <Text style={styles.timeDiff}>{Math.round(timeDiff / 604800)}{i18n.t('weeks')}</Text>
        }
        return(
            <TouchableOpacity 
            style={[styles.wrapper, this.props.appTheme == "Dark" ? darkTheme.wrapper : null]} 
            onPress={() => {
                this.props.navigation.navigate('Post_Detail', {post:post});
            }}
            activeOpacity={.5}
            >
                <View style={[styles.postContainer, this.props.appTheme == "Dark" ? darkTheme.postContainer : null]}>
                    <View style={[styles.side, styles.sideUp, this.props.appTheme == "Dark" ? darkTheme.side : null]}>
                        <View style={[styles.sideHeader, this.props.appTheme == "Dark" ? darkTheme.sideHeader : null]}>
                            <TouchableOpacity
                                style={[styles.postHeader, this.props.appTheme == "Dark" ? darkTheme.postHeader : null]}
                                onPress={() => {
                                    this.props.onSelectGroup(post.acf.groupe.ID)
                                }}>
                                {this.state.group.avatar !== '' ? 
                                    <View style={[styles.headerImageContainer, this.props.appTheme == "Dark" ? darkTheme.headerImageContainer : null]}>
                                        <Image source={{uri: this.state.group.avatar}} style={[styles.headerImage, this.props.appTheme == "Dark" ? darkTheme.headerImage : null]}/>
                                    </View>
                                    : <View style={[styles.headerImage, this.props.appTheme == "Dark" ? darkTheme.headerImage : null]} />
                                }
                                <Text style={[styles.title, this.props.appTheme == "Dark" ? darkTheme.title : null]}>{this.state.group.name}</Text>
                            </TouchableOpacity>
                            {timeDiffElement}
                        </View>
                        <Text style={[styles.text, this.props.appTheme == "Dark" ? darkTheme.text : null]}>{post.acf.texte_de_la_publication}</Text>
                    </View>
                    {
                        post.acf.image_de_publication == null || post.acf.image_de_publication == false 
                        ?
                        <></>
                        :
                        <View style={[styles.side, styles.sideDown, this.props.appTheme == "Dark" ? darkTheme.side : null]}>
                            <Image source={{uri: post.acf.image_de_publication}} style={[styles.image, {aspectRatio: this.state.height !== null ? this.state.width / this.state.height : 1}, this.props.appTheme == "Dark" ? darkTheme.image : null]}/>
                        </View>
                    }
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
        marginTop: 10
    },

    sideHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
        width: '100%'
    },

    postHeader: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    headerImageContainer: {
        width: 30,
        height: 30,
        borderRadius: 15,
        borderColor: '#EF835E',
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 5
    },

    headerImage: {
        borderRadius: 15,
        width: 26,
        height: 26,
        borderColor: 'white',
        borderWidth: 1
    },

    title: {
        fontSize: 15
    },

    timeDiff: {
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

const darkTheme = StyleSheet.create({
    wrapper: {

    },

    postContainer: {
        backgroundColor: '#0d0f15',
        shadowColor: "white"
    },

    side: {
        
    },

    sideHeader: {
        
    },

    postHeader: {
        
    },

    headerImageContainer: {
        borderColor: '#EF835E'
    },

    headerImage: {
        borderColor: '#0d0f15'
    },

    title: {
        color: 'white'
    },

    timeDiff: {
        color: 'grey'
    },

    text: {
        color: 'white',
    },

    image: {
        
    }
})