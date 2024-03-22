describe('Login', () => {
  beforeEach(() => {
    cy.visit('/auth/sign-up');
  });

it('sign up successful with full name, email and password', () =>{
      const fullName = 'mario castro';
  const email ='mario.@gmail.com';
  const password = 'Mario1+';
  const confirmPassword = 'Mario1+';
  const successMessage = 'Successful registration!';

  validateIfEnabledTheButtonSubmit(fullName, email, password, confirmPassword)
  cy.get('[type="submit"]').click();
  cy.url().should('eq', Cypress.config().baseUrl + '/auth/sign-in');
  cy.get('app-toast > .flex').click();
  cy.get('.ml-3').should('have.text', successMessage);
  cy.get('app-toast > .flex').click();
  cy.get('.ml-3').should('be.visible');
    });

  });

  function validateIfEnabledTheButtonSubmit(fullName, email, password, confirmPassword) {
    cy.get('#full-name').clear();
    cy.get('#email').clear();
    cy.get('.join > #password').clear();
    cy.get('.join > #confirm-password').clear();

    if (fullName!== '' && email!== '' && password !== '' && confirmPassword !== '') {
      cy.get('#full-name').clear().type(fullName);
      cy.get('#email').clear().type(email);
      cy.get('.join > #password').clear().type(password);
      cy.get('.join > #confirm-password').clear().type(confirmPassword);
  }
    cy.get('[type="submit"]').should('be.enabled');
}

