import {
    success
} from '../../Utils/log in/pageassertion';

describe('User Authorizations', () => {
    before(() => {
        cy.fixture('PersonalData').then((user) => {
            cy.authenticate(user.email, user.password);
            cy.visit("http://13.68.206.72/dashboard");
        });
        cy.url().should('not.include', "login");
    });

    it("Visit Dashboard", () => {
        cy.visit("http://13.68.206.72/dashboard");
        cy.url().should('not.include', "login?redirect_to");
    });
});