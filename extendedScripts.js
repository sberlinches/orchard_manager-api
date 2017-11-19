"use strict";

/**
 *
 * @returns {string}
 */
String.prototype.capitalize = function() {

    return this.replace(/\b\w/g, function(l) {
        return l.toUpperCase()
    });
};

/**
 * Group an array by the provided parameters
 * Before:
 *
 * [{
 *     "id": 1,
 *     "collections": {
 *         "id": 1
 *     }
 * },{
 *     "id": 1,
 *     "collections": {
 *          "id": 2
 *     }
 * }]
 *
 * After grouping by 'id';
 *
 * {
 *     "id": 1,
 *     "collections": {
 *         "id": 1,
 *         "id": 2
 *     }
 * }
 *
 * @param groupParameters The parameters to group by
 * @returns {*}
 */
Array.prototype.groupBy = function(groupParameters) {

    var array = this;

    if (!array.length || !groupParameters.length) {
        return array;
    }

    var newObject   = {};
    var keys        = Object.keys(array[0]);

    // 1. Add the parent parameters of the new object
    keys.forEach(function(key) {
        if(groupParameters.includes(key))
        // 1.1 If it's a parameter to be grouped add the value
            newObject[key] = array[0][key];
        else
        // 1.2 The non grouped parameters are agregated
            newObject[key] = [];
    });

    // 2. Fill the agregated parameters
    array.forEach(function(object) {
        keys.forEach(function(key) {
            if(!groupParameters.includes(key)) {
                if(object[key].id !== null) { // TODO: temporal fix to avoid oject full of null attributes
                    newObject[key].push(object[key]);
                }
            }
        });
    });

    return newObject;
};