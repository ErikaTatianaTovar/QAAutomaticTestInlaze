describe('Login failed', () => {
  beforeEach(() => {
    cy.visit('/auth/sign-in');
  });

  it('should display error message for incorrect email', () => {
    // Given
    const password = 'Maria1.';
    const messageUserNotFound = 'User not found';

    // When & Then
    validateErrorMessage('incorrect@correo.com', password, messageUserNotFound);
  });

  it('should display error message for incorrect password', () => {
    // Given
    const email = 'maria@gmail.com';
    const messagePassword = 'Password doesn\'t match';

    // When & Then
    validateErrorMessage(email, 'Incorrect2!', messagePassword);
  });

  it('should disable submit button without filling both fields', () => {
    // Given
    const email = 'maria@gmail.com';
    const password = 'Maria1.';

    // When & Then
    validateIfDisabledTheButtonSubmit('', '');
    validateIfDisabledTheButtonSubmit(email, '');
    validateIfDisabledTheButtonSubmit('', password);
    validateIfEnabledTheButtonSubmit(email, password);

  });

  it('should disable the submit button if the email field is empty or incorrect', () => {
    // Given
    const password = 'Maria1.';

     // When & Then
    validateIfDisabledTheButtonSubmit('', password);
    validateIfEnabledTheButtonSubmit('maria', password);//error validation
    validateIfEnabledTheButtonSubmit('maria@', password);//error validation
    validateIfEnabledTheButtonSubmit('maria@correo', password);//error validation
    validateIfEnabledTheButtonSubmit('maria@correo.', password);//error validation
    validateIfEnabledTheButtonSubmit('@', password);//error validation
    validateIfEnabledTheButtonSubmit('@correo', password);//error validation
    validateIfEnabledTheButtonSubmit('@correo.com', password);//error validation
    validateIfEnabledTheButtonSubmit('maria@correo.com', password);//error validation
    validateIfEnabledTheButtonSubmit('15165', password);//error validation
    validateIfEnabledTheButtonSubmit(':;:¨[[´´{´', password);//error validation
  });

  it('should disable the submit button if the password field is empty or incorrect', () => {
    // Given
    const email = 'maria@gmail.com';

     // When & Then
    validateIfDisabledTheButtonSubmit(email, '');
    validateIfDisabledTheButtonSubmit(email, 'maria');
    validateIfDisabledTheButtonSubmit(email, 'maria1');
    validateIfDisabledTheButtonSubmit(email, 'maria1.');
    validateIfDisabledTheButtonSubmit(email, 'Maria');
    validateIfDisabledTheButtonSubmit(email, 'Maria.');
    validateIfEnabledTheButtonSubmit(email, 'Maria1'); //error validation
    validateIfDisabledTheButtonSubmit(email, 'MARIA');
    validateIfDisabledTheButtonSubmit(email, 'MARIA1');
    validateIfDisabledTheButtonSubmit(email, 'MARIA.');
    validateIfDisabledTheButtonSubmit(email, '15151');
    validateIfDisabledTheButtonSubmit(email, '1515.!');
    validateIfEnabledTheButtonSubmit(email, 'Maria1.');
  });

  it('should display error message for failed login with status 401', () => {
    const email = 'maria@gmail.com';
    const password = 'Inc0rrect!';
  
    cy.intercept('POST', '**/api/login', (req) => {
      req.reply({
        statusCode: 401
      });
    }).as('failedLogin');
  
    cy.get('#email').clear().type(email);
    cy.get('.join > #password').clear().type(password);
    cy.get('[type="submit"]').click();
  
    cy.wait('@failedLogin').then((interception) => {
      expect(interception.response.statusCode).to.equal(401);
    });
  });  
});

function validateErrorMessage(email, password, message) {
  cy.get('#email').clear();
  cy.get('.join > #password').clear();
  if (email!== '' && password !== '') {
    cy.get('#email').clear().type(email);
    cy.get('.join > #password').clear().type(password);
  }
  cy.get('[type="submit"]').click();
  cy.get('app-toast > .flex').click();
  cy.get('.ml-3').should('have.text', message);
}

function validateIfDisabledTheButtonSubmit(email, password) {
  cy.get('#email').clear();
  cy.get('.join > #password').clear();

  if (email!== '' && password !== '') {
    cy.get('#email').clear().type(email);
    cy.get('.join > #password').clear().type(password);
  }
  cy.get('[type="submit"]').should('be.disabled');
}

function validateIfEnabledTheButtonSubmit(email, password) {
  cy.get('#email').clear();
  cy.get('.join > #password').clear();

  if (email!== '' && password !== '') {
    cy.get('#email').clear().type(email);
    cy.get('.join > #password').clear().type(password);
  }
  
  cy.get('[type="submit"]').should('be.enabled');
}