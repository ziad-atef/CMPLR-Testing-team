import Login from '../../Page Objects/login';
import { noAuth } from '../../Utils/log in/pageassertion';

let LoginPOM;
let blogLink = "/blog/ziadd";
let email;
let password;
let email1, password1;

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
        LoginPOM = new Login();

        cy.visit("/login");
        cy.fixture('PersonalData').then((user) => {
            email1 = user.email;
            password1 = user.password;
        });
    });

    it('access blog without sign in', () => {
        cy.visit(blogLink);
        noAuth();
    });

    //should we give access to help center or not??

    it('sign in and access different blog', () => {
        fillEmailAndPassword(email1,password1);
        cy.visit(blogLink);
        noAuth();
    });
});