import {
    success,
    fail
} from '../Utils/log in/pageassertion'
import 'cypress-file-upload';
import "cypress-localstorage-commands"

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', (POM, email, password, successfulLogin = true, failMessage = '') => {
    POM.emailField().type(email);
    POM.passwordField().type(password);
    POM.loginButtoninside().click();


    if (successfulLogin)
        success();
    else
        fail(failMessage);
});
Cypress.Commands.add('authorize', (email, password) => {
    cy.request('POST', 'http://13.68.206.72/api/login', {
        email,
        password
    }).then(async (response) => {
        expect(response.body).to.have.property('token');
        expect(response.body).to.have.property('user');
        expect(response.body.user).to.have.property('email', email);

        const token = await response.body.token;
        const user = await response.body.user;
        cy.setLocalStorage('user',
            JSON.stringify({
                token: token,
                userData: user
            }));
    })
});

Cypress.Commands.add('forceVisit', url => {
    cy.window().then(win => {
        return win.open(url, '_self');
    });
});