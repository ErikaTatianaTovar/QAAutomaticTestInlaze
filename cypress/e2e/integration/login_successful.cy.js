describe('Login', () => {
  beforeEach(() => {
    cy.visit('/auth/sign-in');
  });
  it('should login successfully with user and password correctly', function () {
    const email = 'maria@gmail.com';
    const password = 'Maria1.';
    
    
    cy.get('#email').click().clear().type(email);
    cy.get('.join > #password').click().clear().type(password);
    cy.get('[type="submit"]').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/panel');
    cy.get('.flex > .font-bold').should('be.visible', 'contain.text', 'maria luisa');
    cy.get('img').should('be.visible');
    cy.get('img').click();
    cy.get(':nth-child(3) > a').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/auth/sign-in');
    cy.get('form').should('exist').and('be.visible');
  });

  it('should toggle password visibility on button click', function () {
    const password = 'Maria1.';

    cy.get('.join > #password').click().clear().type(password);
    cy.get('.join > .btn').click();
    cy.get('.join > #password').should('have.attr', 'type', 'text');
    cy.get('.fa-solid').click();
    cy.get('.join > #password').should('have.attr', 'type', 'password');
  });
});