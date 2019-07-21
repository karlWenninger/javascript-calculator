const display = document.querySelector('#display');
const keysContainer = document.querySelector('#keys-container');

let val1 = 0,
    val2 = 0,
    operator = '',
    decimal = false;

keysContainer.addEventListener('click', (e) => {
    const keyPress = e.target;

    if (keyPress.classList.contains('num-key')) {
        if (display.innerText == 0) {
            display.innerText = keyPress.innerText;
        } else if (val1 != 0 && val2 == 0) {
            display.innerText = keyPress.innerText;
            val2 = display.innerText;
        } else {
            display.innerText += keyPress.innerText;
        }
    }

    if (keyPress.className == 'op-key') {
        val1 = display.innerText;
        if (val1 == 0) {
            return
        } else {
            if (keyPress.innerText == '+') { operator = 'add'; }
            if (keyPress.innerText == '-') { operator = 'subtract'; }
            if (keyPress.innerText == '*') { operator = 'multiply'; }
            if (keyPress.innerText == '÷') { operator = 'divide'; }
        }
        console.log(`op ${val1} ${val2} ${operator} ${display.innerText}`)
        return val1, operator, decimal = false;
    }

    if (keyPress.className == 'calc-key') {
        val2 = display.innerText;

        if (operator == 'add') { display.innerText = parseFloat(val1) + parseFloat(val2); }
        if (operator == 'subtract') { display.innerText = parseFloat(val1) - parseFloat(val2); }
        if (operator == 'multiply') { display.innerText = parseFloat(val1) * parseFloat(val2); }
        if (operator == 'divide') { display.innerText = parseFloat(val1) / parseFloat(val2); }
        console.log(`calc ${val1} ${val2} ${operator} ${display.innerText}`)

        return val1 = display.innerText, val2 = 0, decimal = false;
    }

    if (keyPress.className == 'deci-key') {
        if (decimal == true) {
            return
        } else {
            display.innerText += keyPress.innerText;
            return decimal = true;
        }
    }

    if (keyPress.className == 'clear-key') {
        return display.innerText = 0, val1 = 0, val2 = 0, operator = '', decimal = false;
    }
})