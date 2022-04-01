import React, {Component} from 'react'
import {Text, View, StyleSheet, FlatList} from 'react-native'

import * as G from '../service/global'
import * as Services from '../service/Api';
import GroupIcon from '../components/GroupIcon';
import Post from '../components/Post';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from 'i18n-js';

// Largeur des items
const size = G.wSC / G.numColumns - 10;

export default class Home extends Component {
    constructor(props) {
        super(props);

        // Etats
        this.state = {
            groups: [],
            posts: []
            // mode: Appearance.getColorScheme()
        }
    }

    componentDidMount() {
        let groups = [];
        Services.findAllGroups().then(json => {
            json.forEach(element => {
                groups.push({id: element.id, group: element.acf});
            });
            this.setState({
                groups: groups
            });
        })

        Services.findAllPosts().then(json => {
            this.setState({
                posts: json
            });
            // console.log(json);
        });
    }

    // Afficher la page de détail du groupe
    onSelectGroup = (ide) => {
        this.props.navigation.navigate('Group', {id: ide});
    }

    // Afficher la page de détail du post
    onSelectPost = (post) => {
        this.props.navigation.navigate('DetailPost', {post: post});
    }

    render() {
        return(
            <View style={[styles.container, this.props.appTheme == "Dark" ? darkTheme.container : null]}>
                <View style={[styles.groupContainer, this.props.appTheme == "Dark" ? darkTheme.groupContainer : null]}>
                    <Text style={[styles.label, this.props.appTheme == "Dark" ? darkTheme.label : null]}>{i18n.t('groups')}</Text>
                    <FlatList
                        data={this.state.groups}
                        renderItem={({item, index}) => <GroupIcon group={item.group} id={item.id} index={index} onSelectGroup={this.onSelectGroup} appTheme={this.props.appTheme}/>}
                        keyExtractor={(item, index) => index.toString()}
                        horizontal={true}
                        style={{overflow: 'visible'}}
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
                <View style={[styles.postContainer, this.props.appTheme == "Dark" ? darkTheme.postContainer : null]}>
                    <FlatList
                        data={this.state.posts}
                        renderItem={({item, index}) => <Post post={item} index={index} onSelectPost={this.onSelectPost} navigation={this.props.navigation} onSelectGroup={this.onSelectGroup} appTheme={this.props.appTheme}/>}
                        keyExtractor={(item, index) => index.toString()}
                        style={{overflow: 'visible'}}
                        showsVerticalScrollIndicator={false}
                        ListHeaderComponent={<Text style={[styles.label, {marginLeft: '5%'}, this.props.appTheme == "Dark" ? darkTheme.label : null]}>{i18n.t('newPosts')}</Text>}
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
        height: 170,
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

const darkTheme = StyleSheet.create({
    container: {
        backgroundColor: "#0d0f15"
    },

    label: {
        color: "#fff"
    },

    groupContainer: {
        backgroundColor: '#0d0f15'
    }
});