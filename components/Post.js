import React, {Component} from 'react'
import {Text, View, StyleSheet, Image, FlatList, ScrollView, TouchableOpacity} from 'react-native'

import * as G from '../service/global'

// Largeur des items
const size = G.wSC / G.numColumns - 10;

export default class Post extends Component {
    constructor(props) {
        super(props);

        // Etats
        this.state = {
            width: 50,
            height: 50
        }
    }

    componentDidMount = () => {
        Image.getSize(this.props.post.acf.image_de_publication, (width, height) => {
           this.setState({width, height});
        });
     }

    render() {
        const post = this.props.post;
        // console.log(post);

        return(
            <TouchableOpacity style={styles.wrapper} activeOpacity={.5}>
                <View style={styles.postContainer}>
                    <View style={styles.side}>
                        <View style={styles.postHeader}>
                            <View style={styles.headerImage} />
                            <Text style={styles.title}>{post.title.rendered}</Text>
                        </View>
                        <Text style={styles.text}>{post.acf.texte_de_la_publication}</Text>
                    </View>
                    <View style={styles.side}>
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

        flexDirection: 'row',

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