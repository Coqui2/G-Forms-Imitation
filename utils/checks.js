function falsy(val) {
    return isUndefined(val) || isNull(val) || isEmpty(val);
}

function truthy(val) {
    return !falsy(val);
}

function isUndefined(val) {
    return typeof val === 'undefined';
}

function isNull(val) {
    return val === null;
}

function nullOrUndefined(val) {
    return isNull(val) || isUndefined(val);
}

function isEmpty(val) {
    if (Array.isArray(val)) {
        return val.length === 0
    }
    if (!isNaN(val)) {
        return false
    }
    if (nullOrUndefined(val)) return true;
    
    return Object.keys(val).length === 0;
}
function isString(val){
    return typeof val === 'string';
}

function solution (A){
    const sortedPositiveIntegers = A.filter(c => c>0).sort();
    const removedDuplicates = sortedPositiveIntegers.filter((item,index)=>sortedPositiveIntegers.indexOf(item)===index);
    for(let i=0;i<removedDuplicates.length;i++){
        if(!(removedDuplicates[i]===i+1)) return i+1
    }
}

function solution2 (A){
    const sortedPositiveIntegers = A.filter(c => c>0).sort();
    let counter = 1;
    for(let i=0;i<sortedPositiveIntegers.length;i++){
        if(!(sortedPositiveIntegers[i]===sortedPositiveIntegers[i+1]||sortedPositiveIntegers[i]+1===sortedPositiveIntegers[i+1])){
            return counter;
        }
        if(sortedPositiveIntegers[i]+1===sortedPositiveIntegers[i+1]){
            counter++;
        }
    }
}

module.exports = {
    nullOrUndefined,
    isString
}
