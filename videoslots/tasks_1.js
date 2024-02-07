// ************************************  Task 1  ****************************

// find multipliers
const arrayOfNumbers = [4, 6, 8, 12, 16, 24, 32, 36, 40, -12, -4, -6, 0, 1, 2, 9, 17, 33, 101, 4.4, 6.6];

function findMultiplier(arr) {
    let multipliers = [];
    for ( let num of arr ) {
        if ((num % 4 === 0) || (num % 6 === 0)) {
            multipliers.push(num);
        }
    }
    return multipliers;
}

let resultOfMultiplier = findMultiplier(arrayOfNumbers); // expected result [4,6,8,12,16,24,32,36,40,-12,-4,-6,0]
console.log(`Numbers that have got mutlipliers 4 or 6 or both are: ${resultOfMultiplier}`);

// verify whether string is polindrome
let string = 'ab1ba';

// function verify whether the string is a polyndrome and return true or false
function isPolyndrome(string) {
    const reversedString = [...string].reverse().join('');
    return reversedString === string ? true : false;
}

console.log(`The string ${string} is polyndrome? ${isPolyndrome(string)}`);

