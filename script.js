let lastResult = null;
let justCalculated = false;

//--- Part A: Procedural ---
function evaluateProcedural(expr) {
    const tokens = parseTokens(expr);
    let result = parseFloat(tokens[0]);

    for (let i = 1; i < tokens.length; i += 2) {
        const operator = tokens[i];
        const num = parseFloat(tokens[i + 1]);

        if (operator === '+') result += num;
        else if (operator === '-') result -= num;
        else if (operator === '*') result *= num;
        else if (operator === '/') {
            if (num === 0) throw new Error();
            result /= num;
        }
        else if (operator === '%') {
            if (num === 0) throw new Error();
            result %= num;
        }
    }

    if (!isFinite(result)) throw new Error();
    return result;
}

//--- Part B: OOP ---
class SmartCalculator {
    constructor() {
        this.result = 0;
    }

    calculate(expr) {
        const tokens = parseTokens(expr);
        this.result = parseFloat(tokens[0]);

        for (let i = 1; i < tokens.length; i += 2) {
            const operator = tokens[i];
            const num = parseFloat(tokens[i + 1]);

            switch (operator) {
                case '+': this.result += num; break;
                case '-': this.result -= num; break;
                case '*': this.result *= num; break;
                case '/':
                    if (num === 0) throw new Error();
                    this.result /= num;
                    break;
                case '%':
                    if (num === 0) throw new Error();
                    this.result %= num;
                    break;
            }
        }

        if (!isFinite(this.result)) throw new Error();
        return this.result;
    }
}

//--- Part C: Functional ---
function evaluateFunctional(expr) {
    const tokens = parseTokens(expr);

    return tokens.slice(1).reduce((acc, val, idx) => {
        if (idx % 2 === 0) return acc;

        const operator = tokens[idx];
        const num = parseFloat(tokens[idx + 1]);

        switch (operator) {
            case '+': return acc + num;
            case '-': return acc - num;
            case '*': return acc * num;
            case '/':
                if (num === 0) throw new Error();
                return acc / num;
            case '%':
                if (num === 0) throw new Error();
                return acc % num;
        }
    }, parseFloat(tokens[0]));
}

//--- Helpers ---
function parseTokens(expr) {
    let tokens = expr.split(/([+\-*/%])/).map(t => t.trim());

    if (tokens[0] === "" && tokens[1] === "-") {
        tokens = ["-" + tokens[2], ...tokens.slice(3)];
    }

    return tokens;
}

function isValidExpression(expr) {
    if (!/^[0-9+\-*/.%()]+$/.test(expr)) return false;

    let balance = 0;
    for (let char of expr) {
        if (char === '(') balance++;
        else if (char === ')') balance--;
        if (balance < 0) return false;
    }
    if (balance !== 0) return false;

    if (/[+\-*/%]$/.test(expr)) return false;

    let exp = expr.replace(/\(\-/g, '(');
    if (/[+\-*/%]{2,}/.test(exp)) return false;

    return true;
}

function preprocessExpression(expr) {
    expr = expr.replace(/(\d)\(/g, '$1*(');
    expr = expr.replace(/\)(\d)/g, ')*$1');
    expr = expr.replace(/\)\(/g, ')*(');
    return expr;
}

function evaluateWithParentheses(expr) {
    try {
        expr = preprocessExpression(expr);
        let result = Function(`"use strict"; return (${expr})`)();

        if (!isFinite(result)) throw new Error();
        return result;
    } catch {
        throw new Error();
    }
}

//--- Event Driven ---
document.addEventListener('keydown', (event) => {
    const key = event.key;
    const allowed = ['+', '-', '*', '/', '%', '(', ')'];

    if (!isNaN(key) || key === '.' || allowed.includes(key)) appendValue(key);
    else if (key === 'Enter') handleAction();
    else if (key === 'Backspace') deleteLast();
    else if (key === 'Escape') clearCalculator();

    if (!isNaN(key) || allowed.includes(key) || ['Enter','Backspace','Escape'].includes(key)) {
        event.preventDefault();
    }
});

//--- Input ---
function appendValue(value) {
    const input = document.getElementById('expressionInput');
    const start = input.selectionStart;
    const end = input.selectionEnd;

    if (justCalculated && input.value === '' && ['+', '-', '*', '/', '%', '(', ')'].includes(value)) {
        input.value = lastResult + value;
        justCalculated = false;
        input.selectionStart = input.selectionEnd = input.value.length;
        return;
    }

    if (justCalculated && /[0-9.]/.test(value)) {
        input.value = value;
        justCalculated = false;
        input.selectionStart = input.selectionEnd = input.value.length;
        return;
    }

    const before = input.value.substring(0, start);
    const after = input.value.substring(end);
    input.value = before + value + after;

    input.selectionStart = input.selectionEnd = start + value.length;
    justCalculated = false;
}

//--- History ---
function addToHistory(expr, result) {
    const list = document.getElementById('historyList');
    const entry = document.createElement('li');
    entry.innerText = `${expr} = ${result}`;
    list.prepend(entry);
}

function clearHistory() {
    document.getElementById('historyList').innerHTML = '';
}

//--- Clear / Delete / Copy ---
function clearCalculator() {
    document.getElementById('expressionInput').value = '';
    document.getElementById('resultDisplay').innerText = 'Result: --';
}

function deleteLast() {
    const input = document.getElementById('expressionInput');
    const start = input.selectionStart;
    const end = input.selectionEnd;

    if (start === end) {
        // No selection, delete character before cursor
        if (start === 0) return;
        input.value =
            input.value.slice(0, start - 1) +
            input.value.slice(end);
        input.selectionStart = input.selectionEnd = start - 1;
    } else {
        // Delete selected text
        input.value =
            input.value.slice(0, start) +
            input.value.slice(end);
        input.selectionStart = input.selectionEnd = start;
    }
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

//--- Main Handler ---
function handleAction() {
    const input = document.getElementById('expressionInput');
    const expression = input.value;
    const display = document.getElementById('resultDisplay');
    const mode = document.getElementById('paradigmChoice')?.value;

    if (!expression) {
        display.innerText = "Result: Enter expression!";
        return;
    }

    if (!isValidExpression(expression)) {
        display.innerText = "Result: Error";
        return;
    }

    try {
        let result;

        if (expression.includes("(")) {
            result = evaluateWithParentheses(expression);
        } else {
            if (mode === 'procedural') result = evaluateProcedural(expression);
            else if (mode === 'oop') result = new SmartCalculator().calculate(expression);
            else if (mode === 'functional') result = evaluateFunctional(expression);
        }

        display.innerText = `Result: ${result}`;
        addToHistory(expression, result);

        lastResult = result;
        justCalculated = true;
        input.value = '';

    } catch {
        display.innerText = "Result: Error";
    }
}

//--- Input Filter ---
const inputField = document.getElementById('expressionInput');
inputField.addEventListener('input', function () {
    this.value = this.value.replace(/[^0-9+\-*/.%()]/g, '');
});