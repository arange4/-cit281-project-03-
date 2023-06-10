function validDenomination(coin) {
    return [1, 5, 10, 25, 50, 100].indexOf(coin) !== -1;
}
function valueFromCoinObject(obj) {
    const { denom = 0, count = 0 } = obj;
    return validDenomination(denom) ? denom*count:0
}
function coinCount(...coinage) {
    return valueFromArray(coinage);
}
function valueFromArray(arr) {
    return arr.reduce(
        (acc,val) =>
        Array.isArray(val)? valueFromArray(val): acc+valueFromCoinObject(val),0
    );
 }
 console.log("{}",coinCount({denom:5,count:3}));