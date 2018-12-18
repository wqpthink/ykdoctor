
/**
 * 两个json对象值合并
 * @param {object} obj1
 * @param {object} obj2
 */
module.exports.jsonObjectMerge = (obj1, obj2) => {
    if(!(obj1 instanceof Object) || !(obj2 instanceof Object)) return null;
    let new_obj = {};
    for (const key in obj1) {
        if (obj1.hasOwnProperty(key)) {
            new_obj[key] = obj1[key];
        }
    }

    for (const key in obj2) {
        if (obj2.hasOwnProperty(key)) {
            new_obj[key] = obj2[key];
        }
    }
    return new_obj;
}


/**
 * 两个json数组值合并
 * @param {Array} arr1
 * @param {Array} arr2
 */
module.exports.jsonArrayMerge = (arr1, arr2) => {
    if(!Array.isArray(arr1) || !Array.isArray(arr2)) return null;
    let new_arr = [];
    for (const v of arr1) {
        new_arr.push(v);
    }

    for (const v of arr2) {
        new_arr.push(v);
    }
    return new_arr;
}

