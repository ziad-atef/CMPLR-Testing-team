import Login from '../../Page Objects/login';
import Signup from '../../Page Objects/signup';

let LoginPOM;
let SignupPOM;

const loginAssertions = () => {
    //Check that email area is visible and editable
    cy.get('input[name = "email"]').should('be.enabled').and('be.visible')
    //Check that password area is visible and editable
    cy.get('input[name = "password"]').should('be.enabled').and('be.visible')
    //Check button is enabled
    cy.get('button').should('be.enabled')
}

const signupAssertions = () => {
    //Check that email area is visible and editable
    cy.get('input[name = "email"]').should('be.enabled').and('be.visible')
    //Check that password area is visible and editable
    cy.get('input[name = "password"]').should('be.enabled').and('be.visible')
    //Check that blogName area is visible and editable
    cy.get('input[name = "blogName"]').should('be.enabled').and('be.visible')
    //Check button is enabled
    cy.get('button').should('be.enabled')
}
describe('Splash',function(){
    beforeEach(() => {
        /*
            first you have to pass the url of the website, or the page you want
            to start your test with, you want to test
        */
        cy.visit('https://www.tumblr.com/');

        /*
            POM refers to Page Object Model so we wrap all the Doms we will
            interact with in our tests into one class at 
            (../../Page Objects/login) to maintain useability
        */
        LoginPOM = new Login();
        SignupPOM = new Signup();
    });

    it('Routing through main login button',() => {
        
        LoginPOM.loginButton().click({ force: true });
        loginAssertions();
    });

    it('Routing through App Bar login button',() => {
        
        LoginPOM.appbarLoginButton().click({ force: true });
        loginAssertions();
    });

    it('Routing through secondary login button',() => {
        
        LoginPOM.secondaryLoginButton().click({ force: true });
        loginAssertions();
    });
    
    it('Rouring through main signup button',() => {
        
        SignupPOM.signupButton().click({ force: true });
        signupAssertions();
    });
    
    it('Rouring through App Bar signup button',() => {
        
        SignupPOM.appbarSignupButton().click({ force: true });
        signupAssertions();
    });

    it('Rouring through secondary signup button',() => {
        
        SignupPOM.secondarySignupButton().click({ force: true });
        signupAssertions();
    });
});