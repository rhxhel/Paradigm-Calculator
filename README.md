# Paradigm Calculator

---

## I. Learning Objectives

At the end of this activity, students should be able to:

- Design and implement the same problem using different software paradigms.
- Explain how design approaches vary per paradigm.
- Compare procedural, object-oriented, functional, and event-driven programming styles.

---

## II. System Description

The **Paradigm Calculator** is a versatile web-based application designed to perform arithmetic operations using multiple programming paradigms.

The system runs in a web browser and:

- Handles user input from both on-screen buttons and keyboard entries.
- Prevents invalid operations such as division by zero.
- Demonstrates how different paradigms can solve the same computational problem.

---

## III. Programming Languages Used

- **JavaScript** – Core language for implementing all calculator logic, including procedural, object-oriented, and functional paradigms.
- **HTML** – Structures the calculator interface, including buttons, input fields, and display areas.
- **CSS** – Styles the calculator, ensuring a user-friendly and visually appealing layout.

---

## IV. Key Features

### 1. Arithmetic Operations

Performs standard arithmetic operations with proper error handling:

- **Addition (+)** – Combines two numbers to produce their sum.
- **Subtraction (-)** – Finds the difference between two numbers.
- **Multiplication (*)** – Calculates the product of two numbers.
- **Division (/)** – Produces the quotient of two numbers.
- **Modulus (%)** – Returns the remainder after division.

---

### 2. Multiple Programming Paradigms

The calculator is implemented using three distinct programming approaches:

#### Procedural Paradigm
- Uses step-by-step procedures and functions.
- Expressions are parsed and evaluated sequentially.
- Flow is straightforward and easy to trace.

#### Object-Oriented Paradigm (OOP)
- Encapsulates behavior within a `SmartCalculator` class.
- Stores expression state internally.
- Uses methods to execute operations.
- Promotes modularity and code reuse.

#### Functional Paradigm
- Uses pure functions to process expressions.
- Avoids modifying external state.
- Improves predictability and testability.

---

### 3. Unit Converter

Includes a built-in unit conversion tool:

- Meters to Feet
- Kilograms to Pounds
- Celsius to Fahrenheit
- And more

This allows easy comparison between different measurement systems.

---

### 4. User Input Handling

- Supports keyboard entry and on-screen buttons. Restricts other characters aside from numbers, operations, backspace (for delete), and enter (for result).
- Tracks cursor position for accurate insertion and deletion.
- Automatically manages input after calculations.
- Allows seamless continuation using the previous result.

---

### 5. Error Prevention

- Prevents operations that would result in undefined results, such as division by zero or invalid expression.

---

### 6. History Tracking

- Displays previous calculations.

---

### 7. Interactive Web Interface

- Clean and responsive layout.
- Optimized for web browsers.
- Supports arrow key navigation for precise editing.

---

## V. System Set-up

To run the **Paradigm Calculator**:

1. Install **Visual Studio Code**.
2. Install the **Live Server** extension.
3. Clone or download the project from GitHub.
4. Open the project folder in VS Code.
5. Right-click the `index.html` file.
6. Select **"Open with Live Server"**.

The calculator will launch in your web browser, fully interactive with keyboard and button support.

---

## VI. System Workflow

### 1. Input
The user enters an expression using the keyboard or on-screen buttons.

### 2. Paradigm Selection
Users select their preferred programming paradigm.

You may also experiment by modifying `script.js`:

- Removing **Procedural, OOP, or Functional** logic → Interface remains visible but calculations cannot execute.
- Removing **Event-driven** logic → Calculations exist but buttons do not respond.

### 3. Processing
The selected paradigm evaluates the expression.

### 4. Validation
The system checks for invalid operations before computing.

### 5. Output
The result is displayed and saved in the history section.

### 6. Continuation
Users can start a new calculation or continue using the last result.

---

## VII. Benefits

- Demonstrates multiple programming paradigms in one application.
- Encourages deeper understanding of software design approaches.
- Ensures reliable input management and secure calculations.
- Web-based deployment allows cross-device accessibility.
- Modular code structure supports future feature expansion.
