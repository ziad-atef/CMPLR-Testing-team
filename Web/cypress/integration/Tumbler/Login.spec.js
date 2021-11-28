import Login from '../../Page Objects/login';
import { success, fail } from '../../Utils/log in/pageassertion';

let LoginPOM;
let email;
let password;

const emptyEmailMessage = "You forgot to enter your email!";
const emptyPasswordMessage = "You forgot to enter your password!";
const emptyEmailAndPasswordMessage = "You do have to fill this stuff out, you know.";
const inCorrectMessage = "Your email or password were incorrect.";
const pressAppBarLoginButton = () => {
    LoginPOM.loginButton();
    LoginPOM.appbarLoginButton();
    LoginPOM.appbarLoginButton().click();
}
const pressBodyLoginButton = () => {
    LoginPOM.loginButton();
    LoginPOM.appbarLoginButton();
    LoginPOM.loginButton().click({ force: true });
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


        /*
            Data is all what matters at testing so you can use fixtures to 
            add sample data or even real-time data.
            in this case I need to use my personal email to log in successfully
            so I added my email and password at userLoginData.json to use it
            at "successfully log in" test case but I didn't upload it.
            so in my opinion it would be a good use of fixtures :).
            so if you want to try this on your own add userLoginData.json file 
            at fixtures and add your authenticated email and password.
        */
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


        /*
            Data is all what matters at testing so you can use fixtures to 
            add sample data or even real-time data.
            in this case I need to use my personal email to log in successfully
            so I added my email and password at userLoginData.json to use it
            at "successfully log in" test case but I didn't upload it.
            so in my opinion it would be a good use of fixtures :).
            so if you want to try this on your own add userLoginData.json file 
            at fixtures and add your authenticated email and password.
        */
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

    it('log in with empty password', () => {
        pressBodyLoginButton();

        fillEmailAndPassword(email, "");

        fail(emptyPasswordMessage);
    });

    it('log in with empty email and password', () => {
        pressBodyLoginButton();

        fillEmailAndPassword("", "");

        fail(emptyEmailAndPasswordMessage);
    });

    it('log in with valid email not valid password', () => {
        pressBodyLoginButton();

        fillEmailAndPassword(email, "WRONG PASSWORD");

        fail(inCorrectMessage);
    });

    it('log in with not valid email valid password (1)', () => {
        pressBodyLoginButton();

        fillEmailAndPassword("TEST_EMAIL", password);

        fail(inCorrectMessage);
    });

    it('log in with not valid email valid password (2)', () => {
        pressBodyLoginButton();

        fillEmailAndPassword("TEST_EMAIL@gmail", password);

        fail(inCorrectMessage);
    });

    it('log in with not valid email valid password (3)', () => {
        pressBodyLoginButton();

        fillEmailAndPassword("TEST_EMAIL.com", password);

        fail(inCorrectMessage);
    });

    it('log in with not registered email valid password', () => {
        pressBodyLoginButton();

        fillEmailAndPassword("TEST_EMAIL@yahoo.com", password);

        fail(inCorrectMessage);
    });

    it('successfully log in', () => {
        pressBodyLoginButton();

        fillEmailAndPassword(email, password);

        success();
    });

    it('successfully log in with command', () => {
        pressBodyLoginButton();
        cy.login(LoginPOM, email, password);
    });
});