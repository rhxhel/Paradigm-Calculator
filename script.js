// --- Procedural Logic ---
function calculateProcedural(a, b, op) {
    if (b === 0 && (op === '/' || op === '%')) return "Error: Div by 0";
    if (op === '+') return a + b;
    if (op === '-') return a - b;
    if (op === '*') return a * b;
    if (op === '/') return a / b;
    if (op === '%') return a % b;
    return 0;
}

// --- OOP Logic ---
class SmartCalculator {
    constructor(a, b) { this.a = a; this.b = b; }
    execute(op) {
        if (this.b === 0 && (op === '/' || op === '%')) return "Error: Div by 0";
        const math = { '+': this.a + this.b, '-': this.a - this.b, '*': this.a * this.b, '/': this.a / this.b, '%': this.a % this.b };
        return math[op];
    }
}

// --- Functional Logic ---
const functionalMap = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => b !== 0 ? a / b : "Error: Div by 0",
    '%': (a, b) => b !== 0 ? a % b : "Error: Div by 0"
};

// --- MAIN HANDLER ---
function handleAction(op) {
    const n1 = parseFloat(document.getElementById('num1').value);
    const n2 = parseFloat(document.getElementById('num2').value);
    const mode = document.getElementById('paradigmChoice').value;
    const display = document.getElementById('resultDisplay');
    let result;

    // Check for empty inputs
    if (isNaN(n1) || isNaN(n2)) {
        display.innerText = "Result: Enter numbers!";
        return;
    }

    // Paradigm Switching Logic
    try {
        if (mode === 'procedural') {
            result = calculateProcedural(n1, n2, op);
        } else if (mode === 'oop') {
            const calc = new SmartCalculator(n1, n2);
            result = calc.execute(op);
        } else if (mode === 'functional') {
            result = functionalMap[op](n1, n2);
        } else {
            // Event-Driven: Simple direct calculation
            result = eval(`${n1} ${op} ${n2}`);
        }

        // Displaying the result accurately
        display.innerText = `Result: ${result}`;
        
        // Add to history if it's a valid number
        if (typeof result === 'number') {
            addToHistory(n1, op, n2, result);
        }
    } catch (err) {
        display.innerText = "Result: Error";
        console.error(err);
    }
}

function addToHistory(n1, op, n2, res) {
    const list = document.getElementById('historyList');
    const entry = document.createElement('li');
    entry.innerText = `${n1} ${op} ${n2} = ${res}`;
    list.prepend(entry);
}

function clearCalculator() {
    document.getElementById('num1').value = '';
    document.getElementById('num2').value = '';
    document.getElementById('resultDisplay').innerText = 'Result: --';
}

function copyResult() {
    const res = document.getElementById('resultDisplay').innerText.replace('Result: ', '');
    if (res !== '--') {
        navigator.clipboard.writeText(res);
        alert("Copied: " + res);
    }
}
