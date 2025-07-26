describe('Calculator', function() {
  beforeEach(function() {
    document.body.innerHTML = `
      <div id="fixture">
        <input id="x" type="text">
        <button id="add">+</button>
        <button id="subtract">-</button>
        <button id="multiply">×</button>
        <button id="divide">÷</button>
        <button id="equals">=</button>
        <button id="sqrt">√</button>
        <button id="percent">%</button>
        <button id="changeSign">+/-</button>
        <button id="memoryPlus">M+</button>
        <button id="memoryMinus">M-</button>
        <button id="memoryRecall">MRC</button>
        <button id="clear">On/C</button>
        <button id="decimal">.</button>
        <span id="result"></span>
      </div>`;
    
    window.calculator.init();
  });

  afterEach(function() {
    document.body.innerHTML = '';
  });

  it('should add numbers correctly', function() 
  {
    document.getElementById('x').value = '2';
    document.getElementById('add').click();
    document.getElementById('x').value = '3';
    document.getElementById('add').click();
    document.getElementById('equals').click();

    expect(document.getElementById('result').textContent).toBe('5');
  });
  
  it('should handle division by zero', function() 
  {
    document.getElementById('x').value = '5';
    document.getElementById('divide').click();
    document.getElementById('x').value = '0';
    document.getElementById('divide').click();

    expect(document.getElementById('result').textContent).toBe('Error');
  });

  it('should calculate square roots', function() 
  {
    document.getElementById('x').value = '9';
    document.getElementById('sqrt').click();

    expect(document.getElementById('result').textContent).toBe('3');
  });

  it('should change signs', function() 
  {
    document.getElementById('x').value = '5';
    document.getElementById('changeSign').click();

    expect(document.getElementById('x').value).toBe('-5');
  });

  it('should handle memory operations', function() 
  {
    document.getElementById('x').value = '10';
    document.getElementById('memoryPlus').click();
    document.getElementById('memoryRecall').click();

    expect(document.getElementById('x').value).toBe('10');
  });

  it('should initialize with display showing 0', () => 
  {
    expect(document.getElementById('result').textContent).toBe('0');
  });

  it('should calculate 50% as 0.5', () => 
  {
    document.getElementById('x').value = '50';
    document.getElementById('percent').click();

    expect(document.getElementById('result').textContent).toBe('0.5');
  });

  it('should handle decimal input correctly', () => 
  {
    document.getElementById('x').value = '3.14';
    document.getElementById('add').click();
    document.getElementById('x').value = '2';
    document.getElementById('equals').click();

    expect(document.getElementById('result').textContent).toBe('5.14');
  });

  it('should handle 5 + 3 - 2 = 6', () => 
  {
    document.getElementById('x').value = '5';
    document.getElementById('add').click();
    document.getElementById('x').value = '3';
    document.getElementById('subtract').click();
    document.getElementById('x').value = '2';
    document.getElementById('equals').click();
    
    expect(document.getElementById('result').textContent).toBe('6');
  });
});