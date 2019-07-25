const display = document.querySelector('#display');
const keysContainer = document.querySelector('#keys-container');

let inpNum = null,
    result = null,
    val1 = null,
    val2 = null,
    operator = null,
    currKey = null,
    prevKey = null;

// get key click, run function
keysContainer.addEventListener('click', (e) => {
    const keyClassList = e.target.classList;
    const keyValue = e.target.innerText;

    if (keyClassList.contains('num-key')) return num(keyValue);
    if (keyClassList.contains('op-key')) return currKey = 'opKey', op(keyValue);
    if (keyClassList.contains('calc-key')) return currKey = 'calcKey', calc();
    if (keyClassList.contains('deci-key')) return deci();
    if (keyClassList.contains('clear-key')) return clear();
});

function num(keyValue) {
    inpNum = display.innerText;
    // clear display 0 on page load
    if (display.innerText === '0') {
        inpNum = keyValue;
    }
    // clear display after op click
    else if (prevKey == 'opKey' && val2 == null) {
        inpNum = keyValue;
        val2 = 'temp';
    } else {
        inpNum += keyValue;
    }

    return display.innerText = formatOutput(inpNum);
}

function op(keyValue) {
    if (prevKey == 'opKey') { calc(); }

    if (keyValue == '+') { operator = 'add'; }
    if (keyValue == '-') { operator = 'subtract'; }
    if (keyValue == '*') { operator = 'multiply'; }
    if (keyValue == '÷') { operator = 'divide'; }

    val1 = display.innerText;

    return val1, operator, prevKey = currKey;
}

function calc() {
    val2 = display.innerText;

    result = null;

    if (operator == 'add') { result = parseFloat(val1) + parseFloat(val2); }
    if (operator == 'subtract') { result = parseFloat(val1) - parseFloat(val2); }
    if (operator == 'multiply') { result = parseFloat(val1) * parseFloat(val2); }
    if (operator == 'divide') { result = parseFloat(val1) / parseFloat(val2); }

    deciPlaces(result);
    formatOutput(result);

    return display.innerText = result, val2 = null, prevKey = currKey;
}

function deci() {
    if (display.innerText.includes('.')) return;
    display.innerText += '.';
}

function clear() {
    return display.innerText = 0, val1 = null, val2 = null, operator = null, currKey = null, prevKey = null, display.style.fontSize = '3em';
}

function deciPlaces(number) {
    if (number.toString().split('.')[1] > 4) {
        return result = parseFloat(number.toFixed(4));
    } else { return number; }
}

function formatOutput(result) {
    let numLength = result.toString().length;

    if (numLength > 9 && numLength <= 11) {
        display.style.fontSize = '2.5em';
    } else if (numLength > 11 && numLength <= 13) {
        display.style.fontSize = '2em';
    } else if (numLength > 14) {
        return display.style.fontSize = '2em', 'too big!!! (clear)';
    }
    return result;
}