const calc = require('./calculator');

let calculator;

beforeEach(() => {
  calculator = new calc.Calculator();
})

describe('Calculator test suite', () => {
  test('calculator clears', () => {
    calculator.clear();

    expect(calculator.currentOperand).toBe('');
    expect(calculator.previousOperand).toBe('');
    expect(calculator.operation).toBe(undefined);
  })

  test('calculator can input numbers', () => {
    calculator.appendNumber(1);
    expect(calculator.currentOperand).toBe('1');

    calculator.appendNumber(2);
    expect(calculator.currentOperand).toBe('12');
  })

  test('calculator can deletes', () => {
    calculator.appendNumber(1);
    expect(calculator.currentOperand).toBe('1');

    calculator.appendNumber(2);
    expect(calculator.currentOperand).toBe('12');

    calculator.delete();
    expect(calculator.currentOperand).toBe('1');
  })

  test('test operation', () => {
    calculator.chooseOperation('+');
    expect(calculator.operation).toBeUndefined();

    calculator.appendNumber(1);
    calculator.appendNumber(2);
    calculator.chooseOperation('+');
    expect(calculator.currentOperand).toBe('');
    expect(calculator.operation).toBe('+');
    expect(calculator.previousOperand).toBe('12');

    calculator.appendNumber(3);
    calculator.appendNumber(4);
    expect(calculator.currentOperand).toBe('34');
    expect(calculator.operation).toBe('+');
    expect(calculator.previousOperand).toBe('12');
  })

  test('handle commas', () => {
    calculator.appendNumber(1);
    calculator.appendNumber('.');
    calculator.appendNumber(2);
    expect(calculator.currentOperand).toBe('1.2');
    expect(calculator.operation).toBeUndefined();
    expect(calculator.previousOperand).toBe('');
    
    calculator.chooseOperation('+');
    calculator.appendNumber('.');
    calculator.appendNumber(3);
    expect(calculator.currentOperand).toBe('0.3');
    expect(calculator.operation).toBe('+')
    expect(calculator.previousOperand).toBe('1.2');

    calculator.appendNumber('.');
    expect(calculator.currentOperand).toBe('0.3');
    expect(calculator.operation).toBe('+')
    expect(calculator.previousOperand).toBe('1.2');
  })

  test('compute', () => {
    const callApi = jest.spyOn(calculator, 'callApi');
    // callApi.mockImplementation()
    callApi.mockImplementation(operation => {
      if (operation === 'add') calculator.currentOperand = 3+3;
      if (operation === 'divide') calculator.currentOperand = 3/3;
      if (operation === 'multiply') calculator.currentOperand = 3*3;
      if (operation === 'subtract') calculator.currentOperand = 3-3;
      calculator.operation = undefined;
      calculator.previousOperand = '';
    });
    
    const run = operation => {
      calculator.clear();
      calculator.appendNumber(3);
      calculator.chooseOperation(operation);
      calculator.appendNumber(3);
      calculator.compute();
    }

    run('+');
    expect(calculator.previousOperand).toBe('');
    expect(calculator.operation).toBeUndefined();
    expect(calculator.currentOperand).toBe(6);

    run('-');
    expect(calculator.previousOperand).toBe('');
    expect(calculator.operation).toBeUndefined();
    expect(calculator.currentOperand).toBe(0);

    run('*');
    expect(calculator.previousOperand).toBe('');
    expect(calculator.operation).toBeUndefined();
    expect(calculator.currentOperand).toBe(9);

    run('÷');
    expect(calculator.previousOperand).toBe('');
    expect(calculator.operation).toBeUndefined();
    expect(calculator.currentOperand).toBe(1);

  })

  test('get display number', () => {
    expect(calculator.getDisplayNumber(1.2)).toBe('1.2');
    expect(calculator.getDisplayNumber('.3')).toBe('0.3');
    expect(calculator.getDisplayNumber(0.3)).toBe('0.3');
  })
  
})