/**
 * SMART ARITHMETIC CALCULATOR - MULTI-PARADIGM IMPLEMENTATION
 * Parts: A - Procedural, B - OOP, C - Functional, D - Event-Driven
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- Global References ---
    const inputField = document.getElementById('expressionInput');
    const paradigmSelect = document.getElementById('paradigmChoice');
    const display = document.getElementById('resultDisplay');
    const historyList = document.getElementById('historyList');

    // --- PART A: Procedural Paradigm ---
    function proceduralCalculator(n1, n2, op) {
        if (op === '+') return n1 + n2;
        if (op === '-') return n1 - n2;
        if (op === '*') return n1 * n2;
        if (op === '/') return n2 === 0 ? "Error: Division by 0" : n1 / n2;
        if (op === '%') return n2 === 0 ? "Error: Modulus by 0" : n1 % n2;
        return "Error: Invalid Operator";
    }

    // --- PART B: Object-Oriented Paradigm ---
    class Calculator {
        constructor(n1, n2, op) {
            this.n1 = n1;
            this.n2 = n2;
            this.op = op;
        }
        compute() {
            switch (this.op) {
                case '+': return this.n1 + this.n2;
                case '-': return this.n1 - this.n2;
                case '*': return this.n1 * this.n2;
                case '/': return this.n2 === 0 ? "Error: Division by 0" : this.n1 / this.n2;
                case '%': return this.n2 === 0 ? "Error: Modulus by 0" : this.n1 % this.n2;
                default: return "Error: Invalid Operator";
            }
        }
    }

    // --- PART C: Functional Paradigm ---
    function functionalCalculator(n1, n2, op) {
        const operations = {
            '+': (a, b) => a + b,
            '-': (a, b) => a - b,
            '*': (a, b) => a * b,
            '/': (a, b) => b === 0 ? "Error: Division by 0" : a / b,
            '%': (a, b) => b === 0 ? "Error: Modulus by 0" : a % b
        };
        return operations[op] ? operations[op](n1, n2) : "Error: Invalid Operator";
    }

    // --- HISTORY MANAGEMENT ---
    function addToHistory(n1, n2, op, result) {
        const li = document.createElement('li');
        li.innerText = `${n1} ${op} ${n2} = ${result}`;
        historyList.prepend(li);
    }

    function clearHistory() {
        historyList.innerHTML = '';
    }

    // --- CORE CALCULATION HANDLER ---
    function handleAction() {
        const expression = inputField.value.trim();
        const paradigm = paradigmSelect.value;

        // Validate input
        const match = expression.match(/(\d+\.?\d*)\s*([\+\-\*\/\%])\s*(\d+\.?\d*)/);
        if (!match) {
            display.innerText = "Result: Invalid expression!";
            return;
        }

        const n1 = parseFloat(match[1]);
        const op = match[2];
        const n2 = parseFloat(match[3]);

        let result;
        switch (paradigm) {
            case 'procedural': result = proceduralCalculator(n1, n2, op); break;
            case 'oop': result = new Calculator(n1, n2, op).compute(); break;
            case 'functional': result = functionalCalculator(n1, n2, op); break;
            default: result = proceduralCalculator(n1, n2, op);
        }

        display.innerText = `Result: ${result}`;
        addToHistory(n1, n2, op, result);
        inputField.value = '';
    }

    // --- PART D: Event-Driven Paradigm ---
    function setupEventDriven() {
        // Number/Operator Buttons
        document.querySelectorAll('.operators button').forEach(btn => {
            btn.addEventListener('click', () => {
                inputField.value += btn.getAttribute('data-value');
            });
        });

        // Utility Buttons
        document.getElementById('btnClear').addEventListener('click', () => {
            inputField.value = '';
            display.innerText = 'Result: --';
        });

        document.getElementById('btnDelete').addEventListener('click', () => {
            inputField.value = inputField.value.slice(0, -1);
        });

        document.getElementById('btnCopy').addEventListener('click', () => {
            const result = display.innerText.replace('Result: ', '');
            if (result && !isNaN(result)) navigator.clipboard.writeText(result);
        });

        document.getElementById('btnEqual').addEventListener('click', handleAction);
        document.getElementById('btnClearHistory').addEventListener('click', clearHistory);

        // Keyboard Support
        document.addEventListener('keydown', (e) => {
            const allowed = ['+', '-', '*', '/', '%', '.', 'Enter', 'Backspace', 'Escape'];
            if (!isNaN(e.key) || allowed.includes(e.key)) {
                if (e.key === 'Enter') handleAction();
                else if (e.key === 'Backspace') inputField.value = inputField.value.slice(0, -1);
                else if (e.key === 'Escape') inputField.value = '';
                else inputField.value += e.key;
                e.preventDefault();
            }
        });
    }

    // Activate Event-Driven setup
    setupEventDriven();
});

// Paste from clipboard into calculator input
document.getElementById('btnPaste').addEventListener('click', async () => {
    const input = document.getElementById('expressionInput');
    try {
        const text = await navigator.clipboard.readText(); // read clipboard
        input.value += text; // append clipboard content
    } catch (err) {
        alert("Failed to read clipboard: " + err);
    }
});