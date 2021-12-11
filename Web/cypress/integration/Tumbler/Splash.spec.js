import Login from '../../Page Objects/login';
import Signup from '../../Page Objects/signup';

let LoginPOM;
let SignupPOM;

const loginAssertions = () => {
    //Check that email area is visible and editable
    LoginPOM.emailField().should('be.enabled').and('be.visible')
    //Check that password area is visible and editable
    LoginPOM.passwordField().should('be.enabled').and('be.visible')
    //Check button is enabled
    LoginPOM.loginButtoninside().should('be.enabled').and('be.visible')
}

const signupAssertions = () => {
    //Check that email area is visible and editable
    SignupPOM.emailField().should('be.enabled').and('be.visible')
    //Check that password area is visible and editable
    SignupPOM.passwordField().should('be.enabled').and('be.visible')
    //Check that blogName area is visible and editable
    SignupPOM.blogNameField().should('be.enabled').and('be.visible')
    //Check button is enabled
    SignupPOM.signupButtoninside().should('be.enabled')
}
describe('Splash',function(){
    beforeEach(() => {
        /*
            first you have to pass the url of the website, or the page you want
            to start your test with, you want to test
        */
        cy.visit('/');

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