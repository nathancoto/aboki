import React, {Component} from 'react'
import {Text, View, StyleSheet, Image, FlatList, ScrollView} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';

import * as G from '../service/global'
import { findGroupByID } from '../service/Api';

import GoBack from '../assets/arrow-left.svg';
import Check from '../assets/check.svg';

// Largeur des items
const size = G.wSC / G.numColumns - 10;

export default class Post_Detail extends Component {
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
        Image.getSize(this.props.route.params.post.acf.image_de_publication, (width, height) => {
           this.setState({width, height});
        });

        findGroupByID(this.props.route.params.post.acf.groupe.ID).then(json => {
            this.setState({
                group: {
                    name: json.acf.nom_du_groupe,
                    avatar: json.acf.photo_de_profil_du_groupe
                }
            })
        });
    }

    render() {
        console.log(this.props.route.params.post);
        const post = this.props.route.params.post;
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
                    <View style={styles.namePublication}>
                        <Text style={styles.titleView}>Publication</Text>
                        <Text style={styles.nameGroup}>{this.state.group.name}</Text>
                    </View>
                    <View style={{width: 45}} />
                </View>
                <View style={styles.postContainer}>
                    <View style={styles.postHeader}>
                        {this.state.group.avatar !== '' ? 
                            <View style={styles.headerImageContainer}>
                                <Image source={{uri: this.state.group.avatar}} style={styles.headerImage}/>
                            </View>
                            : <View style={styles.headerImage} />
                        }
                        <Text style={styles.title}>{this.state.group.name}</Text>
                    </View>
                    <Text style={styles.text}>{post.acf.texte_de_la_publication}</Text>
                    <View style={[styles.side, styles.sideDown]}>
                        <Image source={{uri: post.acf.image_de_publication}} style={[styles.image, {aspectRatio: this.state.height !== null ? this.state.width / this.state.height : 1}]}/>
                    </View>
                    <View style={[styles.side, styles.sideDown, styles.date]}>
                        {timeDiffElement}
                    </View>
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

    wrapper: {
        width: '100%',
        paddingVertical: 10
    },

    postContainer: {
        width: '100%',
        marginTop: '5%',
        paddingVertical: 20,
        paddingHorizontal: 10,
    },

    side: {
        // flex: 1,
        // marginHorizontal: 10
    },

    sideUp: {
        marginVertical: 0
    },

    sideDown: {
        marginTop: 10
    },

    postHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginBottom: 10
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

    titleView: {
        textAlign: 'center',
        fontSize: 20
    },

    nameGroup: {
        textAlign: 'center',
        fontSize: 12,
        color: 'grey'
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
        resizeMode: 'contain',
        width: '100%'
    }
})