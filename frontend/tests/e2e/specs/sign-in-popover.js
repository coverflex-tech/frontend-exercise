describe('Sign in popover', () => {
  const testUsername = 'e2e-test-username';

  it('Login button opens the login form popover', () => {
    cy.visit('/');
    cy.contains('Sign in as employee').should("not.exist");
    cy.get('[data-testid=button-sign-in]').click();
    cy.contains('Sign in as employee');
  });

  it('Login button is disabled if no username is written', () => {
    cy.visit('/');
    cy.get('[data-testid=button-sign-in]').click();
    cy.get('[data-testid=sign-in-popover-button]').should('be.disabled');
  });

  it('Login button is enabled when a username is written', () => {
    cy.get('[data-testid=sign-in-popover-input-username]').type(testUsername);
    cy.get('[data-testid=sign-in-popover-button]').should('be.enabled');
  });

  it('Login button signs the user in', () => {
    cy.get('[data-testid=sign-in-popover-button]').click();
    cy.contains('logout');
    cy.contains(`Welcome, ${testUsername}`);
  });

  it('Logout button signs the user out', () => {
    const selectorNavBarLoginOrLogout = '[data-testid=nav-bar-login-or-logout]';
    cy.contains(selectorNavBarLoginOrLogout, 'logout');
    cy.get(selectorNavBarLoginOrLogout).click();
    cy.contains(selectorNavBarLoginOrLogout, 'login');
  });
});
