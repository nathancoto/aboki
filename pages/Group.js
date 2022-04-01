import React, {Component} from 'react'
import {Text, View, StyleSheet, Image, FlatList, ScrollView} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';

import * as G from '../service/global'
import * as Services from '../service/Api';

import Group_Member from '../components/Group_Member';
import { Linking } from 'react-native';

// Import des icônes
import GoBack from '../assets/arrow-left.svg';
import Edit from '../assets/edit.svg';
import Link from '../assets/link.svg';
import Location from '../assets/location.svg';
import Post from '../components/Post';

// Largeur des items
const size = G.wSC / G.numColumns - 10;

export default class Group extends Component {
    constructor(props) {
        super(props);

        // Etats
        this.state = {
            userData: props.userData,
            displayHeaderInfo: false,
            group: {
                url: ""
            },
            members: {},
            posts: [],
            groups: [],
            navigation: this.props.route.params.navigation
        }

        this.handleScroll = this.handleScroll.bind(this);
        this.findGroup(this.props.route.params.id);
        this.findUsers();
        this.findPosts();
    }

    parseUserData() {
        this.setState({
            userData: JSON.parse(this.state.userData)
        });
    }

    findGroup(id) {
        Services.findGroupByID(id).then(json => {
            this.setState({
                group: json.acf
            });
        })
    }

    onSelectMember(id, nav) {
        nav.navigate('Profil', {id: id});
    }

    onSelectGroup() {
        // Don't redirect
    }

    handleScroll(event) {
        if(event.nativeEvent.contentOffset.y >= 200 && this.state.displayHeaderInfo == false) {
            this.setState({
                displayHeaderInfo: true
            });
        } else if(event.nativeEvent.contentOffset.y < 200 && this.state.displayHeaderInfo == true) {
            this.setState({
                displayHeaderInfo: false
            });
        }
    }

    // TO DELETE
    findUsers() {
        let users = [];
        Services.findAllProfiles().then(json => {
            // console.log(json);
            json.forEach(element => {
                element.acf.id = element.id;
                users.push(element.acf);
            });
            this.setState({
                members: users
            });
        })
    }

    findPosts() {
        Services.findAllPosts().then(json => {
            // console.log(json);
            this.setState({
                posts: json
            });
        });
    }
    // TO DELETE

