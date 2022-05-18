// console.log(typeof {key1: 'value1'})
// console.log(typeof [1, 2, 3, 4])

const myObject = {
    'key1': 'value1',
    key2: 'value2',
    key3: [1, 2, 3, 4, 5, 6],
    key4: function() {
        console.log('Hello, from inside an object')
    },
    key5: {
        nestedKey1: 'nestedValue1',
        nestedKey2: 'nestedValue2'
    }
}

for (const key in myObject) {
    // console.log(key)
    // console.log(`${key}: ${myObject[key]}`);
}

// console.log(Object.keys(myObject))

function Student(name, cohort, email) {
    this.cohort = cohort,
    this.name = name,
    this.email = email
}

const camilo = new Student('camilo', 'april 2022', 'c@g.com');
const jordan = new Student('jordan', 'april 2022', 'j@lhl.com');

// console.log(Object.keys(camilo))
// console.log(Object.values(camilo))

// Object.freeze(camilo);
// console.log(Object.isFrozen(camilo))
camilo.name = 'Nadya';

// Object.unfreeze(camilo);
// console.log(camilo)

// console.log(camilo.email)
// console.log(jordan.email)

// console.log(typeof 'string')
function getCharacterCount(string) {
    const charCount = {};

    if (typeof string !== 'string') {
        return "Error, wrong input type"
    }


    for (let i = 0; i <= string.length; i++) {
        // ex. 'LighthouseLabs'
        const char = string[i];
        // const char = string.charAt(i)

        // check for existance in charCount
        if (char in charCount) {  // one way of checking if a key exists in an object
            charCount[char]++;
        } else {
            charCount[char] = 1
        }
    }

    return charCount;
}


console.log(getCharacterCount({1234: 1234}))

// console.log()



