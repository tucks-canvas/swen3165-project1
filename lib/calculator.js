window.calculator = 
{
	currentValue: null,
	memory: 0,
	isOn: true,
	xInput: null,
	resultDisplay: null,
	lastOperation: null,
  
	init: function() 
	{
	  const initElements = () => 
	  {
		this.xInput = document.getElementById('x');
		this.resultDisplay = document.getElementById('result');
		
		if (this.xInput && this.resultDisplay) 
		{
		  this.resetCalculator();
		  this.bindEvents();
		} 
		else if (typeof jasmine === 'undefined') 
		{
		  console.error('Calculator elements not found!');
		}
	  };
  
	  initElements();

	  if (typeof jasmine !== 'undefined' && (!this.xInput || !this.resultDisplay)) 
	  {
		setTimeout(initElements, 50);
	  }
	},
  
	bindEvents: function() {
	  for (let i = 0; i <= 9; i++) 
	  {
		const btn = document.getElementById(i.toString());

		if (btn) btn.addEventListener('click', () => this.appendNumber(i));
	  }
  
	  const bindOp = (id, fn) => 
	  {
		const btn = document.getElementById(id);

		if (btn) btn.addEventListener('click', fn.bind(this));
	  };
  
	  bindOp('add', this.add);
	  bindOp('subtract', this.subtract);
	  bindOp('multiply', this.multiply);
	  bindOp('divide', this.divide);
	  bindOp('equals', this.equals);
	  bindOp('sqrt', this.sqrt);
	  bindOp('percent', this.percent);
	  bindOp('clear', this.clear);
	  bindOp('decimal', this.decimal);
	  bindOp('changeSign', this.changeSign);
	  bindOp('memoryPlus', this.memoryPlus);
	  bindOp('memoryMinus', this.memoryMinus);
	  bindOp('memoryRecall', this.memoryRecall);
	},
  
	resetCalculator: function() 
	{
	  this.currentValue = null;
	  this.lastOperation = null;
	  this.xInput.value = '';
	  this.updateDisplay(0);
	},
  
	appendNumber: function(num) 
	{
	  if (!this.isOn) return;

	  this.xInput.value = this.xInput.value === '0' || this.xInput.value === '' ? 
		num.toString() : 
		this.xInput.value + num;
	},
  
	add: function() 
	{ 
		this.executeOperation((a, b) => a + b); 
	},
	
	subtract: function() 
	{ 
		this.executeOperation((a, b) => a - b); 
	},
	
	multiply: function() 
	{ 
		this.executeOperation((a, b) => a * b); 
	},

	divide: function() 
	{
	  const inputValue = parseFloat(this.xInput.value) || 0;

	  if (inputValue === 0) 
	  {
		this.currentValue = NaN;
		this.updateDisplay('Error');
		return;
	  }
	  this.executeOperation((a, b) => a / b);
	},
  
	executeOperation: function(operation) 
	{
	  const inputValue = parseFloat(this.xInput.value) || 0;
	  
	  if (this.currentValue === null) 
	  {
		this.currentValue = inputValue;
	  } 
	  else if (this.lastOperation) 
	  {
		this.currentValue = this.lastOperation(this.currentValue, inputValue);
	  }
	  
	  this.lastOperation = operation;
	  this.xInput.value = '';
	  this.updateDisplay(this.currentValue);
	},
  
	equals: function() 
	{
	  if (!this.isOn || this.currentValue === null) return;
	  
	  const inputValue = parseFloat(this.xInput.value) || 0;
	  
	  if (this.lastOperation) 
	  {
		this.currentValue = this.lastOperation(this.currentValue, inputValue);
		this.lastOperation = null;
	  }
	  
	  this.xInput.value = '';
	  this.updateDisplay(this.currentValue);
	},
  
	sqrt: function() 
	{
	  if (!this.isOn) return;

	  const value = parseFloat(this.xInput.value) || 0;

	  this.currentValue = Math.sqrt(value);
	  this.xInput.value = '';
	  this.updateDisplay(value < 0 ? 'Error' : this.currentValue);
	},
  
	percent: function() 
	{
	  if (!this.isOn) return;

	  const value = parseFloat(this.xInput.value) || 0;

	  this.currentValue = value / 100;
	  this.xInput.value = '';
	  this.updateDisplay(this.currentValue);
	},
  
	changeSign: function() 
	{
	  if (!this.isOn || !this.xInput.value) return;

	  this.xInput.value = (parseFloat(this.xInput.value) * -1).toString();
	},
  
	decimal: function() 
	{
	  if (!this.isOn) return;

	  if (!this.xInput.value.includes('.')) 
	  {
		this.xInput.value += this.xInput.value === '' ? '0.' : '.';
	  }
	},
  
	memoryPlus: function() 
	{
	  if (!this.isOn) return;

	  const value = parseFloat(this.xInput.value) || 0;

	  this.memory += value;
	  this.xInput.value = '';
	},
  
	memoryMinus: function() 
	{
	  if (!this.isOn) return;

	  const value = parseFloat(this.xInput.value) || 0;

	  this.memory -= value;
	  this.xInput.value = '';
	},
  
	memoryPlus: function() 
	{
		if (!this.isOn) return;

		const value = parseFloat(this.xInput.value) || 0;

		this.memory = value; 
		this.xInput.value = '';

		this.updateDisplay(value); 
	},
	
	memoryRecall: function() 
	{
		if (!this.isOn) return;
		
		if (this.memory !== 0) 
		{
			this.xInput.value = this.memory.toString();
			this.updateDisplay(this.memory);
		} 
		else 
		{
			this.xInput.value = '0';
			this.updateDisplay('0');
		}
	},
  
	clear: function() 
	{
		this.isOn = !this.isOn;

		if (this.isOn) 
		{
			this.xInput.value = '';
			this.updateDisplay('0');
			this.currentValue = null;
			this.lastOperation = null;
		} 
		else 
		{
			this.xInput.value = '';
			this.updateDisplay('');
		}
	},

	updateDisplay: function(value) 
	{
		if (!this.isOn) 
		{
			this.resultDisplay.textContent = '';
			this.resultDisplay.classList.remove('error');
			return;
		}
		
		let displayValue;

		if (value === 'Error' || isNaN(value)) 
		{
			displayValue = 'Error';
		} 
		else if (value === '') 
		{
			displayValue = '0';
		} 
		else 
		{
			displayValue = parseFloat(value.toFixed(12)).toString()
			.replace(/(\.\d*?)0+$/, '$1')
			.replace(/\.$/, '');
		}
		
		this.resultDisplay.textContent = displayValue;
		this.resultDisplay.classList.toggle('error', displayValue === 'Error');
	},
};

document.addEventListener('DOMContentLoaded', () => {
	window.calculator.init();
});