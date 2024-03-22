describe('Sign up failed', () => {
	beforeEach(() => {
		cy.visit('/auth/sign-up')
	})

	it('the form should not send if all the fields obligatory are completed', ()=> {
        // Given
        const fullName = 'mario castro';
        const email ='mario.@gmail.com';
        const password = 'Mario1+';
        const confirmPassword = 'Mario1+';

        // When & Then
        validateIfDisabledTheButtonSubmit('', '', '' , '');
        validateIfDisabledTheButtonSubmit('', email, password, confirmPassword);
        validateIfDisabledTheButtonSubmit(fullName, '', password, confirmPassword);
        validateIfDisabledTheButtonSubmit(fullName, email, '', confirmPassword);
        validateIfDisabledTheButtonSubmit(fullName, email, password, '');
        validateIfDisabledTheButtonSubmit(fullName, email, '' , '');
        validateIfDisabledTheButtonSubmit(fullName, '', password, '');
        validateIfDisabledTheButtonSubmit('', email, '', '');
        validateIfEnabledTheButtonSubmit(fullName, email, password, confirmPassword);
    });

    it('should have min 2 words reference to first name and last name in one field', ()=> {
        // Given
        const email ='mario.@gmail.com';
        const password = 'Mario1+';
        const confirmPassword = 'Mario1+';

        // When & Then
        validateIfDisabledTheButtonSubmit('', email, password, confirmPassword);
        validateIfDisabledTheButtonSubmit('a', email, password, confirmPassword);
        validateIfDisabledTheButtonSubmit('an', email, password, confirmPassword);
        validateIfDisabledTheButtonSubmit('any', email, password, confirmPassword);
        validateIfDisabledTheButtonSubmit(' any', email, password, confirmPassword);
        validateIfDisabledTheButtonSubmit(' an', email, password, confirmPassword);
        validateIfDisabledTheButtonSubmit(' a', email, password, confirmPassword);
        validateIfDisabledTheButtonSubmit('!$ /()', email, password, confirmPassword);
        validateIfEnabledTheButtonSubmit('an a', email, password, confirmPassword); // error validation
        validateIfEnabledTheButtonSubmit('any a', email, password, confirmPassword); // error validation
        validateIfEnabledTheButtonSubmit('a an', email, password, confirmPassword); // error validation
        validateIfEnabledTheButtonSubmit('a any', email, password, confirmPassword); // error validation
        validateIfEnabledTheButtonSubmit('a a', email, password, confirmPassword);  // error validation
        validateIfEnabledTheButtonSubmit('!$ds  /()d', email, password, confirmPassword); // error validation
        validateIfEnabledTheButtonSubmit('_a 12ab', email, password, confirmPassword);// error validation
        validateIfEnabledTheButtonSubmit('3 ..!"33', email, password, confirmPassword); // error validation
        validateIfEnabledTheButtonSubmit('lisa 21', email, password, confirmPassword); // error validation
        validateIfEnabledTheButtonSubmit('21 lisa', email, password, confirmPassword); // error validation
        validateIfEnabledTheButtonSubmit('21 21', email, password, confirmPassword); // error validation
        validateIfEnabledTheButtonSubmit('any lisa', email, password, confirmPassword);
    }); 

    it('email should have a structure of a direction email', () => {
        // Given
        const fullName = 'mario castro';
        const password = 'Mario1+';
        const confirmPassword = 'Mario1+';

        // When & Then
        validateIfDisabledTheButtonSubmit(fullName, '', password, confirmPassword);
        validateIfEnabledTheButtonSubmit(fullName, 'mario@gmail.com', password, confirmPassword);
        validateIfEnabledTheButtonSubmit(fullName, 'm', password, confirmPassword);// error validation
        validateIfEnabledTheButtonSubmit(fullName, 'maria', password, confirmPassword);// error validation
        validateIfEnabledTheButtonSubmit(fullName, 'maria@', password, confirmPassword);// error validation
        validateIfEnabledTheButtonSubmit(fullName, 'maria@correo', password, confirmPassword);// error validation
        validateIfEnabledTheButtonSubmit(fullName, 'maria@correo.', password, confirmPassword);// error validation
        validateIfEnabledTheButtonSubmit(fullName, '@', password, confirmPassword);// error validation
        validateIfEnabledTheButtonSubmit(fullName, '@correo', password, confirmPassword);// error validation
        validateIfEnabledTheButtonSubmit(fullName, '@correo.com', password, confirmPassword);// error validation
        validateIfEnabledTheButtonSubmit(fullName, '15165', password, confirmPassword);// error validation
        validateIfEnabledTheButtonSubmit(fullName, ':;:¨[[-+{/', password, confirmPassword);// error validation
        validateIfEnabledTheButtonSubmit(fullName, ':;:¨[[*-/$%@correo', password, confirmPassword);// error validation
        validateIfEnabledTheButtonSubmit(fullName, '15165@cor', password, confirmPassword);// error validation
    });

    it('password should have min of 8 characters with one capital letter, one lower case letter one number and one special character', () => {
        // Given
        const fullName = 'mario castro';
        const email = 'mario.@gmail.com';

        // When & Then
        validateIfDisabledTheButtonSubmit(fullName, email, "Mario", "Mario");
        validateIfDisabledTheButtonSubmit(fullName, email, "mario1", "mario1");
        validateIfDisabledTheButtonSubmit(fullName, email, "Mario$$$$", "Mario$$$$");
        validateIfDisabledTheButtonSubmit(fullName, email, "MarioM@rio", "MarioM@rio");
        validateIfDisabledTheButtonSubmit(fullName, email, "MarioMario", "MarioMario");
        validateIfDisabledTheButtonSubmit(fullName, email, "[]*¨125A]", "[]*¨125A]");
        validateIfDisabledTheButtonSubmit(fullName, email, "[]*¨[$%25115]", "[]*¨[$%25115]");
        validateIfDisabledTheButtonSubmit(fullName, email, "¨*][[", "¨*][[");
        validateIfDisabledTheButtonSubmit(fullName, email, "[]*¨125a]", "[]*¨125a]");
        validateIfDisabledTheButtonSubmit(fullName, email, "158121", "158121");
        validateIfDisabledTheButtonSubmit(fullName, email, "ABC12", "ABC12");
        validateIfDisabledTheButtonSubmit(fullName, email, "ABC..", "ABC..");
        validateIfDisabledTheButtonSubmit(fullName, email, "ABCD1234", "ABCD1234");
        validateIfDisabledTheButtonSubmit(fullName, email, "12345678", "12345678");
        validateIfEnabledTheButtonSubmit(fullName, email, "Mario1+abc", "Mario1+abc");
        validateIfEnabledTheButtonSubmit(fullName, email, "Mario111", "Mario111");// error validation
        validateIfEnabledTheButtonSubmit(fullName, email, "Mario1!", "Mario1!");// error validation
    });

	it('The password should be entered twice and hould inform the user if it matches in both fields', () => {
		// Given
        const fullName = 'mario castro'
		const email = 'mario.@gmail.com'
		
        // When & Then
        validateIfPasswordAndConfirmPasswordAreEqual(fullName, email, '', '')
		validateIfPasswordAndConfirmPasswordAreEqual(
			fullName,
			email,
			'Password123!',
			'Differentpassword1?'
		)
		validateIfPasswordAndConfirmPasswordAreEqual(
			fullName,
			email,
			'',
			'Password123!'
		)
		validateIfPasswordAndConfirmPasswordAreEqual(
			fullName,
			email,
			'Password123!',
			''
		)
		validateIfPasswordAndConfirmPasswordAreEqual(
			fullName,
			email,
			'Password123!',
			'Password123!'
		)
	})

})

