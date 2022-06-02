// Write a function that prints out the type of each element in an array
// const myArr = [false, true, 1, 1.2, 'hello', () => console.log('hi'), {'a': 'b'}]
// console.log(myArr)
// const types = myArr.map( el => typeof el)
// console.log(types)
// 
// Write a function that deletes all elements in array above a threshold
const myArr = [1, 2, 3, 4, 5, 6, 7, 8, 9]
// .map(el=> el*el)
// console.log(myArr)

const threshold = 60;
// console.log(myArr.filter( el => el < threshold)) 
// .filter takes a callback function that returns a boolean: if true, element is included in the filtered array, if false it is not


const cubeArray = function(arr) {
    const newArr = [];
    for (const num of arr) {
        newArr.push(num*num*num);
    }

    return newArr;
} 

/*
these do the same thing
myArr.map(el => el*el*el)
cubeArray(myArr)

*/

function somth(func) {
    func()
}

// somth(cubeArray)
// console.log()



// Write a function that returns all the numeric values in an array
// const myArr = [false, true, 1, 1.2, 'hello', () => console.log('hi'), {'a': 'b'}]
// should return [1, 1.2]

