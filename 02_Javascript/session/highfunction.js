// 짝 홀 구구단 출력
function getArray(n) {
    return Array.from({length: n}, (value, key) => key + 1);
}

const result = getArray(9)
    .filter(outer => outer % 2 === 0)
    .flatMap(outer => getArray(9)
        .filter(inner => inner % 2 === 1)
        .map(inner => `${outer} * ${inner} = ${outer * inner}`));

console.log(result);

// 누적합 출력
const arr = [1, 3, 5, 7];
const newArr = arr.reduce((acc, cur) => [...acc, (acc.slice(-1)[0] ?? 0) + cur ], []);

function sum(arr, start, end) {
    return arr.slice(start, end + 1).reduce((acc, cur) => acc + cur, 0);
}

function sum2(start, end) {
    return newArr[end] - newArr[start - 1];
}
console.log("누적합: ", sum(arr, 1, 2));
console.log("누적합2: ", sum2(1, 2));

