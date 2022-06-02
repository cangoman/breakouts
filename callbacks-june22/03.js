/* Convert these examples to use higher order functions */


// // Return a 'scaled' array (all numbers multiplied by a constant factor)
// const scale = function(number, factor) {
//     return number * factor
// }

const scaleArr = function(arr, factor) {
    const newArr = [];
    for (const num of arr) {
        newArr.push(scale(num, factor))
    }
    return newArr;
}

const map = function(arr, func) {
    const newArr = [];
    for (const num of arr) {
        newArr.push(func(num))
    }
    return newArr;
}


// Return an array with the cube of each number
const cubeArray = function(arr) {
    const newArr = [];
    for (const num of arr) {
        newArr.push(num*num*num);
    }

    return newArr;
} 

// Return an array with a function applied to every element
const applyToAll = function(arr, func) {
    const newArr = [];
    for (const num of arr) {
        newArr.push(func(num));
    }

    return newArr;
}


// Return the sum of all numbers in an array
// 

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const factor = 10;


function scale(val, i, arr) { // to pass it to Array.map as a callback function
    return val * i;
}


const scaledNums = numbers.map(scale)
console.log(scaledNums)
console.log(numbers)

// for (let i = 0; i < arr.length; i++) // c-style loop
// for (const element of array) // JS for of loop, 
// forEach // functional style

const foreach = numbers.forEach((el, i, arr) => console.log(el, i)) // runs, returns undefined
console.log(foreach) // forEach does not return a new array, just applies the callback to every element

// const scaledByCustomMap = map(numbers, (num) => num * factor)
// console.log(scaledByCustomMap)