// Function to perform calculations
function calculate(n1, operator, n2) {
    let result = '';
    if (operator === 'add') {
      result = parseFloat(n1) + parseFloat(n2);
    } else if (operator === 'subtract') {
      result = parseFloat(n1) - parseFloat(n2);
    } else if (operator === 'multiply') {
      result = parseFloat(n1) * parseFloat(n2);
    } else if (operator === 'divide') {
      result = parseFloat(n1) / parseFloat(n2);
    }
    return result;
  }
  
  // Function to handle button clicks
  function handleClick(event) {
    const button = event.target;
    const action = button.dataset.action;
    const keyContent = button.textContent;
    const displayedNum = document.querySelector('.calculator__display').textContent;
    const previousKeyType = document.querySelector('.calculator').dataset.previousKeyType;
  
    if (!action) {
      if (
        displayedNum === '0' ||
        previousKeyType === 'operator' ||
        previousKeyType === 'calculate'
      ) {
        document.querySelector('.calculator__display').textContent = keyContent;
      } else {
        document.querySelector('.calculator__display').textContent = displayedNum + keyContent;
      }
      document.querySelector('.calculator').dataset.previousKeyType = 'number';
    }
  
    if (action === 'decimal') {
      document.querySelector('.calculator__display').textContent = displayedNum + '.';
    }
  
    if (
      action === 'add' ||
      action === 'subtract' ||
      action === 'multiply' ||
      action === 'divide'
    ) {
      document.querySelector('.calculator__display').textContent = displayedNum + ' ' + keyContent + ' ';
      document.querySelector('.calculator').dataset.previousKeyType = 'operator';
      document.querySelector('.calculator').dataset.operator = action;
    }
  
    if (action === 'clear') {
      document.querySelector('.calculator__display').textContent = '0';
      document.querySelector('.calculator').dataset.previousKeyType = 'clear';
    }
  
    if (action === 'calculate') {
      const firstValue = document.querySelector('.calculator').dataset.firstValue;
      const operator = document.querySelector('.calculator').dataset.operator;
      let secondValue = displayedNum;
  
      if (firstValue) {
        if (previousKeyType === 'calculate') {
          firstValue = displayedNum;
          secondValue = document.querySelector('.calculator').dataset.modValue;
        }
  
        document.querySelector('.calculator__display').textContent = calculate(firstValue, operator, secondValue);
      }
  
      document.querySelector('.calculator').dataset.modValue = secondValue;
      document.querySelector('.calculator').dataset.previousKeyType = 'calculate';
    }
  }
  
  // Add event listener to calculator keys
  const calculator = document.querySelector('.calculator');
  const keys = calculator.querySelector('.calculator__keys');
  keys.addEventListener('click', handleClick);

