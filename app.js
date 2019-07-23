const display = document.querySelector('#display');
const keysContainer = document.querySelector('#keys-container');

// get key click, run function
keysContainer.addEventListener('click', (e) => {
    const keyClassList = e.target.classList;
    const keyValue = e.target.innerText;

    if (keyClassList.contains('num-key')) { return numKey(keyValue); }
    if (keyClassList.contains('op-key')) { return opKey(keyValue); }
    if (keyClassList.contains('calc-key')) { return calcKey(); }
    if (keyClassList.contains('deci-key')) { return deciKey(); }
    if (keyClassList.contains('clear-key')) { return clearKey(); }
})

let val1 = null,
    val2 = null,
    operator = null,
    decimal = false;

function numKey(keyValue) {
    // 0 == on load default value
    if (display.innerText == 0 && decimal == false) {
        display.innerText = keyValue;
    }
    // 2nd opKey click runs calcKey()
    else if (operator != null && val2 == null) {
        display.innerText = keyValue;
        val2 = 'temp';
    } else {
        display.innerText += keyValue;
    };
}

function opKey(keyValue) {
    // 2nd click on opKey
    if (operator != null) { calcKey(); }

    if (keyValue == '+') { operator = 'add'; }
    if (keyValue == '-') { operator = 'subtract'; }
    if (keyValue == '*') { operator = 'multiply'; }
    if (keyValue == '÷') { operator = 'divide'; }

    val1 = display.innerText;
    return val1, operator;
}

function calcKey() {
    val2 = display.innerText;

    if (operator == 'add') { display.innerText = parseFloat(val1) + parseFloat(val2); }
    if (operator == 'subtract') { display.innerText = parseFloat(val1) - parseFloat(val2); }
    if (operator == 'multiply') { display.innerText = parseFloat(val1) * parseFloat(val2); }
    if (operator == 'divide') { display.innerText = parseFloat(val1) / parseFloat(val2); }
console.log(`${val1} ${val2}`)
    return val1 = display.innerText, val2 = null;
}

function deciKey() {
    if (decimal == false) { return display.innerText += '.', decimal = true }
}

function clearKey() {
    return display.innerText = 0, val1 = null, val2 = null, operator = null, decimal = false;
}