function validateIfPasswordAndConfirmPasswordAreEqual(
	fullName,
	email,
	password,
	confirmPassword
) {
	validateIfFieldAreNotEmpty(fullName, email, password, confirmPassword)
	if (
		password !== confirmPassword ||
		confirmPassword === '' ||
		password === ''
	) {
		cy.get('[type="submit"]').should('be.disabled')
	} else {
		cy.get('[type="submit"]').should('be.enabled')
	}
}

function validateIfErrorMessageIsVisible(
	fullName,
	email,
	password,
	confirmPassword
) {
	validateIfFieldAreNotEmpty(fullName, email, password, confirmPassword)
	if (
		password !== confirmPassword
	) {
		cy.get('.label-text-alt').should(
			'have.text',
			' Passwords do not match '
		)
	} else {
		cy.get('[type="submit"]').should('be.enabled')
	}
}

function validateIfDisabledTheButtonSubmit(
	fullName,
	email,
	password,
	confirmPassword
) {
	validateIfFieldAreNotEmpty(fullName, email, password, confirmPassword)
    cy.get('[type="submit"]').should('be.disabled')
}

function validateIfEnabledTheButtonSubmit(
	fullName,
	email,
	password,
	confirmPassword
) {
	validateIfFieldAreNotEmpty(fullName, email, password, confirmPassword)
	cy.get('[type="submit"]').should('be.enabled')
}
function validateIfFieldAreNotEmpty(fullName, email, password, confirmPassword) {
    cy.get('#full-name').clear()
	cy.get('#email').clear()
	cy.get('.join > #password').clear()
	cy.get('.join > #confirm-password').clear()

    if (fullName !== '' &&
        email !== '') {
        cy.get('#full-name').type(fullName)
        cy.get('#email').type(email)
    }

    if (password !== ''){
        cy.get('.join > #password').type(password)
    } else {
        cy.get('.join > #password').type("any")
        cy.get('.join > #password').clear()
    }

    if (confirmPassword !== ''){
        cy.get('.join > #confirm-password').type(confirmPassword)
    }
}

function validate(fullName, email, password, confirmPassword) {
    cy.get('#full-name').clear()
	cy.get('#email').clear()
	cy.get('.join > #password').clear()
	cy.get('.join > #confirm-password').clear()

    if (fullName !== '' &&
        email !== '') {
        cy.get('#full-name').type(fullName)
        cy.get('#email').type(email)
    }

    if (password !== ''){
        cy.get('.join > #password').type(password)
    } else {
        cy.get('.join > #password').type("any")
        cy.get('.join > #password').clear()
    }

    if (confirmPassword !== ''){
        cy.get('.join > #confirm-password').type(confirmPassword)
    }
}