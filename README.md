# Paradigm Calculator

## I. Learning Objectives
At the end of this activity, students should be able to design and implement the same problem using different software paradigms and explain how design approaches vary per paradigm.

## II. System Description
The Paradigm Calculator is a versatile web-based application designed to perform arithmetic operations using multiple programming paradigms. The system is built to run in a web browser, handling user input from both on-screen buttons and keyboard entries, while preventing invalid operations such as division by zero.

## III. Key Features

1. **Arithmetic Operations** – Performs standard arithmetic operations with error handling for invalid inputs:  
   - **Addition “+”** – Combines two numbers to give their total or sum.  
   - **Subtraction “-”** – Finds the difference by removing one number from another.  
   - **Multiplication “*”** – Repeated addition; calculates the product of two numbers.  
   - **Division “/”** – Splits a number into equal parts; gives the quotient of two numbers.  
   - **Modulus “%”** – Returns the remainder after dividing one number by another.  
   - **Parentheses “( )”** – Groups parts of an expression to control the order of operations.  

2. **Multiple Paradigms** – The calculator is implemented using three distinct programming approaches:  
   - **Procedural Paradigm** – Implements calculations through step-by-step procedures and functions. Input expressions are parsed and evaluated sequentially, making the flow straightforward and easy to follow.  
   - **Object-Oriented Paradigm (OOP)** – Encapsulates calculator behavior within a `SmartCalculator` class. The class stores the current expression and provides methods to execute operations, promoting modularity and code reuse.  
   - **Functional Paradigm** – Uses pure functions to process expressions and return results without modifying external state. Each function is independent, enhancing predictability and testability.  

3. **User Input Handling**  
   - Supports keyboard entry and on-screen buttons.  
   - Keeps track of cursor position, allowing insertion or deletion at any point in the expression.  
   - After calculation, automatically manages subsequent input to either start a new calculation or continue using the last result.  

4. **Error Prevention**  
   - Prevents operations that would result in undefined results, such as division by zero.  
   - Provides clear error messages instead of returning infinity or NaN.  

5. **History Tracking**  
   - Displays previous calculations for reference, enabling users to reuse past results efficiently.  

6. **Interactive Web Interface**  
   - Clean, responsive interface optimized for web browsers.  
   - Supports navigation via arrow keys for precise editing of expressions.  

## IV. System Set-up
To run the Smart Calculator:  
1. Ensure **Visual Studio Code** is installed.  
2. Install the **Live Server** extension to enable real-time preview.  
3. Download or clone the source code from **GitHub**.  
4. Open the project folder in VS Code, then right-click the HTML file and select **“Open with Live Server”** to launch the calculator in a web browser.  

This setup allows full interaction with the interface using both keyboard and on-screen buttons.

## V. System Workflow
1. **Input** – User enters an expression via keyboard or on-screen buttons in the web interface.  
2. **Chosen Paradigm** – Users can select their preferred programming paradigm. They may also explore the `script.js` file and experiment by removing parts of the code:  
   - Without the OOP, Functional, or Procedural paradigm, the buttons work but calculations cannot execute.  
   - Without the Event-driven paradigm, calculations exist but the buttons no longer respond.  
3. **Processing** – The expression is evaluated according to the selected paradigm: procedural, OOP, or functional.  
4. **Validation** – System checks for invalid operations (e.g., division by zero) before computing the result.  
5. **Output** – Result is displayed in the input field, with history updated to show previous calculations.  
6. **Continuation** – Users can either start a new calculation or append operators to the last result seamlessly.  

## VI. Benefits
- Flexible design demonstrating different programming paradigms for educational and practical purposes.  
- Reliable input management guarantees precise and secure calculations.  
- Web-based deployment allows accessibility across devices without installation.  
- Modular code structure makes it easy to extend with additional features in the future.
