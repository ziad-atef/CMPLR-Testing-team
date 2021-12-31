const Login = require('../pageobjects/Login');
const Signup = require('../pageobjects/Signup');
const emails = require('../fixtures/emails.json');
const {
    CreatePasswordDots,
    ScreenContains
} = require('../utils/utils');
const {
    LoginWithEmail,
    EnterEmail,
    EnterPassword,
    EmptyEmailPasswordAssertion,
    SuccessLoginAssertion
} = require('../utils/utilsLogin');
const {
    byText
} = require('appium-flutter-finder');

const faker = require('faker/locale/en');
const LoginPOM = new Login();
const SignupPOM = new Signup();

describe('chat', () => {
    beforeEach(async () => {
        await driver.switchContext('FLUTTER');
    });

    afterEach(async () => {
        await driver.reset();
    });

    it('Successful Login', async () => {
        await LoginWithEmail();

        await EnterEmail(emails.email);

        await EnterPassword(emails.email, emails.password);

        await driver.elementClick(LoginPOM.logButtonPOM());

    });
});