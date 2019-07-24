const display = document.querySelector('#display');
const keysContainer = document.querySelector('#keys-container');

let
    inpNum = null,
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
})

function num(keyValue) {
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
    };

    return display.innerText = formatDisplayFont(inpNum);
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

    let result = null;

    if (operator == 'add') { result = parseFloat(val1) + parseFloat(val2); }
    if (operator == 'subtract') { result = parseFloat(val1) - parseFloat(val2); }
    if (operator == 'multiply') { result = parseFloat(val1) * parseFloat(val2); }
    if (operator == 'divide') { result = parseFloat(val1) / parseFloat(val2); }
    // console.log(result.toString().length)
    return display.innerText = formatDisplayFont(result), val2 = null, prevKey = currKey;
}

function deci() {
    if (display.innerText.includes('.')) return;
    display.innerText += '.';
}

function clear() {
    return display.innerText = 0, val1 = null, val2 = null, operator = null, currKey = null, prevKey = null, display.style.fontSize = '3em';
}


function formatDisplayFont(number) {
    let numLength = number.toString().length;

    if (numLength > 8 && numLength <= 10) {
        display.style.fontSize = '2.3em';
    } else if (numLength > 10 && numLength <= 12) {
        display.style.fontSize = '2em';
    } else if (numLength > 12) {
        return 'too big!!! (clear)';
    }
    return number;
}