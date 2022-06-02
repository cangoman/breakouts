// Functions are first-class citizens - can be passed as arguments to functions, and can be returned from functions
const doSomethingWithSomeStuff = (something, stuff) => {
    something(stuff);
}

const greet = (name = 'stranger') => {
    console.log(`Hello, ${name}`);
}

const sayBye = (name = 'stranger') => {
    console.log(`Goodbye, ${name}`)
}


// doSomethingWithSomeStuff(greet, 'camilo')
// doSomethingWithSomeStuff(sayBye, 'camilo')

const makeAdder = function(addend) {
    return function(arg1) {
        return arg1 + addend;
    }
}

const add2 = makeAdder(2)
const add5 = makeAdder(5)
const add10 = makeAdder(10);

// console.log(add2(5))
// console.log(add5(10))
// console.log(add10(30))
// console.log(add2(100))
// console.log(add5(5))