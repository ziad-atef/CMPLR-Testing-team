const Login = require('../pageobjects/Login');
const Signup = require('../pageobjects/Signup');
const emails = require('../fixtures/emails.json');
const {
    CreatePasswordDots,
    ScreenContains
} = require('../utils/utils');

const LoginPOM = new Login();
const SignupPOM = new Signup();

describe('Login', () => {
    const InvalidLoginMessage = 'please enter a valid email';
    const IncorrectLoginMessage = 'invalid email or password, try again or press on forgot my password';
    beforeEach(async () => {
        await driver.switchContext('FLUTTER');
    });

    afterEach(async () => {
        await driver.reset();
    });

    it('Login With Not Registered Email', async () => {
        const LoginButton = LoginPOM.loginButtonPOM();

        const SignupButton = SignupPOM.signupButtonPOM();

        await driver.elementClick(LoginButton)


        await driver.pause(10000);

    });

    it('Login With Wrong Password', async () => {

    });

    it('Successful Login', async () => {

    });
});