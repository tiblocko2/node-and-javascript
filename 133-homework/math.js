function sum() {
    let total = 0;
    for (let i = 0; i < arguments.length; i++) {
        total += arguments[i];
    }

    return total;
}

function mul() {
    let total = 1;
    for (let i = 0; i < arguments.length; i++) {
        total = total * arguments[i];
    }

    return total;
}

function avg() {
    let total = 0;
    for (let i = 0; i < arguments.length; i++) {
        total += arguments[i];
    }

    return total / arguments.length;
}


module.exports = {
    sum,
    mul,
    avg
}