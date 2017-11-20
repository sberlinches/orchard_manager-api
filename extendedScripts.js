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
 * Check whether the object given is contained in the parent array or not
 *
 * @param object The object to evaluate
 * @returns {boolean}
 */
Array.prototype.objectContains = function(object) {

    for (var i = 0, length = this.length; i < length; i++) {
        if(isObjectWithinObject(this[i], object)) return true;
    }

    return false;
};

/**
 * Checks whether the objectChild is contained in the objectParent or not
 *
 * @param objectParent
 * @param objectChild
 * @returns {boolean}
 */
function isObjectWithinObject(objectParent, objectChild) {

    var keys    = Object.keys(objectChild);
    var res     = true;

    for (var i = 0, lenght = keys.length; i < lenght; i++) {
        if(objectParent[keys[i]] !== objectChild[keys[i]])
            res = false;
    }

    return res;
}

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
 * @param {boolean} removeNulls
 * @param {boolean} removeDuplicates
 * @returns {*}
 */
Array.prototype.groupBy = function(groupParameters, removeNulls, removeDuplicates) {

    var check = 'id';
    var inputArr = this;

    // 1. return the input if:
    // the array to group by is empty (inputArr)
    // the array of parameters to group for is empty (groupParameters)
    if (!inputArr.length || !groupParameters.length) {
        return inputArr;
    }

    // 2. extract the keys of the first object in the array
    // Due to every object is going to have the same keys, it's not worth do it for every single one
    var keys = Object.keys(inputArr[0]);
    var outputObj = {};

    // 3. Add the parent parameters of the new object
    keys.forEach(function(key) {

        // 3.1. If it's a parameter to be grouped add the value to the new object
        if(groupParameters.includes(key)) {
            outputObj[key] = inputArr[0][key];
        }
        // 3.2. The non grouped parameters are going to be agregated
        else {
            outputObj[key] = [];

            // 3.2.1. Fill the array
            inputArr.forEach(function(inputObject) {

                if(inputObject[key].id !== null) { // TODO: temporal fix to avoid oject full of null attributes

                    if(removeDuplicates) { //TODO: this should be an object instead of a boolean
                        if(key === 'users') {
                            if(!outputObj[key].objectContains({id:inputObject[key].id, roleId:inputObject[key].roleId})) {
                                outputObj[key].push(inputObject[key]);
                            }
                        } else {
                            if(!outputObj[key].objectContains({id:inputObject[key].id})) {
                                outputObj[key].push(inputObject[key]);
                            }
                        }
                    } else {
                        outputObj[key].push(inputObject[key]);
                    }
                }
            });
        }
    });

    return outputObj;
};