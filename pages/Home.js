import React, {Component} from 'react'
import {Text, View, StyleSheet, FlatList} from 'react-native'

import * as G from '../service/global'
import * as Services from '../service/Api';
import GroupIcon from '../components/GroupIcon';
import Post from '../components/Post';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Largeur des items
const size = G.wSC / G.numColumns - 10;

export default class Home extends Component {
    constructor(props) {
        super(props);

        // Etats
        this.state = {
            groups: [],
            posts: []
        }
    }

    componentDidMount() {
        Services.findAllGroups().then(json => {
            this.setState({
                groups: json
            });
        })

        Services.findAllPosts().then(json => {
            this.setState({
                posts: json
            });
            // console.log(json);
        })
    }

    // Afficher la page de détail du groupe
    onSelectGroup = (group) => {
        this.props.navigation.navigate('DetailGroup', {group: group});
    }

    // Afficher la page de détail du post
    onSelectPost = (post) => {
        this.props.navigation.navigate('DetailPost', {post: post});
    }

    render() {
        return(
            <View style={styles.container}>
                <View style={styles.groupContainer}>
                    <Text style={styles.label}>Groupes</Text>
                    <FlatList
                        data={this.state.groups}
                        renderItem={({item, index}) => <GroupIcon group={item} index={index} onSelectGroup={this.onSelectGroup}/>}
                        keyExtractor={item => item.id}
                        horizontal={true}
                        style={{overflow: 'visible'}}
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
                <View style={styles.postContainer}>
                    <FlatList
                        data={this.state.posts}
                        renderItem={({item, index}) => <Post post={item} index={index} onSelectPost={this.onSelectPost} navigation={this.props.navigation}/>}
                        keyExtractor={item => item.id}
                        style={{overflow: 'visible'}}
                        showsVerticalScrollIndicator={false}
                        ListHeaderComponent={<Text style={[styles.label, {marginLeft: '5%'}]}>Nouveaux posts</Text>}
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
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: "#fff"
    },

    label: {
        marginBottom: 10,
        fontWeight: 'bold',
        fontSize: 18
    },

    groupContainer: {
        height: 150,
        width: '100%',
        paddingHorizontal: '5%',
        paddingTop: 50,
        zIndex: 2,
        backgroundColor: 'white'
    },

    postContainer: {
        height: '65%',
        width: '100%',
        overflow: 'visible',
        marginTop: 20
    }
})