    render() {
        if(typeof this.state.userData !== 'object') {
            this.parseUserData();
        }

        let link = this.state.group.url.replace("https://", "");
        link = link.replace("http://", "");

        return(
            <View style={[styles.container, this.props.appTheme == "Dark" ? darkTheme.container : null]}>
                <View style={[styles.headerBg, this.props.appTheme == "Dark" ? darkTheme.headerBg : null]} />
                <View style={[styles.header, this.props.appTheme == "Dark" ? darkTheme.header : null]}>
                    <View style={[styles.headerButtons, this.props.appTheme == "Dark" ? darkTheme.headerButtons : null]}>
                        <TouchableOpacity
                            style={[styles.headerButtonContainer, this.props.appTheme == "Dark" ? darkTheme.headerButtonContainer : null]}
                            onPress={() => {
                                this.props.navigation.goBack();
                            }}
                            activeOpacity={0.8}>
                            <View style={[styles.headerButton, this.props.appTheme == "Dark" ? darkTheme.headerButton : null]}>
                                <GoBack style={[styles.headerIcon, this.props.appTheme == "Dark" ? darkTheme.headerIcon : null]} />
                            </View>
                        </TouchableOpacity>
                        {this.state.displayHeaderInfo == true ?
                            <View style={[styles.headerInfos, this.props.appTheme == "Dark" ? darkTheme.headerInfos : null]}>
                                <Image source={{uri: this.state.group.photo_de_profil_du_groupe}} style={[styles.headerImage, this.props.appTheme == "Dark" ? darkTheme.headerImage : null]} />
                                <Text style={[styles.headerName, this.props.appTheme == "Dark" ? darkTheme.headerName : null]}>{this.state.group.nom_du_groupe}</Text>
                            </View>
                            : <View style={{width: 45}} />
                        }
                        <TouchableOpacity
                            style={[styles.headerButtonContainer, this.props.appTheme == "Dark" ? darkTheme.headerButtonContainer : null]}
                            onPress={() => {
                                this.editProfile();
                            }}
                            activeOpacity={0.8}>
                            <View style={[styles.headerButton, this.props.appTheme == "Dark" ? darkTheme.headerButton : null]}>
                                <Edit style={[styles.headerIcon, this.props.appTheme == "Dark" ? darkTheme.headerIcon : null]} />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                <ScrollView style={[styles.contentContainer, this.props.appTheme == "Dark" ? darkTheme.contentContainer : null]} onScroll={this.handleScroll} scrollEventThrottle={16}>
                    <View style={[styles.photoNameBg, this.props.appTheme == "Dark" ? darkTheme.photoNameBg : null]} />
                    <View style={[styles.photoName, this.props.appTheme == "Dark" ? darkTheme.photoName : null]}>
                        <View style={[styles.imageWrapper, this.props.appTheme == "Dark" ? darkTheme.imageWrapper : null]}>
                            <Image source={{uri: this.state.group.photo_de_profil_du_groupe}} style={[styles.image, this.props.appTheme == "Dark" ? darkTheme.image : null]} />
                        </View>
                        <Text style={[styles.name, this.props.appTheme == "Dark" ? darkTheme.name : null]}>{this.state.group.nom_du_groupe}</Text>
                        <Text style={[styles.nbParticipants, this.props.appTheme == "Dark" ? darkTheme.nbParticipants : null]}>{this.state.group.nb_participants} Participants</Text>
                    </View>

                    <View style={[styles.infos, this.props.appTheme == "Dark" ? darkTheme.infos : null]}>
                        <View style={[styles.infosEl, this.props.appTheme == "Dark" ? darkTheme.infosEl : null]}>
                            <Location height={20} style={[styles.infosIcon, this.props.appTheme == "Dark" ? darkTheme.infosIcon : null]} />
                            <Text style={[styles.infosText, this.props.appTheme == "Dark" ? darkTheme.infosText : null]}>{this.state.group.lieu}</Text>
                        </View>
                        <View style={[styles.infosEl, this.props.appTheme == "Dark" ? darkTheme.infosEl : null]}>
                            <Link height={20} style={[styles.infosIcon, this.props.appTheme == "Dark" ? darkTheme.infosIcon : null]} />
                            <Text style={[styles.infosText, this.props.appTheme == "Dark" ? darkTheme.infosText : null]} onPress={() => Linking.openURL('https://'+link)}>{link}</Text>
                        </View>
                    </View>

                    <View style={[styles.presentation, this.props.appTheme == "Dark" ? darkTheme.presentation : null]}>
                        <Text style={[styles.presentationTitle, this.props.appTheme == "Dark" ? darkTheme.presentationTitle : null]}>Présentation</Text>
                        <Text style={[styles.presentationText, this.props.appTheme == "Dark" ? darkTheme.presentationText : null]}>
                            {this.state.group.description_du_groupe}
                        </Text>
                    </View>

                    <View style={[styles.participants, this.props.appTheme == "Dark" ? darkTheme.participants : null]}>
                        <Text style={[styles.participantsTitle, this.props.appTheme == "Dark" ? darkTheme.participantsTitle : null]}>Participants</Text>
                        <View style={[styles.participantsContainer, this.props.appTheme == "Dark" ? darkTheme.participantsContainer : null]}>
                            <FlatList
                                data={this.state.members}
                                renderItem={({item, index}) => <Group_Member member={item} index={index} onSelectMember={this.onSelectMember} navigation={this.props.navigation} appTheme={this.props.appTheme}/>}
                                keyExtractor={(item, index) => index.toString()}
                                horizontal={true}
                                style={{overflow: 'visible', alignSelf: 'flex-start'}}
                                showsHorizontalScrollIndicator={false}
                            />
                        </View>
                    </View>

                    <View style={[styles.posts, this.props.appTheme == "Dark" ? darkTheme.posts : null]}>
                        <Text style={[styles.postsTitle, this.props.appTheme == "Dark" ? darkTheme.postsTitle : null]}>Dernier(s) post(s)</Text>
                        <View style={[styles.postsContainer, this.props.appTheme == "Dark" ? darkTheme.postsContainer : null]}>
                            {
                                this.state.posts &&
                                this.state.posts.map((post, index) =>
                                    <Post post={post}
                                        key={index}
                                        onSelectGroup={this.onSelectGroup}
                                        navigation={this.props.navigation}
                                        appTheme={this.props.appTheme}/>
                                )
                            }
                        </View>
                    </View>

                    <View style={[styles.marginBottom, this.props.appTheme == "Dark" ? darkTheme.marginBottom : null]} />
                </ScrollView>

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
    },

    headerBg: {
        position: 'absolute',
        paddingTop: 50,
        paddingBottom: 20,
        width: '100%',
        height: 120,
        backgroundColor: '#EF835E',
        borderBottomRightRadius: 40,
        borderBottomLeftRadius: 40,
        zIndex: 9
    },

    header: {
        position: 'absolute',
        paddingTop: 50,
        paddingBottom: 20,
        width: '100%',
        height: 120,
        zIndex: 9
    },

    headerButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: '5%'
    },

