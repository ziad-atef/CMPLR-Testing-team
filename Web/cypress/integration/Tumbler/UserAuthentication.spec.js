describe('User Authorizations', () => {
    before(() => {
        cy.fixture('PersonalData').then((user) => {
            let Accesstoken = user.token;
            cy.setCookie('sid', `${Accesstoken}`);
        });
        cy.visit("https://www.tumblr.com");
        cy.url().should('not.include', "login?redirect_to");
    });

    it("Visit Dashboard", () => {
        cy.visit("https://www.tumblr.com/dashboard");
        cy.url().should('not.include', "login?redirect_to");
    });
});