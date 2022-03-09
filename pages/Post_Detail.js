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

    onSelectGroup = (ide) => {
        this.props.navigation.navigate('Group', {id: ide});
    }

    render() {
        // console.log(this.props.route.params.post);
        const post = this.props.route.params.post;
        let timeCreated = post.date;
        let timeDiff = new Date(timeCreated);
        let formatDate = <Text style={styles.timeDiff}>
            {timeDiff.getHours()}:{(timeDiff.getMinutes()<10?'0':'') + timeDiff.getMinutes()} - {(timeDiff.getDay()<10?'0':'') + timeDiff.getDay()}/{(timeDiff.getMonth()<10?'0':'') + (timeDiff.getMonth() + 1)}/{timeDiff.getFullYear()}
        </Text>;
        
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
                            <TouchableOpacity style={styles.headerImageContainer} onPress={() => {this.onSelectGroup(this.props.route.params.post.acf.groupe.ID)}}>
                                <Image source={{uri: this.state.group.avatar}} style={styles.headerImage}/>
                            </TouchableOpacity>
                            : <View style={styles.headerImage} />
                        }
                        <Text style={styles.title}>{this.state.group.name}</Text>
                        <Text style={styles.dots}>...</Text>
                    </View>
                    <Text style={styles.text}>{post.acf.texte_de_la_publication}</Text>
                    <View style={[styles.side, styles.sideDown]}>
                        <Image source={{uri: post.acf.image_de_publication}} style={[styles.image, {aspectRatio: this.state.height !== null ? this.state.width / this.state.height : 1}]}/>
                    </View>
                    <View style={[styles.sideDown, styles.date]}>
                        {formatDate}
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
        paddingVertical: 20,
        paddingHorizontal: 10,
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
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
        fontSize: 12,
        alignSelf: 'flex-start',
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
    },

    date: {
        fontSize: 12,
        alignSelf: "flex-start",
    },

    dots: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'right',
        flex: 1,
        paddingBottom: 14
    },

})