import React, {Component} from 'react'
import {Text, View, StyleSheet, Image, FlatList, ScrollView} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';

import * as G from '../service/global'
import * as Services from '../service/Api';

// Import des icônes
import GoBack from '../assets/arrow-left.svg';
import Edit from '../assets/edit.svg';
import School from '../assets/school.svg';
import Location from '../assets/location.svg';
import LanguageCard from '../components/LanguageCard';
import HobbyCard from '../components/HobbyCard';
import GroupProfileCard from '../components/GroupProfileCard';

// Largeur des items
const size = G.wSC / G.numColumns - 10;

export default class Profil extends Component {
    constructor(props) {
        super(props);

        // Etats
        this.state = {
            userData: props.userData,
            displayHeaderInfo: false,
            member: {
                centres_dinteret: [],
                langues : [],
                groupes: []
            },
            languages: [],
            hobbies: [],
            groups: []
        }

        this.handleScroll = this.handleScroll.bind(this);
    }

    parseUserData() {
        let userData = JSON.parse(this.state.userData);
        this.setState({
            userData: userData,
            id: this.props.route.params.id
        }, function() {
            if(this.props.route.params.isMe) {
                this.findUser(this.state.userData.id);
            } else {
                this.findUser(this.state.id);
            }
        });
    }

    findUser(id) {
        Services.findProfileByID(id).then(json => {
            this.setState({
                member: json.acf
            });
        })
    }