    headerButtonContainer: {
        width: 38,
        height: 38,
        borderRadius: 19,
        overflow: 'hidden',

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 10
    },

    headerButton: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },

    headerIcon: {
        width: 18,
        height: 18,
        color: '#EF835E'
    },

    headerInfos: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    headerImage: {
        width: 38,
        height: 38,
        borderRadius: 19,
        marginRight: 15
    },

    headerName: {
        color: 'white',
        fontWeight: 'bold'
    },

    contentContainer: {
        width: '100%',
        height: '100%',
        flex: 1,
        paddingHorizontal: '5%'
    },

    photoNameBg: {
        position: 'absolute',
        top: -200,
        left: '-7,5%',
        height: 401,
        width: '115%',
        backgroundColor: '#EF835E',
        borderBottomRightRadius: 40,
        borderBottomLeftRadius: 40,
        zIndex: 0
    },

    photoName: {
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        paddingTop: 120
    },

    imageWrapper: {
        width: 122,
        height: 122,
        borderRadius: 61,
        borderColor: '#EF835E',
        borderStyle: 'dashed',
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },

    image: {
        backgroundColor: 'white',
        width: 114,
        height: 114,
        borderRadius: 59,
        padding: 5,
    },

    name: {
        textAlign: 'center',
        fontSize: 20,
        color: '#EF835E',
        fontWeight: 'bold',
        fontSize: 28,
        marginTop: 10
    },

    nbParticipants: {
        textAlign: 'center',
        fontSize: 20,
        color: '#EF835E',
        fontSize: 14
    },

    infos: {
        marginTop: 20,
        width: '100%',
        borderColor: '#EF835E',
        borderWidth: 2,
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 5
    },

    infosEl: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5
    },

    infosIcon: {
        width: 20,
        height: 20,
        color: '#EF835E',
        marginRight: 10
    },

    infosText: {
        fontSize: 14,
        fontWeight: 'bold'
    },

    presentation: {
        marginTop: 20
    },

    presentationTitle: {
        fontWeight: 'bold',
        marginBottom: 10
    },

    participants: {
        marginTop: 20
    },

    participantsTitle: {
        fontWeight: 'bold',
        marginBottom: 10
    },

    posts: {
        marginTop: 20,
        width: '100%'
    },

    postsTitle: {
        fontWeight: 'bold',
        marginBottom: 10,
        width: '100%'
    },

    postsContainer: {
        position: 'relative',
        left: '-5%',
        width: '110%',
    },

    marginBottom: {
        height: 50
    }
})

const darkTheme = StyleSheet.create({
    container: {
        backgroundColor: "#0d0f15",
    },

    headerBg: {
        backgroundColor: '#EF835E',
    },

    header: {
        
    },

    headerButtons: {
        
    },

    headerButtonContainer: {
        shadowColor: "#fff",
    },

    headerButton: {
        backgroundColor: '#0d0f15',
    },

    headerIcon: {
        color: '#EF835E'
    },

    headerInfos: {
        
    },

    headerImage: {
        
    },

    headerName: {
        color: '#0d0f15',
    },

    contentContainer: {
        
    },

    photoNameBg: {
        backgroundColor: '#EF835E',
    },

    photoName: {
        color: 'white'
    },

    imageWrapper: {
        borderColor: '#EF835E',
    },

    image: {
        backgroundColor: '#0d0f15',
    },

    name: {
        color: '#EF835E',
    },

    nbParticipants: {
        color: '#EF835E',
    },

    infos: {
        borderColor: '#EF835E',
    },

    infosEl: {
        
    },

    infosIcon: {
        color: '#EF835E',
    },

    infosText: {
        color: 'white'
    },

    presentation: {
        
    },

    presentationTitle: {
        color: 'white'
    },

    presentationText: {
        color: 'white'
    },

    participants: {
        
    },

    participantsTitle: {
        color: 'white'
    },

    posts: {
        
    },

    postsTitle: {
        color: 'white'
    },

    postsContainer: {
        
    },

    marginBottom: {
        
    }
})