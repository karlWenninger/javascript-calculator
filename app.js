const display = document.querySelector('#display');
const keysContainer = document.querySelector('#keys-container');
const maxDisplayLength = 12;
const errMsg = "too big!!! [clear]"


let inpNum = null,
    result = null,
    val1 = null,
    val2 = null,
    operator = null,
    currKey = null,
    prevKey = null,
    displayOverload = false;

// get key click, run function
keysContainer.addEventListener('click', (e) => {
    const keyClassList = e.target.classList;
    const keyValue = e.target.innerText;

    if (displayOverload == true) {
        if (e.target.className != 'clear-key') {
            return
        }
    }

    if (keyClassList.contains('num-key')) return num(keyValue);
    if (keyClassList.contains('op-key')) return currKey = 'opKey', op(keyValue);
    if (keyClassList.contains('calc-key')) return currKey = 'calcKey', calc();
    if (keyClassList.contains('deci-key')) return deci();
    if (keyClassList.contains('clear-key')) return clear();
});

function num(keyValue) {
    inpNum = display.innerText;
    // clear page load display 0
    if (display.innerText === '0') {
        inpNum = keyValue;
    }
    // clear display after opKey click
    else if (prevKey == 'opKey' && val2 == null) {
        inpNum = keyValue;
        val2 = 'temp';
    } else {
        inpNum += keyValue;
    }
    formatOutput(inpNum)
    return display.innerText = inpNum;
}

function op(keyValue) {
    if (prevKey == 'opKey') {
        calc();
    }
    if (keyValue == '+') {
        operator = 'add';
    }
    if (keyValue == '-') {
        operator = 'subtract';
    }
    if (keyValue == '*') {
        operator = 'multiply';
    }
    if (keyValue == '÷') {
        operator = 'divide';
    }

    val1 = display.innerText;

    return val1, operator, prevKey = currKey;
}

function calc() {
    if (operator == null) {
        return
    }
    val2 = display.innerText;

    result = null;

    if (operator == 'add') {
        result = parseFloat(val1) + parseFloat(val2);
    }
    if (operator == 'subtract') {
        result = parseFloat(val1) - parseFloat(val2);
    }
    if (operator == 'multiply') {
        result = parseFloat(val1) * parseFloat(val2);
    }
    if (operator == 'divide') {
        result = parseFloat(val1) / parseFloat(val2);
    }

    deciPlaces(result);
    formatOutput(result)
    return display.innerText = result, val2 = null, prevKey = currKey;
}

function deci() {
    if (display.innerText.includes('.')) {
        return
    } else {
        display.innerText += '.';
    }
}

function clear() {
    return display.innerText = 0, val1 = null, val2 = null, operator = null, currKey = null, prevKey = null, displayOverload = false, display.style.fontSize = '2.5em';
}

function deciPlaces(num) {
    const numString = num.toString();
    if (numString.includes('.')) {
        if (numString.length > maxDisplayLength) {
            const maxDeci = maxDisplayLength - numString.split('.')[0].length - 1;
            result = parseFloat(num.toFixed(maxDeci))
        }
    }
}

function formatOutput(num) {
    let numLength = num.toString().length;
    if (numLength > 8 && numLength <= 10) {
        display.style.fontSize = '2em';
    } else if (numLength > 10 && numLength <= maxDisplayLength) {
        display.style.fontSize = '1.6em';
    } else if (numLength > maxDisplayLength) {
        display.style.fontSize = '1.6em';
        inpNum = errMsg;
        result = errMsg;
        displayOverload = true;
    }
}