const display = document.querySelector('#display');
const keysContainer = document.querySelector('#keys-container');

let val1 = null,
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
        display.innerText = keyValue;
    }
    // clear display after op click
    else if (prevKey == 'opKey' && val2 == null) {
        display.innerText = keyValue;
        val2 = 'temp';
    } else {
        display.innerText += keyValue;
    };
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

    if (operator == 'add') { display.innerText = parseFloat(val1) + parseFloat(val2); }
    if (operator == 'subtract') { display.innerText = parseFloat(val1) - parseFloat(val2); }
    if (operator == 'multiply') { display.innerText = parseFloat(val1) * parseFloat(val2); }
    if (operator == 'divide') { display.innerText = parseFloat(val1) / parseFloat(val2); }

    return val2 = null, prevKey = currKey;
}

function deci() {
    if (display.innerText.includes('.')) return;
    display.innerText += '.';
}

function clear() {
    return display.innerText = 0, val1 = null, val2 = null, operator = null, currKey = null, prevKey = null;
}