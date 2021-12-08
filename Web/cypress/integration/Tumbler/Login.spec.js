import Login from '../../Page Objects/login';
import {
    success,
    fail
} from '../../Utils/log in/pageassertion';

let LoginPOM = new Login();
let email;
let password;

const emptyEmailMessage = "You forgot to enter your email!";
const emptyPasswordMessage = "You forgot to enter your password!";
const emptyEmailAndPasswordMessage = "You do have to fill this stuff out, you know.";
const inCorrectMessage = "Your email or password were incorrect.";
const pressAppBarLoginButton = () => {
    LoginPOM.loginButton();
    LoginPOM.loginButton();
    LoginPOM.appbarLoginButton().click();
}
const pressBodyLoginButton = () => {
    LoginPOM.loginButton();
    LoginPOM.appbarLoginButton();
    LoginPOM.loginButton().click({
        force: true
    });
}
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

describe('Logging In With App Bar Button', () => {
    beforeEach(() => {
        cy.visit('https://www.tumblr.com/');

        cy.fixture('PersonalData').then((user) => {
            email = user.email;
            password = user.password;
        });
    });

    it('log in with empty email', () => {
        pressAppBarLoginButton();

        fillEmailAndPassword("", password);

        fail(emptyEmailMessage);
    });

    it('log in with empty password', () => {
        pressAppBarLoginButton();

        fillEmailAndPassword(email, "");

        fail(emptyPasswordMessage);
    });

    it('log in with empty email and password', () => {
        pressAppBarLoginButton();

        fillEmailAndPassword("", "");

        fail(emptyEmailAndPasswordMessage);
    });

    it('log in with valid email not valid password', () => {
        pressAppBarLoginButton();

        fillEmailAndPassword(email, "WRONG PASSWORD");

        fail(inCorrectMessage);
    });

    it('log in with not valid email valid password (1)', () => {
        pressAppBarLoginButton();

        fillEmailAndPassword("TEST_EMAIL", password);

        fail(inCorrectMessage);
    });

    it('log in with not valid email valid password (2)', () => {
        pressAppBarLoginButton();

        fillEmailAndPassword("TEST_EMAIL@gmail", password);

        fail(inCorrectMessage);
    });

    it('log in with not valid email valid password (3)', () => {
        pressAppBarLoginButton();

        fillEmailAndPassword("TEST_EMAIL.com", password);

        fail(inCorrectMessage);
    });

    it('log in with not registered email valid password', () => {
        pressAppBarLoginButton();

        fillEmailAndPassword("TEST_EMAIL@yahoo.com", password);

        fail(inCorrectMessage);
    });

    it('successfully log in', () => {
        pressAppBarLoginButton();

        fillEmailAndPassword(email, password);

        success();
        cy.url().should('include', "dashboard");
    });

    it('successfully log in with command', () => {
        pressAppBarLoginButton();
        cy.login(LoginPOM, email, password);
        cy.url().should('include', "dashboard");
    });

    // it.only('successfully log in with OAuth', () => {
    //     pressAppBarLoginButton();
    //     cy.get('div').contains("Continue with Google").click();
    //     cy.get('input.whsOnd.zHQkBf[type="email"]').type(email).should('have.text', email);
    //     cy.get('button[type="button"]').click();
    // });
});

describe.skip('Logging In With Body Button', () => {

    beforeEach(() => {
        cy.visit('https://www.tumblr.com/');
        

        cy.fixture('userLoginData').then((user) => {
            email = user.email;
            password = user.password;
        });
    });

    it('log in with empty email', () => {
        pressBodyLoginButton();

        fillEmailAndPassword("", password);

        fail(emptyEmailMessage);
    });

});