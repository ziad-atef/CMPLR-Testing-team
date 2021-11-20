import Login from '../../Page Objects/login';
import { noAuth } from '../../Utils/log in/pageassertion';

let LoginPOM;
let blogLink;
let email;
let password;

const fillEmailAndPassword = (passEmail, passPassword) => {
    if (passEmail === '')
        LoginPOM.emailField();
    else
        LoginPOM.emailField().type(passEmail);

    if (passPassword === '')
        LoginPOM.passwordField();
    else
        LoginPOM.passwordField().type(passPassword);

    LoginPOM.loginButtoninside().click();
}

describe('Authorizations', () => {
    beforeEach(() => {
        /*
            first you have to pass the url of the website, or the page you want
            to start your test with, you want to test
        */
        cy.visit('https://www.tumblr.com/');
        
        LoginPOM = new Login();

        cy.fixture('userAuthData').then((auths) => {
            blogLink = auths.blogLink;
            email = auths.email;
            password = auths.password;
        });
    });

    it('access blog without sign in', () => {
        cy.visit(blogLink);
        noAuth();
    });

    //should we give access to help center or not??

    it('sign in and access different blog', () => {
        LoginPOM.loginButton().click({ force: true });
        fillEmailAndPassword(email,password);
        cy.visit(blogLink);
        noAuth();
    });
});