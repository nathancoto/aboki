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
            member: {},
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
            <View style={styles.container}>
                <View style={styles.headerBg} />
                <View style={styles.header}>
                    <View style={styles.headerButtons}>
                        <TouchableOpacity
                            style={styles.headerButtonContainer}
                            onPress={() => {
                                this.props.navigation.goBack();
                            }}
                            activeOpacity={0.8}>
                            <View style={styles.headerButton}>
                                <GoBack style={styles.headerIcon} />
                            </View>
                        </TouchableOpacity>
                        {this.state.displayHeaderInfo == true ?
                            <View style={styles.headerInfos}>
                                <Image source={{uri: this.state.member.photo_de_profil}} style={styles.headerImage} />
                                <Text style={styles.headerName}>{this.state.member.surname} {this.state.member.name}</Text>
                            </View>
                            : <View style={{width: 45}} />
                        }
                        <TouchableOpacity
                            style={styles.headerButtonContainer}
                            onPress={() => {
                                this.editProfile();
                            }}
                            activeOpacity={0.8}>
                            <View style={styles.headerButton}>
                                <Edit style={styles.headerIcon} />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                <ScrollView style={styles.contentContainer} onScroll={this.handleScroll} scrollEventThrottle={16}>
                    <View style={styles.photoNameBg} />
                    <View style={styles.photoName}>
                        <View style={styles.imageWrapper}>
                            <Image source={{uri: this.state.member.photo_de_profil}} style={styles.image} />
                        </View>
                        <Text style={styles.name}>{this.state.member.surname} {this.state.member.name}, {this.state.member.age}</Text>
                        <Text style={styles.role}>Etudiant(e)</Text>
                    </View>

                    <View style={styles.study}>
                        <View style={styles.studyEl}>
                            <School height={20} style={styles.studyIcon} />
                            <Text style={styles.studyText}>{this.state.member.formation}</Text>
                        </View>
                        <View style={styles.studyEl}>
                            <Location height={20} style={styles.studyIcon} />
                            <Text style={styles.studyText}>{this.state.member.place}</Text>
                        </View>
                    </View>

                    <View style={styles.presentation}>
                        <Text style={styles.presentationTitle}>Présentation</Text>
                        <Text style={styles.presentationText}>{this.state.member.bio}</Text>
                    </View>

                    <View style={styles.languages}>
                        <Text style={styles.languagesTitle}>Langue(s) parlée(s)</Text>
                        <View style={styles.languagesContainer}>
                            <FlatList
                                data={this.state.member.langues}
                                renderItem={({item, index}) => <LanguageCard language={item} index={index}/>}
                                keyExtractor={(item, index) => index.toString()}
                                horizontal={true}
                                style={{overflow: 'visible', alignSelf: 'flex-start'}}
                                showsHorizontalScrollIndicator={false}
                            />
                        </View>
                    </View>

                    <View style={styles.hobbies}>
                        <Text style={styles.hobbiesTitle}>Centres d'intérêts</Text>
                        <View style={styles.hobbiesContainer}>
                            <FlatList
                                data={this.state.member.centres_dinteret}
                                renderItem={({item, index}) => <HobbyCard hobby={item} index={index}/>}
                                keyExtractor={(item, index) => index.toString()}
                                horizontal={true}
                                style={{overflow: 'visible', alignSelf: 'flex-start'}}
                                showsHorizontalScrollIndicator={false}
                            />
                        </View>
                    </View>

                    <View style={styles.groups}>
                        <Text style={styles.groupsTitle}>Groupes</Text>
                        <View style={styles.groupsContainer}>
                            <FlatList
                                data={this.state.groups}
                                renderItem={({item, index}) => <GroupProfileCard group={item} index={index}/>}
                                keyExtractor={(item, index) => index.toString()}
                                horizontal={true}
                                style={{overflow: 'visible', alignSelf: 'flex-start'}}
                                showsHorizontalScrollIndicator={false}
                            />
                        </View>
                    </View>

                    <View style={styles.marginBottom} />
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