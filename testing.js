function compareArray(arr1, arr2) {
    // returns true if the arrays have the same values and the same length.
    if (arr1.length === arr2.length){
        for (var i = 0; i < arr1.length; i++) {
            if (arr1[i] !== arr2[i]) {
                return false;
            }
        }
        return true;
    } else {
        return false;
    }
}

// console.log("answer", answer);
// console.log("target", target);


// diferent test cases: all the same, all different, all diferent locations,
// duplicate digits, both and individual, false answers
// 
// console.log(compareArray(checkGuess([1,2,3,4], [5,6,7,8]), [0,0,0,0]));
// console.log(compareArray(checkGuess([1,2,3,4], [1,2,3,4]), [2,2,2,2]));
// console.log(compareArray(checkGuess([1,2,3,4], [4,3,2,1]), [1,1,1,1]));
// console.log(compareArray(checkGuess([0,0,0,0], [0,0,0,0]), [2,2,2,2]));
// console.log(compareArray(checkGuess([1,2,3,4], [4,3,3,1]), [1,1,1,1]));
// console.log(compareArray(checkGuess([], []), []));
// console.log(compareArray(checkGuess([], []), []));




// testing compareArray function

// console.log(compareArray([0,0,0,0],[0,0,0,0]))
// console.log(compareArray([0,0,0,0],[1,0,0,0]))
// console.log(compareArray([0,0,0,0],[0,0,0,0,0]))
// console.log(compareArray([],[]))