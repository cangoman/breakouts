// Syntax for functions

// function declaration
function doSomething() {
    // the 'something' to be done
}

//function expression
const doThisToo = function() {
    // the thing to be done
}

// arrow function // what if we have no arguments? how about many arguments?
const funkyFunc = (arg1, arg2) => {
    return function() {
        return arg1 + arg2;
    };
};


const result = funkyFunc(1, 2);
// console.log(result) // [Function (anonymous)]
// console.log(typeof result) // 'function'

console.log(result()) // 3

