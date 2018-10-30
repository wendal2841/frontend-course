'use strict'

var getSortedArray = (array) => {
    for(var i = 1; i<array.length; i++){
        var tmp = array[i];
        var j = i;
        while(j>0 && array[j-1]>tmp){
            array[j] = array[j-1];
            j --;
        }
        array[j]=tmp;
    }
    return array;
}

function getUserArray() {
    var userString = document.getElementById("userString").value;
    return userString.split(' ');
}
function printSortedArray() {
    var userArray = getUserArray();
    document.getElementById("sortedArray").innerHTML = getSortedArray(userArray).join(' ');
}