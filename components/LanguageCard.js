import React, {Component} from 'react'
import {Text, View, StyleSheet, Image, FlatList, ScrollView} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';

import * as G from '../service/global'

// Import des niveaux
import Level from '../assets/levels/jauge.svg';

// Largeur des items
const size = G.wSC / G.numColumns - 10;

// Import des images de fond
const bgImages = [
    {
        id: "Français",
        img: require('../assets/bg_card_country/france.png')
    },
    {
        id: "Anglais",
        img: require('../assets/bg_card_country/royaume_uni.png')
    },
    {
        id: "Allemand",
        img: require('../assets/bg_card_country/allemagne.png')
    },
    {
        id: "Chinois",
        img: require('../assets/bg_card_country/chine.png')
    },
    {
        id: "Italien",
        img: require('../assets/bg_card_country/italie.png')
    },
    {
        id: "Portugais",
        img: require('../assets/bg_card_country/portugal.png')
    },
    {
        id: "Russe",
        img: require('../assets/bg_card_country/russie.png')
    },
    {
        id: "Espagnol",
        img: require('../assets/bg_card_country/espagne.png')
    },
];

// Import des drapeaux
const flags = [
    {
        id: "Français",
        img: require('../assets/flags/French.png')
    },
    {
        id: "Anglais",
        img: require('../assets/flags/United-kingdom.png')
    },
    {
        id: "Allemand",
        img: require('../assets/flags/Deutschland.png')
    },
    {
        id: "Chinois",
        img: require('../assets/flags/China.png')
    },
    {
        id: "Italien",
        img: require('../assets/flags/Italia.png')
    },
    {
        id: "Portugais",
        img: require('../assets/flags/Portugal.png')
    },
    {
        id: "Russe",
        img: require('../assets/flags/Russia.png')
    },
    {
        id: "Espagnol",
        img: require('../assets/flags/Spain.png')
    },
];

export default class LanguageCard extends Component {
    constructor(props) {
        super(props);

        // Etats
        this.state = {
            country: '',
            level: ''
        }
    }

    render() {
        const language = this.props.language;
        // console.log(language);

        let imgPath;
        let flag;

        bgImages.forEach((el, i) => {
            if(el.id == language) {
                imgPath = el.img;
            }
        });
        flags.forEach((el, i) => {
            if(el.id == language) {
                flag = el.img;
            }
        });

        return(
            <TouchableOpacity activeOpacity={.8} style={styles.languageCard}>
                <Image source={imgPath} style={styles.imageBg} />
                <Image source={flag} style={styles.imageCountry} />
                <View style={styles.imageLevelWrapper}>
                    <Level height={22} style={styles.imageLevel} />
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    languageCard: {
        width: 125,
        height: 125,
        padding: 10,
        marginRight: 20,
        backgroundColor: 'white',
        borderRadius: 15,
        position: 'relative',

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 10
    },

    imageBg: {
        position: 'absolute',
        width: 125,
        height: 125,
        borderRadius: 10,
        marginBottom: 10
    },

    imageCountry: {
        width: 110,
        height: 110,
        borderRadius: 10,
        marginBottom: 10,
        width: 32,
        height: 32,
        position: 'absolute',
        bottom: 0,
        right: 10
    },

    imageLevelWrapper: {
        width: 22,
        height: 22,
        borderRadius: 11,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 10,
        left: 10
    },

    imageLevel: {
        width: 18,
        height: 18
    },
})