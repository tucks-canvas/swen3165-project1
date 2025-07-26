describe('Calculator E2E Tests', () => {
    beforeEach(() => {
      cy.visit('index.html');
    });

    it('should initialize properly', () => 
    {
      cy.window().should('have.property', 'calculator');
      cy.get('#x').should('be.visible');
      cy.get('#result').should('contain', '0');
    });
    
    it('should add numbers correctly', () => 
    {
      cy.get('#x').type('2');
      cy.get('#add').click();
      cy.get('#x').type('3');
      cy.get('#add').click();
      cy.get('#equals').click();
      cy.get('#result').should('have.text', '5');
    });
  
    it('should handle division by zero', () => 
    {
      cy.get('#x').type('5');
      cy.get('#divide').click();
      cy.get('#x').type('0');
      cy.get('#divide').click();
      cy.get('#result').should('have.text', 'Error');
    });
  
    it('should calculate square roots', () => 
    {
      cy.get('#x').type('9');
      cy.get('#sqrt').click();
      cy.get('#result').should('have.text', '3');
    });

    it('should render all buttons correctly', () => 
    {
      cy.get('.btn').should('have.length', 23);
      cy.get('#add').should('be.visible');
    });

    it('should show error styling on division by zero', () => 
    {
      cy.get('#x').type('5');
      cy.get('#divide').click();
      cy.get('#x').type('0');
      cy.get('#divide').click();
      cy.get('#result').should('have.class', 'error');
    });

    it('should toggle number sign with +/-', () => 
    {
      cy.get('#x').type('5');
      cy.get('#changeSign').click();
      cy.get('#x').should('have.value', '-5');
      cy.get('#changeSign').click();
      cy.get('#x').should('have.value', '5');
    });

    it('should store and recall values correctly', () => 
    {
      cy.get('#x').type('10');
      cy.get('#memoryPlus').click();
      cy.get('#x').clear();
      cy.get('#memoryRecall').click();
      cy.get('#x').should('have.value', '10');
      
      cy.get('#x').clear().type('5');
      cy.get('#memoryMinus').click();
      cy.get('#memoryRecall').click();
      cy.get('#x').should('have.value', '5');
    });

    it('should handle decimal operations correctly', () => 
    {
      cy.get('#x').type('3.14');
      cy.get('#add').click();
      cy.get('#x').type('2.5');
      cy.get('#equals').click();
      cy.get('#result').should('have.text', '5.64');
    });

    it('should handle memory during calculations', () => 
    {
      cy.get('#x').type('5');
      cy.get('#memoryPlus').click();
      
      cy.get('#x').type('10');
      cy.get('#add').click();
      cy.get('#memoryRecall').click();
      cy.get('#equals').click();
      cy.get('#result').should('have.text', '15');
    });

    it('should handle continuous calculations correctly', () => {
      cy.get('#x').type('5');
      cy.get('#add').click();
      cy.get('#x').type('3');
      cy.get('#equals').click();
      cy.get('#result').should('have.text', '8');
      
      cy.get('#multiply').click();
      cy.get('#x').type('2');
      cy.get('#equals').click();
      cy.get('#result').should('have.text', '16');
      
      cy.get('#subtract').click();
      cy.get('#x').type('4');
      cy.get('#equals').click();
      cy.get('#result').should('have.text', '12');
      
      cy.get('#x').should('have.value', '');
      cy.get('#result').should('have.text', '12');
    });
});