const apiPath = 'https://dev-aboki.pantheonsite.io/wp-json/wp/v2/';

/** Fonction pour rechercher toutes les datas d'un certain type
 * @example
 * import {findAllData} from 'fichier'
 * let groupes = findAllData('groupe');
 */
export const findAllData = async route => {
    try {
        const response = await fetch(apiPath + route);
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
 export function findAllProfiles() {
    let url = apiPath+'profil';
    return fetch(url)
        .then((response) => response.json())
        .then(data => console.log(data))
        .catch((error) => console.error(error))
}

/** Fonction pour rechercher tous les groupes
 * @example
 * import {findAllGroups} from 'fichier'
 * let groups = findAllGroups();
 */
 export function findAllGroups() {
    let url = apiPath+'groupe';
    return fetch(url)
        .then((response) => response.json())
        .then(data => console.log(data))
        .catch((error) => console.error(error))
}

/** Fonction pour rechercher tous les posts
 * @example
 * import {findAllPosts} from 'fichier'
 * let posts = findAllPosts();
 */
 export function findAllPosts() {
    let url = apiPath+'group_post';
    return fetch(url)
        .then((response) => response.json())
        .then(data => console.log(data))
        .catch((error) => console.error(error))
}

/** Fonction pour rechercher des profils par ID
 * @param idProfile: id du profil recherché
 * @example
 * import {findProfileByID} from 'fichier'
 * let profile = findProfileByID(12532);
 */
export function findProfileByID(id) {
    let url = apiPath+'profil/'+id;
    return fetch(url)
        .then((response) => response.json())
        .then(data => console.log(data))
        .catch((error) => console.error(error))
}

/** Fonction pour rechercher des groupes par ID
 * @param idGroup: id du groupe recherché
 * @example
 * import {findGroupByID} from 'fichier'
 * let group = findGroupByID(12532);
 */
 export function findGroupByID(id) {
    let url = apiPath+'groupe/'+id;
    return fetch(url)
        .then((response) => response.json())
        .then(data => console.log(data))
        .catch((error) => console.error(error))
}

/** Fonction pour rechercher des posts par ID
 * @param idPost: id du post recherché
 * @example
 * import {findPostByID} from 'fichier'
 * let post = findPostByID(12532);
 */
 export function findPostByID(id) {
    let url = apiPath+'group_post/'+id;
    return fetch(url)
        .then((response) => response.json())
        .then(data => console.log(data))
        .catch((error) => console.error(error))
}