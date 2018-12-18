/**
 * storage util handle
 */
export default {
    localSet: (key,value) => {localStorage.setItem(key, value);},
    localGet: key => localStorage.getItem(key),
    localRemove: key => {localStorage.removeItem(key);},
    localRemoveAll: () => {localStorage.clear();},
    sessionSet: (key,value) => {sessionStorage.setItem(key,value);},
    sessionGet: key => sessionStorage.getItem(key),
    sessionRemove: key => {sessionStorage.removeItem(key);},
    sessionRemoveAll: () => {sessionStorage.clear();}
};
