describe('Change language', () => {
  it('Visits the app root url', () => {
    cy.visit('/');
    cy.get('[data-testid=language-en-GB]').click(); // Select English
    cy.contains('h1', 'Benefits').exact;
    cy.get('[data-testid=language-pt-PT]').click(); // Select Portuguese
    cy.contains('h1', 'Benefícios');
    cy.get('[data-testid=language-en-GB]').click(); // Back to English
    cy.contains('h1', 'Benefits');
  });
});
