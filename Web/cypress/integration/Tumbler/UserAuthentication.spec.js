describe('User Authorizations', () => {
    beforeEach(() => {
        cy.fixture('userLoginData').then((user) => {
            Accesstoken = user.token;
            cy.setCookie('sid', `${Accesstoken}`);
        });
        cy.url().should('not.include', "login?redirect_to");
    });
});