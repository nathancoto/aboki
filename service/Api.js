const apiPath = 'https://dev-aboki.pantheonsite.io/wp-json/wp/v2/';

/** Fonction pour rechercher toutes les datas d'un certain type
 * @example
 * import {findAllData} from 'fichier'
 * let groupes = findAllData('groupe');
 */
export const findAllData = async route => {
    try {
        const response = await fetch(apiPath + route + '?acf_format=standard');
        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error);
        return null;
    }
};

/** Fonction pour rechercher tous les profils
 * @example
 * import {findAllProfiles} from 'fichier'
 * let profiles = findAllProfiles();
 */
export const findAllProfiles = async () => {
    try {
        const response = await fetch(apiPath + 'profil/' + '?acf_format=standard');
        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error);
        return null;
    }
};

/** Fonction pour rechercher tous les groupes
 * @example
 * import {findAllGroups} from 'fichier'
 * let groups = findAllGroups();
 */
export const findAllGroups = async () => {
    try {
        const response = await fetch(apiPath + 'groupe/' + '?acf_format=standard');
        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error);
        return null;
    }
};

/** Fonction pour rechercher tous les posts
 * @example
 * import {findAllPosts} from 'fichier'
 * let posts = findAllPosts();
 */
export const findAllPosts = async () => {
    try {
        const response = await fetch(apiPath + 'group_post/' + '?acf_format=standard');
        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error);
        return null;
    }
};

/** Fonction pour rechercher des profils par ID
 * @param idProfile: id du profil recherché
 * @example
 * import {findProfileByID} from 'fichier'
 * let profile = findProfileByID(12532);
 */
export const findProfileByID = async id => {
    try {
        const response = await fetch(apiPath + 'profil/' + id + '?acf_format=standard');
        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error);
        return null;
    }
};

/** Fonction pour rechercher des groupes par ID
 * @param idGroup: id du groupe recherché
 * @example
 * import {findGroupByID} from 'fichier'
 * let group = findGroupByID(12532);
 */
export const findGroupByID = async id => {
    try {
        const response = await fetch(apiPath + 'groupe/' + id + '?acf_format=standard');
        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error);
        return null;
    }
};

/** Fonction pour rechercher des posts par ID
 * @param idPost: id du post recherché
 * @example
 * import {findPostByID} from 'fichier'
 * let post = findPostByID(12532);
 */
export const findPostByID = async id => {
    try {
        const response = await fetch(apiPath + 'group_post/' + id + '?acf_format=standard');
        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error);
        return null;
    }
};