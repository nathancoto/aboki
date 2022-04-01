import i18n from 'i18n-js'
import * as Localization  from 'expo-localization'

import en from '../translations/en';
import fr from '../translations/fr';
import es from '../translations/es';

i18n.translations = {
    en,
    fr,
    es
}

const getLanguage = async() => {
    try{
        const choice = await Localization.locale
        i18n.locale = choice.substr(0,2)
        i18n.initAsync()
    }catch (error){
    console.log("Unable to locate")
    }
}

getLanguage()

export function t(name){
    return i18n.t()
}