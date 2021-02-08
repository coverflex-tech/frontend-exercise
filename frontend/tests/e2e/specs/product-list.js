describe('Product list', () => {
  const testUsername = 'e2e-test-username';

  it('The product list is shown after signing in', () => {
    // Sign in
    cy.visit('/');
    cy.get('[data-testid=button-sign-in]').click();
    cy.get('[data-testid=sign-in-popover-input-username]').type(testUsername);
    cy.get('[data-testid=sign-in-popover-button]').click();
    //
    cy.contains('Available Benefits');
    cy.contains('Netflix');
    cy.contains('Spotify');
  });
});
