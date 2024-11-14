let matrix = Array.from({ length: 5 }, () => Array(5).fill(''))
console.log(matrix)

// remove duplicates from an array 
let arr = [3, 6, 3, 9, 1, 7]
const arr1 = [...new Set(arr)]
console.log(arr1)
let arr2 = [30, 60, 3, 9, 10, 7, 30]
const arr3 = Array.from(new Set(arr2))
console.log(arr3)

const array = [1, 2, 2, 3, 4, 4, 5];

console.log(array.filter((val, index) => array.indexOf(val) === index))
console.log(array.map((val, index) => array.indexOf(val) === index ? val : null).filter(val => val !== null))
console.log(array.reduce((accum, val) => {
    if (!accum.includes(val)) {
        accum.push(val)
    }
    return accum
}, []))

//flat array

function flat(arr) {
    let result = [];
    arr.forEach((val) => {
        if (Array.isArray(val)) {
            result.push(...flat(val))
        }
        else {
            result.push(val)
        }
    })
    return result;
}
let nested = [1, 3, [7, 8], 3, 4, [9, 19, 40, [76, 89]]]
console.log(flat(nested))

// Given an array and a function, return the list of results from applying the function to each element in the array.

let newArr = [1, 4, 7, 3, 9];
const fexp = (val) => val * 10;
const data = multiple(newArr, fexp);

function multiple(arr, func) {
    return arr.map(func)
}
console.log(data)