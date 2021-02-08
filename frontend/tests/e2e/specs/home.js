// https://docs.cypress.io/api/introduction/api.html

describe('Home page', () => {
  it('Visits the app root url', () => {
    cy.visit('/');
    cy.get('[data-testid=language-en-GB]').click(); // Select English
    cy.contains('p', 'sign in to see and manage your benefits');
    cy.contains('button', 'login');
  });
});
