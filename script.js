let lastResult = null;
let justCalculated = false;

// --- Part A: Procedural Paradigm ---
function evaluateProcedural(expr) {
    const tokens = expr.split(/([+\-*/%])/).map(t => t.trim());
    let result = parseFloat(tokens[0]);

    for (let i = 1; i < tokens.length; i += 2) {
        const operator = tokens[i];
        const num = parseFloat(tokens[i + 1]);
        if (operator === '+') result += num;
        else if (operator === '-') result -= num;
        else if (operator === '*') result *= num;
        else if (operator === '/') result /= num;
        else if (operator === '%') result %= num;
    }
    return result;
}

// --- Part B: Object-Oriented Paradigm ---
class SmartCalculator {
    constructor() {
        this.result = 0;
    }

    calculate(expr) {
        const tokens = expr.split(/([+\-*/%])/).map(t => t.trim());
        this.result = parseFloat(tokens[0]);

        for (let i = 1; i < tokens.length; i += 2) {
            const operator = tokens[i];
            const num = parseFloat(tokens[i + 1]);
            switch (operator) {
                case '+': this.result += num; break;
                case '-': this.result -= num; break;
                case '*': this.result *= num; break;
                case '/': this.result /= num; break;
                case '%': this.result %= num; break;
            }
        }
        return this.result;
    }
}

// --- Part C: Functional Paradigm ---
function evaluateFunctional(expr) {
    const tokens = expr.split(/([+\-*/%])/).map(t => t.trim());
    return tokens.slice(1).reduce((acc, val, idx) => {
        if (idx % 2 === 0) return acc;
        const operator = tokens[idx];
        const num = parseFloat(tokens[idx + 1]);
        switch (operator) {
            case '+': return acc + num;
            case '-': return acc - num;
            case '*': return acc * num;
            case '/': return acc / num;
            case '%': return acc % num;
        }
    }, parseFloat(tokens[0]));
}

// --- Part D: Event-Driven Logic ---
// --- NOTE: Part D is from this section up to Clear / Delete / Copy part ---
document.addEventListener('keydown', (event) => {
    const key = event.key;
    const allowedOperators = ['+', '-', '*', '/', '%'];

    if (!isNaN(key) || key === '.' || key === '%') appendValue(key);
    else if (allowedOperators.includes(key)) appendValue(key);
    else if (key === 'Enter') handleAction();
    else if (key === 'Backspace') deleteLast();
    else if (key === 'Escape') clearCalculator();

    if (!isNaN(key) || allowedOperators.includes(key) || ['Enter', 'Backspace', 'Escape'].includes(key)) {
        event.preventDefault();
    }
}); 

// --- Button / Keyboard Input ---
function appendValue(value) {
    const input = document.getElementById('expressionInput');

    if (justCalculated && input.value === '' && ['+', '-', '*', '/', '%'].includes(value)) {
        input.value = lastResult + value;
        justCalculated = false;
        return;
    }

    if (justCalculated && /[0-9.]/.test(value)) {
        input.value = value;
        justCalculated = false;
        return;
    }

    input.value += value;
    justCalculated = false;
}

// --- History Management ---
function addToHistory(expr, result) {
    const list = document.getElementById('historyList');
    const entry = document.createElement('li');
    entry.innerText = `${expr} = ${result}`;
    list.prepend(entry);
}

function clearHistory() {
    document.getElementById('historyList').innerHTML = '';
}

// --- Clear / Delete / Copy ---
function clearCalculator() {
    document.getElementById('expressionInput').value = '';
    document.getElementById('resultDisplay').innerText = 'Result: --';
}

function deleteLast() {
    const input = document.getElementById('expressionInput');
    input.value = input.value.slice(0, -1);
}

function copyResult() {
    const display = document.getElementById('resultDisplay');
    const input = document.getElementById('expressionInput');
    const res = display.innerText.replace('Result: ', '');

    if (res !== '--' && res !== 'Error') {
        input.value += res;
        lastResult = res;
        justCalculated = false;
        navigator.clipboard.writeText(res);
    }
}
// --- END OF PART D ---

// --- MAIN HANDLER (called on '=' or Enter) ---
function handleAction() {
    const input = document.getElementById('expressionInput');
    const expression = input.value;
    const mode = document.getElementById('paradigmChoice').value;
    const display = document.getElementById('resultDisplay');

    if (!expression) {
        display.innerText = "Result: Enter expression!";
        return;
    }

    try {
        let result;

        if (mode === 'procedural') {
            result = evaluateProcedural(expression);
        } else if (mode === 'oop') {
            const calc = new SmartCalculator();
            result = calc.calculate(expression);
        } else if (mode === 'functional') {
            result = evaluateFunctional(expression);
        }

        display.innerText = `Result: ${result}`;
        addToHistory(expression, result);

        lastResult = result;
        justCalculated = true;
        input.value = '';
    } catch (err) {
        display.innerText = "Result: Error";
    }
}

// --- Restrict Keyboard Input ---
const inputField = document.getElementById('expressionInput');
inputField.addEventListener('input', function () {
    this.value = this.value.replace(/[^0-9+\-*/.%]/g, '');
});