    editProfile() {
        // TODO
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

    render() {
        if(typeof this.state.userData !== 'object') {
            this.parseUserData();
        }

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
                                <Image source={{uri: this.state.member.photo_de_profil}} style={[styles.headerImage, this.props.appTheme == "Dark" ? darkTheme.headerImage : null]} />
                                <Text style={[styles.headerName, this.props.appTheme == "Dark" ? darkTheme.headerName : null]}>{this.state.member.surname} {this.state.member.name}</Text>
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
                            <Image source={{uri: this.state.member.photo_de_profil}} style={[styles.image, this.props.appTheme == "Dark" ? darkTheme.image : null]} />
                        </View>
                        <Text style={[styles.name, this.props.appTheme == "Dark" ? darkTheme.name : null]}>{this.state.member.surname} {this.state.member.name}, {this.state.member.age}</Text>
                        <Text style={[styles.role, this.props.appTheme == "Dark" ? darkTheme.role : null]}>Etudiant(e)</Text>
                    </View>

                    <View style={[styles.study, this.props.appTheme == "Dark" ? darkTheme.study : null]}>
                        <View style={[styles.studyEl, this.props.appTheme == "Dark" ? darkTheme.studyEl : null]}>
                            <School height={20} style={[styles.studyIcon, this.props.appTheme == "Dark" ? darkTheme.studyIcon : null]} />
                            <Text style={[styles.studyText, this.props.appTheme == "Dark" ? darkTheme.studyText : null]}>{this.state.member.formation}</Text>
                        </View>
                        <View style={[styles.studyEl, this.props.appTheme == "Dark" ? darkTheme.studyEl : null]}>
                            <Location height={20} style={[styles.studyIcon, this.props.appTheme == "Dark" ? darkTheme.studyIcon : null]} />
                            <Text style={[styles.studyText, this.props.appTheme == "Dark" ? darkTheme.studyText : null]}>{this.state.member.place}</Text>
                        </View>
                    </View>

                    <View style={[styles.presentation, this.props.appTheme == "Dark" ? darkTheme.presentation : null]}>
                        <Text style={[styles.presentationTitle, this.props.appTheme == "Dark" ? darkTheme.presentationTitle : null]}>Présentation</Text>
                        <Text style={[styles.presentationText, this.props.appTheme == "Dark" ? darkTheme.presentationText : null]}>{this.state.member.bio}</Text>
                    </View>

                    <View style={[styles.languages, this.props.appTheme == "Dark" ? darkTheme.languages : null]}>
                        <Text style={[styles.languagesTitle, this.props.appTheme == "Dark" ? darkTheme.languagesTitle : null]}>Langue(s) parlée(s)</Text>
                        <View style={[styles.languagesContainer, this.props.appTheme == "Dark" ? darkTheme.languagesContainer : null]}>
                            {
                                this.state.member.langues.length > 0 ?
                                    <FlatList
                                        data={this.state.member.langues}
                                        renderItem={({item, index}) => <LanguageCard language={item} index={index} appTheme={this.props.appTheme}/>}
                                        keyExtractor={(item, index) => index.toString()}
                                        horizontal={true}
                                        style={{overflow: 'visible', alignSelf: 'flex-start'}}
                                        showsHorizontalScrollIndicator={false}
                                    />
                                    :
                                    <Text style={this.props.appTheme == "Dark" ? darkTheme.text : null}>Cette personne n'a pas renseigné de langues.</Text>
                            }
                        </View>
                    </View>

                    <View style={[styles.hobbies, this.props.appTheme == "Dark" ? darkTheme.hobbies : null]}>
                        <Text style={[styles.hobbiesTitle, this.props.appTheme == "Dark" ? darkTheme.hobbiesTitle : null]}>Centres d'intérêts</Text>
                        <View style={[styles.hobbiesContainer, this.props.appTheme == "Dark" ? darkTheme.hobbiesContainer : null]}>
                            {
                                this.state.member.centres_dinteret.length > 0 ?
                                    <FlatList
                                        data={this.state.member.centres_dinteret}
                                        renderItem={({item, index}) => <HobbyCard hobby={item} index={index} appTheme={this.props.appTheme}/>}
                                        keyExtractor={(item, index) => index.toString()}
                                        horizontal={true}
                                        style={{overflow: 'visible', alignSelf: 'flex-start'}}
                                        showsHorizontalScrollIndicator={false}
                                    />
                                :
                                     <Text style={this.props.appTheme == "Dark" ? darkTheme.text : null}>Cette personne n'a pas renseigné de centres d'intérêts.</Text>

                            }
                        </View>
                    </View>

                    <View style={[styles.groups, this.props.appTheme == "Dark" ? darkTheme.groups : null]}>
                        <Text style={[styles.groupsTitle, this.props.appTheme == "Dark" ? darkTheme.groupsTitle : null]}>Groupes</Text>
                        <View style={[styles.groupsContainer, this.props.appTheme == "Dark" ? darkTheme.groupsContainer : null]}>
                            {
                                this.state.groups.length > 0 ?
                                    <FlatList
                                        data={this.state.groups}
                                        renderItem={({item, index}) => <GroupProfileCard group={item} index={index} appTheme={this.props.appTheme}/>}
                                        keyExtractor={(item, index) => index.toString()}
                                        horizontal={true}
                                        style={{overflow: 'visible', alignSelf: 'flex-start'}}
                                        showsHorizontalScrollIndicator={false}
                                    />
                                :
                                    <Text style={this.props.appTheme == "Dark" ? darkTheme.text : null}>Cette personne n'a pas rejoint de groupe.</Text>
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
        padding: 5
    },

    name: {
        textAlign: 'center',
        fontSize: 20,
        color: '#EF835E',
        fontWeight: 'bold',
        fontSize: 28,
        marginTop: 10
    },

    role: {
        textAlign: 'center',
        fontSize: 20,
        color: '#EF835E',
        fontSize: 14
    },

    study: {
        marginTop: 20,
        width: '100%',
        borderColor: '#EF835E',
        borderWidth: 2,
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 5
    },

    studyEl: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5
    },

    studyIcon: {
        width: 20,
        height: 20,
        color: '#EF835E',
        marginRight: 10
    },

    studyText: {
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

    languages: {
        marginTop: 20
    },

    languagesTitle: {
        fontWeight: 'bold',
        marginBottom: 10
    },

    hobbies: {
        marginTop: 20
    },

    hobbiesTitle: {
        fontWeight: 'bold',
        marginBottom: 10
    },

    groups: {
        marginTop: 20
    },

    groupsTitle: {
        fontWeight: 'bold',
        marginBottom: 10
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
        
    },

    imageWrapper: {
        borderColor: '#EF835E',
    },

    image: {
        backgroundColor: '#0d0f15',
    },

    text: {
        color: 'white'
    },

    name: {
        color: '#EF835E',
    },

    role: {
        color: '#EF835E',
    },

    study: {
        borderColor: '#EF835E',
    },

    studyEl: {
        
    },

    studyIcon: {
        color: '#EF835E',
    },

    studyText: {
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

    languages: {
        
    },

    languagesTitle: {
        color: 'white'
    },

    hobbies: {
        
    },

    hobbiesTitle: {
        color: 'white'
    },

    groups: {
        
    },

    groupsTitle: {
        color: 'white'
    },

    marginBottom: {
        
    }
})