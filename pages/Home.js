import React, {Component} from 'react'
import {Text, View, StyleSheet, FlatList, TouchableOpacity} from 'react-native'
import {LinearGradient} from 'expo-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';

import * as G from '../service/global'
import * as Services from '../service/Api';
import GroupIcon from '../components/GroupIcon';
import Post from '../components/Post';

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
        Services.findAllData('groupe').then(json => {
            this.setState({
                groups: json
            });
        })

        Services.findAllData('group_post').then(json => {
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
                        renderItem={({item, index}) => <Post post={item} index={index} onSelectPost={this.onSelectPost}/>}
                        keyExtractor={item => item.id}
                        style={{overflow: 'visible'}}
                        showsVerticalScrollIndicator={false}
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
        backgroundColor: "#fff",
        paddingTop: 50
    },

    groupContainer: {
        height: 80,
        width: '80%',
        zIndex: 2
    },

    postContainer: {
        height: '80%',
        width: '100%',
        overflow: 'visible'
    }
})