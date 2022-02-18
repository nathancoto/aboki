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
            languages: [
                {
                    country: 'France',
                    level: 3
                }
            ],
            hobbies: [
                {
                    name: 'Boxe',
                    icon: '🥊'
                },
                {
                    name: 'Badminton',
                    icon: '🏹'
                },
                {
                    name: 'Basketball',
                    icon: '🏀'
                }
            ],
            groups: [
                {
                    name: 'Crous Dijon',
                    image: 'data:image/jpeg;base64,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'
                }
            ]
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
                // this.findUser(this.state.userData.id);
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